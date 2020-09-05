import {request} from '../../request/index';

Page({
    data: {
        goodsObj: {}
    },
    // 商品对象
    GoodsInfo: {},
    onLoad: function (options) {
        const {goods_id} = options
        this.getGoodsDetail(goods_id)
    },
    /**
     * 获取商品详情数据
     * @param goods_id  商品id
     * @returns {Promise<void>}
     */
    async getGoodsDetail(goods_id) {
        const goodsObj = await request({
            url: '/goods/detail',
            data: {
                goods_id
            }
        })
        this.GoodsInfo = goodsObj
        this.setData({
            // 赋值指定数据,优化性能
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                /**
                 * iphone部分手机不识别webp图片格式
                 * 最好找到后台让他进行修改
                 * 临时自己改确保后台存在1.webp => 1.jpg
                 * 正则替换
                 */
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: goodsObj.pics
            }

        })
    },
    /**
     * 预览图片
     */
    handlePreviewImage(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
        // 接受传递过来的图片url
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            urls,
            current
        })
    },
    /**
     * 点击加入购物车
     */
    handleCartAdd() {
        // 获取缓存中的购物车数组
        let cart = wx.getStorageSync("cart") || []
        // 判断商品是否存在在购物车中
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            // 不存在 第一次添加
            this.GoodsInfo.num = 1
            // 设置选中状态
            this.GoodsInfo.checked = true
            cart.push(this.GoodsInfo)
        } else {
            // 已经存在数据,执行num++
            cart[index].num++
        }
        wx.setStorageSync("cart", cart)
        wx.showToast({
            title: "加入成功",
            icon: "success",
            mask: true
        })

    }
});
