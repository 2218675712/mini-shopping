Page({
    data: {
        // 轮播图数组
        swiperList: []
    },
    // 页面开始加载触发事件
    onLoad() {
        wx.request({
            url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata\n',
            success:(result)=>{
                this.setData({
                    swiperList:result.data.message
                })
            }

        })
    }
})
