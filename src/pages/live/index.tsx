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
      postList: Array
    }
  }

  componentWillMount () {
    this.setState({
      postList: [...Array(10).keys()]
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config: Config = {
    navigationBarTitleText: '直播页面'
  }

  render () {
    return (
      <View className='live-page'>
        <AtList>
          <AtListItem title='标题文字' arrow='right' />
          <AtListItem title='标题文字' note='描述信息' arrow='right' />
        </AtList>
        {
          this.state.postList.map((item, index) => {
            return (
              <PostItem
                key={String(index)}
              />
            )
          })
        }
      </View>
    )
  }
}
