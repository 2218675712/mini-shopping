let ajaxTimes = 0
export const request = (params) => {
    // 每发送一次请求,让计数器++
    ajaxTimes++
    wx.showLoading({
        title: "加载中",
        mask: true
    })

    // 定义基本url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                // 完成请求-1
                ajaxTimes--
                // 当等于0时,管理加载弹框
                // 应对同时发送多个请求
                if (ajaxTimes == 0) {
                    // 关闭正在加载图标
                    wx.hideLoading()
                }
            }
        })
    })

}
