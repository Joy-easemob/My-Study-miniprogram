const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onLoad:function(){
    this.setData({
      // isCard: e.detail.value
      isCard: 'isCard'
    })
  },

  isCard(e) {
    this.setData({
      // isCard: e.detail.value
      isCard: 'isCard'
    })
  }
})