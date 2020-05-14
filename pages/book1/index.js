// pages/book/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgArr:[],
    flag:true,
    // 需要渲染的数据格式
    imgArr:[
        {src:'https://test.u7power.com/fs/mall/productSet/20200427/7469dabf3c80487da5717d1917e72c0a.jpg',isturn:false,zIndex:3},
        {src:'https://test.u7power.com/fs/mall/productSet/20200427/7469dabf3c80487da5717d1917e72c0a.jpg',isturn:false,zIndex:1},
        {src:'https://test.u7power.com/fs/mall/productSet/20200427/7469dabf3c80487da5717d1917e72c0a.jpg',isturn:false,zIndex:1},
        {src:'https://test.u7power.com/fs/mall/productSet/20200427/7469dabf3c80487da5717d1917e72c0a.jpg',isturn:false,zIndex:1},
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
  touchstart: function(e) {
    console.log('触摸1',e)
  },
  touchmove: function(e) {
    console.log('触摸2',e)
  },
  touchend: function(e) {
    console.log('触摸3',e)
  },
  // 点击图片切换类名来控制翻页效果
  change(e){
    const {touches} = e
    const {clientX,clientY,pageX,pageY} = touches[0]
    let index=e.currentTarget.dataset.index;
    let imgs = this.data.imgArr;
    if(this.data.flag){
        this.data.flag = true;
        
        console.log('测试',e)
        imgs.map((ele,i)=>{
            if(index==i){
                imgs[i].isturn = !imgs[i].isturn;
                imgs[i].zIndex = 3;
            }else{
                imgs[i].zIndex = 1;
            }
        })
        if(index-1>=0){
            imgs[index-1].zIndex = 2;
        }
        if(index+1<imgs.length){
            imgs[index+1].zIndex = 2;
        }
    }
    this.setData({
        imgArr: imgs
    })
  },
  // transition动画结束
  finish(){
      this.data.flag=true;
  }
})