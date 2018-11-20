import { BxTracker } from '@anka-dev/tracker'
import genDefaultData from 'defaultData'

const tracker = BxTracker.generateTrackerInstance({
    trackerHost: 'http://bi.baixing.com:9001/dw-web/log',
    detectChanel: true,
    detectAppStart: true,
    attachActionToUrl: true,
    autoPageView (currentPage, callback) {
        callback({
            action: '__viewPage'
        })
    }
})

console.log(genDefaultData())

App({
    onLaunch (options) {
        this.$tracker = tracker,
        tracker.asyncInitWithCommonData({
            open_id: 'mock_open_id',
            union_id: 'mock_union_id'
        }).then(() => {
            console.log('初始化成功，开始执行打点任务')
        })
    }
})
