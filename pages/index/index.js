import {request} from '../../request/index.js';

Page({
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航数据
        cateList: [],
        // 楼层数据
        floorList: []
    },
    // 页面开始加载触发事件
    onLoad() {
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()

    },
    /**
     * 获取轮播图数据
     */
    getSwiperList() {
        request({
            url: '/home/swiperdata'
        }).then((result) => {
            this.setData({
                swiperList: result
            })
        })
    },
    /**
     * 获取导航数据
     */
    getCateList() {
        request({
            url: '/home/catitems'
        }).then((result) => {
            this.setData({
                cateList: result
            })
        })
    },
    /**
     * 获取楼层数据
     */
    getFloorList() {
        request({
            url: '/home/floordata'
        }).then((result) => {
            this.setData({
                floorList: result
            })
        })
    }

})
