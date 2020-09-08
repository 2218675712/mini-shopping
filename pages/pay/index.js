import {request} from "../../request/index";
import {requestPayment, showToast} from "../../utils/asyncWx";

Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0,
    },
    onLoad() {

    },
    onShow() {
        // 获取缓存中的收货地址
        const address = wx.getStorageSync('address');
        // 获取缓存中的购物车数据
        let cart = wx.getStorageSync('cart')
        // 过滤后的数组
        cart = cart.filter(v => v.checked)
        // 总价格总数量
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price
            totalNum += v.num
        })
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address
        })
    },
    /**
     * 处理支付代码
     * @returns {Promise<void>}
     */
    async handleOrderPay() {
        try {
            const token = wx.getStorageSync('token')
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/index'
                })
                return
            }
            // 准备请求体参数
            const order_price = this.data.totalPrice
            const consignee_addr = this.data.address.all
            const cart = this.data.cart
            const goods = []
            cart.forEach(v => goods.push({
                goods_id: v.goods_id,
                goods_number: v.num,
                goods_price: v.goods_price
            }))
            const orderParams = {
                order_price,
                consignee_addr,
                goods
            }
            // 准备发送请求  创建订单    获取订单编号
            const {order_number} = await request({
                url: '/my/orders/create',
                method: 'post',
                data: orderParams
            })
            // 发起  预支付接口
            const {pay} = await request({
                url: '/my/orders/req_unifiedorder',
                method: 'post',
                data: {order_number}
            })
            // 发起微信支付
            await requestPayment(pay)
            console.log(res)
            // 查询后台    订单状态
            const res = await request({
                url: '/my/orders/chkOrder',
                method: 'post',
                data: {order_number}
            })
            await showToast({
                title: '支付成功'
            })
            // 手动删除缓存中,已经支付的商品
            let newCart = wx.getStorageSync('cart')
            newCart = newCart.filter(v => !v.checked)
            wx.setStorageSync('cart', newCart)
            // 支付成功,跳转到订单页面
            wx.navigateTo({
                url: '/pages/order/index'
            })

        } catch (error) {
            console.log(error)
            await showToast({
                title: '支付失败'
            })
        }

    }

});
