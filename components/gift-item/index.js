// components/item.js
Component({
  options: {
    styleIsolation: 'shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    giftData: {
      type: Array
    },
    type: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onExchange() {
      this.triggerEvent('onExchange')
    },
    onOrder() {
      this.triggerEvent('onOrder')
    }
  }
})
