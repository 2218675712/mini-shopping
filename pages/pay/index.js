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
    }

});
