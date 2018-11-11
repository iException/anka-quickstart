import log from './log'
// import _ from 'lodash')

import genDefaultData from '../../defaultData'

declare function Page (config: object): void

Page({
    onLoad () {
        this.setData({
            ...genDefaultData()
        })
    },

    onShow () {
        log('hello!')
    }
})
