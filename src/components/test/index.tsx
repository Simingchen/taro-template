import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtCard } from "taro-ui"

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      date: new Date() 
    }
    console.log(props)
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  // 路由跳转
  goUrl (e) {
    //   console.log(e)
    //   console.log(this)
    this.props.onShare({
        isHave: true
    })
  }

  render () {
    return (
        <View className="test">
            <button onClick={this.goUrl.bind(this)}>分享</button>
      </View>
    )
  }
}
