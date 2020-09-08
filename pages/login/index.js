Page({
    data: {},
    onLoad: function (options) {

    },
    /**
     * 获取用户信息存入缓存
     * @param e
     */
    handleGetUserInfo(e) {
        const {userInfo} = e.detail
        wx.setStorageSync('userinfo', userInfo)
        wx.navigateBack({
            delta: 1
        })
    }
});
