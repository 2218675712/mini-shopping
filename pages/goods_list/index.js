import {request} from "../../request/index";

Page({
    data: {
        tabs: [
            {
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 1,
                value: '销量',
                isActive: false
            },
            {
                id: 2,
                value: '价格',
                isActive: false
            }
        ],
        // 商品列表数据
        goodsList: []
    },
    // 查询参数
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    // 总页数
    totalPages: 1,
    // 监听事件加载
    onLoad: function (options) {
        this.QueryParams.cid = options.cid||""
        this.QueryParams.query = options.query||""
        this.getGoodsList()

    },
    // 页面上滑    滚动条触底
    onReachBottom() {
        if (this.QueryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '没有下一页数据了',
                icon: 'none',
                duration: 1000
            })
        } else {
            this.QueryParams.pagenum++
            this.getGoodsList()
        }
    },
    // 页面下拉刷新
    onPullDownRefresh() {
        this.setData({
            // 原数据和现在的进行拼接
            goodsList:[]
        })
        this.QueryParams.pagenum=1
        this.getGoodsList()
    }
    ,
    /**
     * 处理激活样式
     * @param e 参数
     */
    handleTabsItemChange(e) {
        const {index} = e.detail
        let {tabs} = this.data
        tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    /**
     * 获取商品列表数据
     * @returns {Promise<void>}
     */
    async getGoodsList() {
        const res = await request({url: "/goods/search", data: this.QueryParams})
        // 获取总条数
        const total = res.total
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
        this.setData({
            // 原数据和现在的进行拼接
            goodsList: [...this.data.goodsList, ...res.goods]
        })
        // 数据请求回来,关闭加载效果
        wx.stopPullDownRefresh()
    }
});
