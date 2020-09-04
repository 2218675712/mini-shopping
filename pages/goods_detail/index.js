import {request} from '../../request/index';

Page({
    data: {
        goodsObj: {}
    },
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
        this.setData({
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
    }
});
