import {request} from "../../request/index";

Page({
    data: {
        goods: [],
        // 取消按钮是否显示
        isFocus: false,
        inputValue: ''
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
            this.setData({
                goods: [],
                isFocus: false
            })
            // 值不合法
            return
        }
        // 取消按钮显示
        this.setData({
            isFocus: true
        })
        // 防抖实现
        // 准备发送请求获取数据

        /*
        * 防抖（防止抖动）定时器节流
        * 防抖一般输入框中防止重复输入重复发送请求
        * 节流一般是用在页面下拉和上拉
        * 定义全局的定时器id
        * */
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.qsearch(value)
        }, 1000)
    },
    /**
     * 搜索内容
     * @param query 内容
     * @returns {Promise<void>}
     */
    async qsearch(query) {
        const res = await request({
            url: '/goods/qsearch',
            data: {query}
        })
        this.setData({
            goods: res
        })
    },
    handleCancel() {
        this.setData({
            goods: [],
            isFocus: false,
            inputValue: ''
        })
    }
});
