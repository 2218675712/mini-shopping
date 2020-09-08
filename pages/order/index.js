import {request} from "../../request/index";

Page({
    data: {
        tabs: [
            {
                id: 0,
                value: '全部',
                isActive: true
            }, {
                id: 1,
                value: '待付款',
                isActive: false
            }, {
                id: 2,
                value: '待发货',
                isActive: false
            }, {
                id: 3,
                value: '退款/退货',
                isActive: false
            }
        ],
        orders: []
    },
    onLoad: function (options) {

    },
    onShow(options) {
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            })
            return
        }
        // 获取当前的小程序的页面栈-数组长度最大是10页面
        let pages = getCurrentPages()
        let currentPage = pages[pages.length - 1]
        // 获取url上面的type参数
        let {type} = currentPage.options
        // 激活选中页面标题当type=1 index=0
        this.changeTitleByIndex(type - 1)
        // 数组中索引最大的页面就是当前页面
        this.getOrders(type)
    },
    /**
     * 切换tab栏
     * @param e 索引
     */
    handleTabsItemChange(e) {
        const {index} = e.detail
        this.changeTitleByIndex(index)
        // 重新发送请求
        this.getOrders(index + 1)
    },
    /**
     * 根据标题索引来激活选中标题数组
     * @param index
     */
    changeTitleByIndex(index) {
        let {tabs} = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    /**
     * 获取订单数据
     * @param type 那一页
     * @returns {Promise<void>}
     */
    async getOrders(type) {
        const res = await request({
            url: '/my/orders/all',
            data: {type}
        })
        this.setData({
            orders: res.orders
        })
    }
});
