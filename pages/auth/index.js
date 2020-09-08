import {login} from "../../utils/asyncWx";
import {request} from "../../request/index";

Page({
    data: {},
    onLoad: function (options) {

    },
    /**
     * 获取用户信息
     * @param e 信息
     */
    async handleGetUserInfo(e) {
        try {
            // 获取用户信息
            const {encryptedData, rawData, iv, signature} = e.detail
            // 获取小程序登录成功后的code值
            const {code} = await login()
            // 发送请求 获取用户token值
            const loginParams = {encryptedData, rawData, iv, signature, code}
            // 因为不是企业账号,获取不到,正常
            const {token} = await request({
                url: '/users/wxlogin',
                data: loginParams,
                method: 'post'
            })
            wx.setStorageSync('token', token)
            wx.navigateBack({
                // 返回上一层
                delta: 1
            })
        } catch (error) {
            console.log(error)
        }
    }
});
