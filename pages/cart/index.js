import {chooseAddress, getSetting, openSetting} from '../../utils/asyncWx'

Page({
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0,
    },
    onLoad() {

    },
    onShow() {
        // 获取缓存中的收货地址
        const address = wx.getStorageSync('address');
        // 获取缓存中的购物车数据
        const cart = wx.getStorageSync('cart') || []
        this.setCart(cart)
        this.setData({
            address
        })
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
            let address = await chooseAddress();
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
            // 存入到缓存中
            wx.setStorageSync("address", address)
        } catch (err) {
            console.log(err)
        }

    },
    /**
     * 商品选中状态改变
     * @param e 商品id
     */
    handleItemChange(e) {
        // 获取被修改的商品id
        const goods_id = e.currentTarget.dataset.id
        // 获取购物车数组
        let {cart} = this.data
        // 找到被修改的对象
        let index = cart.findIndex(v => v.goods_id === goods_id)
        // 选中状态取反
        cart[index].checked = !cart[index].checked
        this.setCart(cart)
    },
    /**
     * 设置购物车状态同时重新计算底部工具栏的数据全选总价格购买的数量
     * @param cart  购物车
     */
    setCart(cart) {
        // 计算全选
        // const allChecked = cart.length > 0 ? cart.every(v => v.checked) : false
        let allChecked = true
        // 总价格总数量
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price
                totalNum += v.num
            } else {
                allChecked = false
            }
        })
        // 判断数组是否为空
        allChecked = cart.length != 0 ? allChecked : false
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked
        })
        // 把购物车数据重新设置回data中和缓存
        wx.setStorageSync('cart', cart)
    },
    /**
     * 全选反选
     */
    handleItemAllCheck() {
        // 获取data数据
        let {cart, allChecked} = this.data
        // 全选取反
        allChecked = !allChecked
        // 循环修改cart数组中的商品选中状态
        cart.forEach(v => v.checked = allChecked)
        this.setData(cart)

    },
    /**
     * 商品数量编辑功能
     * @param e 操作符
     */
    handleItemNumEdit(e) {
        // 获取传递过来的参数
        const {operation, id} = e.currentTarget.dataset
        // 获取购物车数组
        let {cart} = this.data
        // 找到需要修改的商品的索引
        const index = cart.findIndex(v => v.goods_id === id)
        // 进行修改数量
        cart[index].num += operation
        this.setCart(cart)


    }

});
