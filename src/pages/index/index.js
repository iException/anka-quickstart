import genDefaultData from '../../defaultData'

Page({
    onLoad () {
        this.setData({
            ...genDefaultData()
        })
    },

    onShow () {

    }
})
