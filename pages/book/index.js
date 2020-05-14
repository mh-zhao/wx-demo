// pages/book/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    turn: false,
    dataList: [
      {
        img: 'https://test.u7power.com/fs/mall/productSet/20200416/d2a464e079584713b661670697093a72.png',
        isTurn: false
      },
      {
        img: 'https://test.u7power.com/fs/mall/productSet/20200427/96a9a622532e415d8d68643b1fc122a2.jpg',
        isTurn: false
      },
      {
        img: 'https://test.u7power.com/fs/mall/product/20191104/0a5e6b5f73e04175a765d811ce7d5f23.jpg',
        isTurn: false
      },
      {
        img: 'https://test.u7power.com/fs/mall/productSet/20200416/d2a464e079584713b661670697093a72.png',
        isTurn: false
      },
      {
        img: 'https://test.u7power.com/fs/mall/productSet/20200427/96a9a622532e415d8d68643b1fc122a2.jpg',
        isTurn: false
      },
      {
        img: 'https://test.u7power.com/fs/mall/product/20191104/0a5e6b5f73e04175a765d811ce7d5f23.jpg',
        isTurn: false
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 事件处理
   */
  onItem(e) {
    const {clientX, clientY, pageX, pageY} = e.touches[0];
    // console.log('点击2',clientX, clientY, pageX, pageY)
    const {index} = e.currentTarget.dataset
    const newData = this.data.dataList;
    if (clientX < 190) {
      if (index <= 0) return;
      newData[index-1].isTurn = false;
    } else {
      if ((index +1) >= newData.length) return;
      newData[index].isTurn = true;
    }
    console.log('数据',newData)
    this.setData({dataList: newData})
  }
})