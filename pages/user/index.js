Page({
    data: {
        userinfo:{},
        collectNums:0
    },
    onLoad: function (options) {

    },
    onShow() {
        const userinfo=wx.getStorageSync('userinfo')
        const collect=wx.getStorageSync('collect')||[]
        this.setData({userinfo,collectNums:collect.length})
    }
});
