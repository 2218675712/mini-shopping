import {request} from '../../request/index.js';

Page({
    data: {
        // 左侧菜单数据
        leftMenuList: [],
        // 右侧商品数据
        rightContent: [],
        // 被点击的左侧菜单
        currentIndex:0

    },
    // 接口返回数据
    Cate: [],
    onLoad: function (options) {
        this.getCate()
    },
    /**
     * 获取分类数据
     */
    getCate() {
        request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
        }).then((res) => {
            this.Cate = res.data.message
            // 构造左侧菜单数据
            let leftMenuList = this.Cate.map(v => v.cat_name)
            // 构造右侧商品数据
            let rightContent = this.Cate[0].children;
            this.setData({
                leftMenuList,
                rightContent
            })


        })

    }
});
