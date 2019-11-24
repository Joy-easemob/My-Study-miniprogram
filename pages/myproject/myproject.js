const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    serverUrl:"",
    projeIntruduct: [],
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this;
    var userid = options.userid;
    var serverUrl=app.serverUrl;
    me.setData({
      userid:userid,
      serverUrl:serverUrl
    })
    this.getIntruductList();
  },
  getIntruductList: function () {
    var me = this;
    var page = this.data.page;
    var userid=me.data.userid;
    var serverUrl = app.serverUrl + "/project/userget?userid="+userid+"&page=" + page;
    wx.request({
      url: serverUrl,
      method: "GET",
      success(res) {
        if (res.data.status === 401) {
          console.log(res.data.errMsg);
        } else {
          //获取到intruduction列表
          var projeIntruduct = me.data.projeIntruduct;
          var newProjeIntruduct = res.data.entities;
          me.setData({
            page: page + 1,
            projeIntruduct: projeIntruduct.concat(newProjeIntruduct)
          })
        }
      }
    })
  },
  goDetail: function (e) {
    console.log("查看项目:" + e.currentTarget.dataset.id);
    var proId = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../detial/detial?proId=' + proId,
    })
  }
})