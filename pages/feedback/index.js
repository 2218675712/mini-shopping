import {showToast} from "../../utils/asyncWx";

Page({
    data: {
        tabs: [
            {
                id: 0,
                value: '体验问题',
                isActive: true
            }, {
                id: 1,
                value: '裔品、 商家投诉',
                isActive: false
            }
        ],
        // 被选中的图片路径数组
        chooseImgs: [],
        textVal: ''
    },
    // 外网的图片的路径数组
    UploadImgs: [],

    onLoad: function (options) {

    },
    /**
     * 切换tab栏
     * @param e 索引
     */
    handleTabsItemChange(e) {
        const {index} = e.detail
        let {tabs} = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    /**
     * 上传图片
     */
    handleChooseImg() {
        // 调用小程序内置的选择图片api
        wx.chooseImage({
            // 同时选中的图片的数量
            count: 9,
            // 图片的格式   原图  压缩
            sizeType: ["original", "compressed"],
            // 图片的来源   相册  照相机
            sourceType: ["album", "camera"],
            success: (result) => {
                this.setData({
                    // 对图片进行拼接
                    chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
                })
            }
        })
    },
    /**
     * 点击自定义图片组件
     * @param e 索引
     */
    handleRemoveImg(e) {
        // 获取被点击的组件的数组索引
        let {index} = e.currentTarget.dataset
        // 获取data中的图片数组
        let {chooseImgs} = this.data
        // 删除元素
        chooseImgs.splice(index, 1)
        this.setData({
            chooseImgs
        })
    },
    /**
     * 文本域的输入事件
     */
    handleTextInput(e) {
        this.setData({
            textVal: e.detail.value
        })
    },
    /**
     * 提交按钮点击
     */
    handleFormSubmit() {
        const {textVal, chooseImgs} = this.data
        if (!textVal.trim()) {
            showToast({title: '输入不合法'})
            return
        }
        wx.showLoading({
            title: '正在上传中',
            mask: true
        })
        if (chooseImgs.length !== 0) {
            chooseImgs.forEach((v, i) => {
                wx.uploadFile({
                    // 图片上传到哪里
                    url: 'https://images.ac.cn/Home/Index/UploadAction/',
                    // 被上传的图片路径
                    filePath: v,
                    // 上传的图片名称
                    name: 'smfile',
                    // 顺带的文本信息
                    formData: {
                        'user': 'test'
                    },
                    success(res) {
                        let url = JSON.parse(res.data).url
                        this.UploadImgs.push(url)
                        if (i === chooseImgs.length - 1) {
                            wx.hideLoading()
                            console.log("把文本的内容和外网的图片数组提交到后台中")
                            // 提交都成功了 重置页面
                            this.setData({
                                chooseImgs: [],
                                textVal: ''
                            })
                            // 返回上一个页面
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    }
                })
            })
        } else {
            console.log("提交普通文本")
            wx.hideLoading()
            // 返回上一个页面
            wx.navigateBack({
                delta: 1
            })
        }

    }
});
