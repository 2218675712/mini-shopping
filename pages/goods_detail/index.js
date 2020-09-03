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
            goodsObj
        })
    }
});
