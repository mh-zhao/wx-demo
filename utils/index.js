import Toast from '@vant/weapp/toast/toast';
// 手机号验证
export const verifyPhoneNum = data => {
  let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/g;
  if (!reg.test(data)) {
    Toast({
      message: "手机号格式不正确"
    });
    return false;
  }
  return true;
}
// 存储数据
export const setStorage = (key, value) => {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    setStorage(key, value)
  }
}
// 获取数据
export const getStorage = (key) => {
  try {
    return wx.getStorageSync(key)
  } catch (e) {
    getStorage(key)
  }
}
// 删除数据
export const removeStorage = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    removeStorage(key)
  }
}
