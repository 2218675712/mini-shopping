import {request} from "../../request/index";

Page({
    data: {
        goods: []
    },
    onLoad: function (options) {

    },
    TimeId: -1,
    /**
     * 输入框值改变
     * @param e
     */
    handleInput(e) {
        // 获取输入框的值
        const {value} = e.detail
        // 检测合法性
        if (!value.trim()) {
            // 值不合法
            return
        }
        // 防抖实现
        // 准备发送请求获取数据
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.qsearch(value)
        }, 1000)
    },
    async qsearch(query) {
        const res = await request({
            url: '/goods/qsearch',
            data: {query}
        })
        this.setData({
            goods: res
        })
    }
});
