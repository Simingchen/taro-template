import Taro from '@tarojs/taro'
import { baseURL } from "@/utils/config"
const isDev = process.env.NODE_ENV !== "production"

// 获取token
function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => {})
}

// 设置token
function updateStorageToken(data = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: data.token })
  ])
}

/**
 * 简易封装网络请求
 * 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, data, method = 'GET', showToast = true, autoLogin = true, isShowLoading = false, loadingTxt = '' } = options
  const logOptions = { url, data, method, showToast }

  const token = await getStorage('token')
  const header = token ? { 'jwt-token': token } : {}

  if (method.toUpperCase() === 'POST') {
    header['content-type'] = 'application/json'
  }

  if (method.toUpperCase() === 'DELETE') {
    header['content-type'] = 'application/x-www-form-urlencoded'
  }
  
  const reqParams = data
  // 显示加载
  if (isShowLoading) {
    Taro.showToast({
      icon: "loading",
      title: loadingTxt
    })
  }
  
  return Taro.request({
    url: baseURL + url,
    method,
    data,
    header,
  }).then(async (response) => {
    Taro.hideToast()
    
    const { code, data } = response.data

    if (code === -11) {
      // 清空token
      updateStorageToken({
        token: ""
      })

      // 推出到登录页面
      Taro.redirectTo({
        url: '/subpages/mine/login/index'
      })
      return false
    }

    if (code && code !== "00000") {
      if (showToast) {
        Taro.showToast({
          title: "服务端错误",
          icon: 'none'
        })
      }
      // 返回错误处理
      printError(response, logOptions)
      return response.data
    }

    // 返回成功处理
    if (response.header["jwt-token"]) {
      // 自动刷新token
      await updateStorageToken({
        token: response.header["jwt-token"]
      })
    }
    // 如果返回数据是分页列表
    if (data && data.list) {
      // 分页信息再包装，添加 finished 判断
      const finished =
        !data.hasNext ||
        data.list.length < reqParams.count
      const page = {
        timeline: data.timeline,
        count: reqParams.count,
        finished
      }
      printList(response, logOptions,  page)
      return {
        list: data.list,
        page
      }
    } else {
      // 默认返回数据是对象
      printData(response, logOptions)
      return data
    }

  }).catch((error) => {
    console.log(error)
    // {
    //   message: error.message,
    //   stack: error.stack,
    //   url: error.config ? error.config.url : "",
    //   method: error.config ? error.config.method : "",
    //   time: Date.now()
    // }
    
    // showToast 默认为 true 直接提示 error 信息，如果在开发环境下打开 error 页面
    if (!isDev) {
      Taro.redirectTo({
        url: '/subpages/mine/error/index'
      })
      return false
    } else {
      Taro.showToast({
        title: error && error.message,
        icon: 'none'
      })
    }

    // 返回错误信息给当前请求api
    return Promise.reject({ message: error.message, ...error })
  })
}


const printError = (response, options) => {
  if (isDev) {
    console.groupCollapsed(
      "%cError >>>>>>>>>>>>>>> " +
        options.method.toUpperCase() +
        " " +
        options.url,
      "color: #e74c3c"
    )
    printReq("request query", options.params)
    printReq("request payload", options.data)
    if (response.data) {
      printErrorCode(response.data.code)
      printMessage(response.data.message)
    }
    console.groupEnd()
  }
}
const printList = (response, options, page) => {
  if (isDev) {
    groupStart(options.method.toUpperCase() + " " + options.url)
    printReq("请求参数, url query", options.params)
    printReq("请求参数, payload body", options.data)
    if (response.data.data.timeline) {
      printRes("返回内容, page", page)
    }
    printRes("返回内容, list", response.data.data.list)
    printMessage(response.data.message)
    console.groupEnd()
  }
}
const printData = (response, options) => {
  if (isDev) {
    groupStart(options.method.toUpperCase() + " " + options.url)
    printReq("请求参数, url query", options.params)
    printReq("请求参数, payload body", options.data)
    printRes("返回内容", response.data.data || response.data)
    printMessage(response.data.message)
    console.groupEnd()
  }
}

const rainbow = [
  "color: #e74c3c",
  "color: #e67e22",
  "color: #f1c40f",
  "color: #2ecc71",
  "color: #1abc9c",
  "color: #3498db",
  "color: #9b59b6",
  "color: #333"
]
const printErrorCode = val => {
  if (val) {
    console.log(
      "%c" + "server error code: " + val,
      "background:linear-gradient(to right,#ff6b81, #ff4757);color:#fff;padding:5px 10px"
    )
  }
}
const printMessage = val => {
  if (val) {
    console.log(
      "%c" + "response message: " + val,
      "background:linear-gradient(to top,#ff7f50, #ff6b81);color:#fff;padding:5px 10px"
    )
  }
}
const printRes = (type, val) => {
  if (val) {
    console.log(
      "%c" + (type || "response data") + ":",
      "background:linear-gradient(to left,#2ed573, #1e90ff);color:#fff;padding:5px 15px;"
    )
    console.log({ ...val })
  }
}
const printReq = (type, val) => {
  if (val) {
    if (typeof val === "string") {
      val = JSON.parse(val)
    }
    console.log(
      "%c" + (type || "request payload") + ":",
      "background:linear-gradient(to right,#2ed573, #1e90ff);color:#fff;padding:5px 15px"
    )
    console.log(val)
  }
}
const groupStart = val => {
  let cord = []
  while (cord.length < 7) {
    let n = Math.floor(Math.random() * 7)
    if (!cord.includes(rainbow[n])) {
      cord.push(rainbow[n])
    }
  }
  console.groupCollapsed(
    "%cSuccess %c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c " + val,
    "color: #2ecc71",
    ...cord,
    "color: #333"
  )
}