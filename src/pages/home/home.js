import qs from 'qs'
import lodash from 'lodash'

Page({
  onLoad() {
    qs.stringify({
      name: 'anka'
    })
    console.log(lodash.cloneDeep(this.data))
  },

  onShow() {
    console.log(this, 'hello')
  }
})
