/**
 * promise形式    getSetting
 * @returns {Promise<unknown>}
 */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
/**
 * promise形式    chooseAddress
 * @returns {Promise<unknown>}
 */
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

/**
 * promise形式    openSetting
 * @returns {Promise<unknown>}
 */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
/**
 * promise形式    openSetting
 * @param title     弹窗标题
 * @param content   弹窗内容
 * @returns {Promise<unknown>}
 */
export const showModal = ({title, content}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: title,
            content: content,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

/**
 * promise形式    showToast
 * @param title     提示内容
 * @returns {Promise<unknown>}
 */
export const showToast = ({title}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: "none",
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
/**
 * promise形式    login
 * @returns {Promise<unknown>}
 */
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success(result) {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

/**
 * promise形式    requestPayment  微信支付
 * @param pay   后台传递参数,解构
 * @returns {Promise<unknown>}
 */
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success(res) {
                resolve(resolve)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
