import {request} from '../../request/index';

Page({
    data: {
        // 左侧菜单数据
        leftMenuList: [],
        // 右侧商品数据
        rightContent: [],
        // 被点击的左侧菜单
        currentIndex: 0,
        // 右侧滚动条距离顶部的距离
        scrollTop: 0

    },
    // 接口返回数据
    Cate: [],
    onLoad: function (options) {
        /*
        0 web中的本地存储和 小程序中的本地存储的区别
          1 写代码的方式不一样了
            web: localStorage.setItem("key","value") localStorage.getItem("key")
        小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
          2:存的时候 有没有做类型转换
            web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
          小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
        1 先判断一下本地存储中有没有旧的数据
          {time:Date.now(),data:[...]}
        2 没有旧数据 直接发送新请求
        3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
         */

        // 1获取本地存储中的数据（小程序中也是存在本地存储技术)
        const Cate = wx.getStorageSync("cate")
        if (!Cate) {
            // 不存在 发送请求获取数据
            this.getCate()
        } else {
            // 有旧的数据    定义过期时间  10s改成五分钟
            if (Date.now() - Cate.time > 1000 * 10) {
                // 重新发送请求
                this.getCate()
            } else {
                this.Cate = Cate.data
                // 构造左侧菜单数据
                let leftMenuList = this.Cate.map(v => v.cat_name)
                // 构造右侧商品数据
                let rightContent = this.Cate[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }


        }
    },
    /**
     * 获取分类数据
     */
    async getCate() {
        /*
        request({
            url: '/categories'
        }).then((res) => {
            this.Cate = res.data.message
            // 把接口的数据存入本地存储中
            wx.setStorageSync('cate', {time: Date.now(), data: this.Cate})
            // 构造左侧菜单数据
            let leftMenuList = this.Cate.map(v => v.cat_name)
            // 构造右侧商品数据
            let rightContent = this.Cate[0].children;
            this.setData({
                leftMenuList,
                rightContent
            })
        })*/
        // 使用es7的async,await 发送请求
        const res = await request({url: '/categories'});
        this.Cate = res
        // 把接口的数据存入本地存储中
        wx.setStorageSync('cate', {time: Date.now(), data: this.Cate})
        // 构造左侧菜单数据
        let leftMenuList = this.Cate.map(v => v.cat_name)
        // 构造右侧商品数据
        let rightContent = this.Cate[0].children;
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    handleItemTap(e) {
        const {index} = e.target.dataset
        // 根据不同的索引渲染商品内容
        let rightContent = this.Cate[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            // 设置scrollTop标签
            scrollTop: 0
        })

    }
});
