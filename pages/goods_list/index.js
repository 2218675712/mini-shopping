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
    onLoad: function (options) {
        this.QueryParams.cid = options.cid
        this.getGoodsList()
    },

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
    async getGoodsList() {
        const res = await request({url: "/goods/search", data: this.QueryParams})
        this.setData({
            goodsList: res.goods
        })
    }
});
