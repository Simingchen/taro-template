import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Navigator, Text } from '@tarojs/components'
import { AtSwitch } from 'taro-ui'
import './index.scss'

export default class Index extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '设置',
  }
  constructor (props) {
    super(props)
    this.state = { 
      contentChecked: false,
      isVisitor: false,
      baseList: [
        {
          itemName: "通知设置",
          type: 0,
          routerTo: ""
        },
        // {
        //   itemName: "WIFI下视频自动播放",
        //   type: 1,
        //   checked: false
        // },
        // {
        //   itemName: "非WIFI下视频自动播放",
        //   type: 1,
        //   checked: false
        // },
        {
          itemName: "WIFI看直播",
          type: 1,
          checked: false
        },
        {
          itemName: "通知设置",
          type: 0,
          routerTo: ""
        }
      ],
      documentList: [
        {
          itemName: "用户协议",
          type: 0,
          routerTo: "/subpages/article/agreement/index"
        },
        {
          itemName: "隐私政策",
          type: 0,
          routerTo: "/subpages/article/privacy/index"
        },
        {
          itemName: "社会公约",
          type: 0,
          routerTo: "/subpages/article/convention/index"
        }
      ]
    }
  }

  componentWillMount () {
  }
  // 链接跳转
  handleGoUrl(item) {
    if (item.routerTo) {
      Taro.navigateTo({
        url: item.routerTo
      })
    } else {
      Taro.showToast({
        icon: "none",
        title: "功能开发中，敬请期待..."
      })
      return false
    }
  }
  handelLogout() {
    Taro.showModal({
      content: "确认退出登录吗？",
      confirmColor: "#fea203"
    }).then(res => {
      // this.$store.dispatch("user/logout")
      // this.$store.dispatch("user/loginType", 0)
      // this.$store.dispatch("user/loginInfoType", true)
      if (res.confirm) {
        Taro.redirectTo({
          url: '/subpages/mine/login/index'
        })
      }
    })
  }

  render () {
    return (
      <View className="setting-container">
        <View className="base-setting">
          {!this.state.isVisitor && (
            <Navigator className="setting-item" url="/subpages/mine/login/index">
              <Text>修改密码</Text>
            </Navigator>
          )}
          {this.state.baseList.map((item) => {
            return (
              <View className="setting-item" onClick={this.handleGoUrl.bind(this, item)} key={item.itemName}>
                <Text>{item.itemName}</Text>
                {!!item.type && (
                  <AtSwitch color="#fea203" disabled />
                )}
              </View>
            )
          })
          }
        </View>
        <View className="adv-setting">
          <View className="setting-item">
            <Text>内容自动更新</Text>
            <AtSwitch color="#fea203" disabled />
          </View>
          <View className="setting-item">
            <Text>夜间模式</Text>
            <AtSwitch color="#fea203" disabled />
          </View>
        </View>
        <View className="document-setting">
          {this.state.documentList.map((item) =>{
            return (
              <View className="setting-item" onClick={this.handleGoUrl.bind(this, item)} key={item.itemName}>
                <Text>{item.itemName}</Text>
                {!!item.type && (
                  <AtSwitch color="#fea203" disabled />
                )}
                {!item.type && (
                  <Image src={imgPreUrl + "icon_go.png"} className="item-icon"/>
                )}
              </View>
            )
          })
          }
        </View>
        {!this.state.isVisitor && (
          <View className="login-out" onClick={this.handelLogout.bind(this)}>退出登录</View>
        )}
      </View>
  )}
}
