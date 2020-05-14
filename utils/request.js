import config from '../utils/config'
import Toast from '@vant/weapp/toast/toast';
import {setStorage, getStorage, removeStorage} from '../utils/index'
const TokenKey = "Authorization";

const request = ({method = 'GET', url, params = {}, header = {}}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      url: config.BASE_URL + url,
      data: params,
      header: {
        // 'content-type': 'application/json'
        ...header,
        ...getStorage(TokenKey)
      },
      success: (res) => {
        const {code, resultCode, resCode} = res.data;
        const {appId, token} = res.header;
        // 校验token是否过期
        if (code && code === '1002') {
          removeStorage(TokenKey)
          console.log('token过期！')
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return;
          Toast({
            type: "fail",
            message: "登录已过期！",
            onClose: () => {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          });
          resolve(res.data)
          return;
        }

        if (code && code === '0000' || resultCode && resultCode === '0000' || resCode && resCode === '0000') {
          // 存储token
          if (!getStorage(TokenKey) && token) {
            setStorage(TokenKey,{appId,token})
          }

          resolve(res.data)
        } else {
          // resolve(res.data)
          reject(res.data)
        }
      },
      fail: (err) => {},
    })
  })
}

export default request;