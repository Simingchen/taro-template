import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtCard } from "taro-ui"
import './index.scss'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      date: new Date() 
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  // 路由跳转
  goUrl () {
    
  }

  render () {
    return (
        <View className="postItemCard">
            <AtCard
                note='小Tips'
                extra='额外信息'
                title='这是个标题'
                thumb='https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1581136035&di=054917fa8575d620532b4aa9529dca2e&src=http://n.sinaimg.cn/ent/transform/617/w630h787/20200109/2c84-imvsvza2597617.jpg'
                >
                这也是内容区 可以随意定义功能
            </AtCard>
      </View>
    
    )
  }
}
