import qs from 'qs'
import genDefaultData from '../../defaultData'

Page({
  onLoad() {
    qs.stringify({
      name: 'anka'
    })
    this.setData({
        ...genDefaultData()
    })
  },

  onShow() {
    console.log(this, 'hello')
  }
})
