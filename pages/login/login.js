// pages/login.js
// import regeneratorRuntime from "../utils/runtime.js";
import Toast from '@vant/weapp/toast/toast';
import {verifyPhoneNum} from '../../utils/index'
import {getVerifySms, getSms} from '../../api/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '15237053075',
    code: '',
    timer: '',
    codeTxt: '获取验证码'
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 事件处理
   */
  onSetData(e) {
    let key = e.currentTarget.dataset.key;
    let val = e.detail.value;
    let newData = JSON.parse(JSON.stringify(this.data))
    newData[key] = val
    this.setData({...Object.assign({},newData)})
  },
  handlerClose() {
    this.setData({phoneNum: '' })
  },
  async getCode() {
    if (!this.data.phoneNum) return;
    if (!verifyPhoneNum(this.data.phoneNum)) return;
    if (this.data.codeTxt !== '获取验证码') return;
    let num = 60;
    let clearTimer = '';
    const timer = () => {
      clearTimeout(clearTimer)
      num--;
      if (num <= 0) {
        this.setData({codeTxt: '获取验证码'});
        return;
      }
      num < 10 ? this.setData({codeTxt: `0${num}s`}) : this.setData({codeTxt: `${num}s`})
      clearTimer = setTimeout(() => {
        timer();
      },1000)
    }
    timer();
    const res = await getSms({phone: this.data.phoneNum});
  },
  async handlerLogin() {
    if (!this.data.phoneNum || !this.data.code) return;
    let params = {
      phone: this.data.phoneNum,
      verifyCode: this.data.code
    }
    const res = await getVerifySms(params).catch(err => err)
    if (res.code === '0000') {
      Toast({
        message: res.msg,
        duration: 500,
        onClose: () => {
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
      });
    } else {
      Toast(res.msg)
    }
  },

})