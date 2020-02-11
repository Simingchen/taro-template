import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import PostItem from '@/components/common/postItem/index'
import { AtList, AtListItem } from "taro-ui"

export default class Index extends Component {
  constructor (props) {
    // super(props)
    super(...arguments)
    this.state = { 
      postList: [...Array(10).keys()]
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '测试页面'
  }

  render () {
    return (
      <View className='live-page'>
        <AtList>
          <AtListItem title='标题文字' arrow='right' />
          <AtListItem title='标题文字' note='描述信息' arrow='right' />
        </AtList>
        {
          this.state.postList.map(item => {
            return <PostItem></PostItem>
          })
        }
      </View>
    )
  }
}
