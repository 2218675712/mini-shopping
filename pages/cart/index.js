import {chooseAddress, getSetting, openSetting} from '../../utils/asyncWx'

Page({
    data: {},
    onLoad: function (options) {

    },
    /**
     * 获取收货地址
     */
    async handleChooseAddress() {
        // 获取用户授权设置
        /*        wx.getSetting({
                    success: (result) => {
                        // 获取收货地址授权状态
                        let scopeAddress = result.authSetting['scope.address']
                        // 如果是成功或者未定义,则获取收货地址
                        if (scopeAddress === true || scopeAddress === undefined) {
                            wx.chooseAddress({
                                success: (result1) => {
                                }
                            })
                        } else {
                            // 取消状态,调用已经授权的权限,让用户重新授权
                            wx.openSetting({
                                success: (result2) => {
                                    wx.chooseAddress({
                                        success: (result3) => {
                                        }
                                    })
                                }
                            })
                        }
                    }
                })*/


        try {
            // 获取权限状态
            const res1 = await getSetting();
            // 判断权限状态
            let scopeAddress = res1.authSetting['scope.address']
            if (scopeAddress === false) {
                // 诱导用户打开授权页面
                const res3 = await openSetting()
            }
            // 调用收货地址的api
            const address = await chooseAddress();
            // 存入到缓存中
            wx.setStorageSync("address",address)
        } catch (err) {
            console.log(err)
        }

    }

});
