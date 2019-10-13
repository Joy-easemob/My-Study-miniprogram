const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    attention:{
      is:true,
      name:"已关注"
    },
    TabCur: 0,
    scrollLeft: 0,
    tabscroll:[{name:"介绍"},{name:"图片"},{name:"项目"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //tab选择栏
  tabSelect(e) {
    var me=this;
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})