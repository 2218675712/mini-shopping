Page({
    data: {
        userinfo:{}
    },
    onLoad: function (options) {

    },
    onShow() {
        const userinfo=wx.getStorageSync('userinfo')
        this.setData({userinfo})
    }
});
