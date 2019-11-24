const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl:"",
    userlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this;
    var serverUrl=app.serverUrl;
    wx.request({
      url: serverUrl+'/userlist',
      method:'GET',
      success(res) {
        console.log(res.data);
        var userlist=me.data.userlist;
        var newuserlist=res.data.entities;
        me.setData({
          serverUrl:app.serverUrl,
          userlist:userlist.concat(newuserlist)
        })
      }
    })
  },

  /**
   * 获取司导详情
   */
  getDetial:function(data){
    var userid=data.currentTarget.dataset.id;
    console.log(userid);
    wx.navigateTo({
      url: '../navdetial/navdetial?userid='+userid,
    })
  }
})