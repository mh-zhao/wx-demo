//index.js
import {getMyGift} from '../../api/home'

Page({
  data: {
    active: 'used',
    show: false,
    pageNum: 1,
    pageSize: 14,
    notUsedList: [],
    expiredList: [],
    usedList: [],
    notUsedPageNum: 1,
    expiredPageNum: 1,
    usedPageNum: 1,
    notUsedStop: true,
    expiredStop: true,
    usedStop: true,
    currentType: 'used',
    stopReachBottom: true
  },
  onLoad() {
    const {pageNum,pageSize} = this.data;
    let params = {
      pageNum,
      pageSize,
      status: 0
    }
    this.getData('used',params)
  },
  //事件处理函数
  async getData(name,params,type = 0) {
    const res = await getMyGift(params)
    console.log('礼册',type,res)
    let newData = JSON.parse(JSON.stringify(this.data))
    if (!res.resultContent.list.length) {
      newData[`${name}Stop`] = false;
      this.setData({...newData})
      return;
    }
    // 隐藏加载动画
    wx.hideNavigationBarLoading()
    // 关闭下拉刷新
    wx.stopPullDownRefresh()
    if (type === 0) {
      newData[`${name}List`] = res.resultContent.list;
    } else {
      newData[`${name}List`] = newData[`${name}List`].concat(res.resultContent.list)
    }

    this.setData({
     ...newData
    })
  },
  setQueryType(name, type = 0) {
    const {pageSize} = this.data;
    let pageNum = this.data[`${name}PageNum`];
    const newData = JSON.parse(JSON.stringify(this.data))
    if (type === 0) { 
      newData[`${name}PageNum`] = 1;
      this.setData({...newData})
    } else {
      pageNum++;
      newData[`${name}PageNum`] = pageNum;
      this.setData({...newData})
    }
    let params = {
      pageNum,
      pageSize,
      status: 0
    }
    if (name === 'notUsed') {
      params.status = 1;
    }
    if (name === 'expired') {
      params.status = 2;
    }
    this.getData(name,params,type);
  },
  onClick(event) {
    const name = event.detail.name;
    this.setData({currentType: name})
    if (this.data[`${name}List`].length) return; 
    this.setQueryType(name)
  },
  bindfocus() {
    this.setData({show: true})
  },
  onClickHide() {
    this.setData({show: false})
  },
  onPullDownRefresh() { //下拉刷新
    let type = this.data.currentType
    // 开启加载动画
    wx.showNavigationBarLoading()
    this.setQueryType(type)
  },
  onReachBottom() { //上拉加载
    let name = this.data.currentType
    if (!this.data[`${name}Stop`]) return;
    this.setQueryType(name, 1)
  },
  onOrder() {
    console.log('查看订单')
  },
  onExchange() {
    console.log('去兑换')
    wx.navigateTo({
      url: '/pages/book/index',
    })
  }
  
})
