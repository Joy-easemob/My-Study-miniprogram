const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl:"",
    html: '<p class="xing-p">添加文字与图片，第一部分为项目简介部分</p><img class="xing-img" style="width: 100%" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg" _height="0.61983" _uploaded="true"></img>'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this;
    var serverUrl = app.serverUrl + "/test/upload";
    me.setData({
      serverUrl:serverUrl
    })
  },

  finish: function (e) {
    console.log(e.detail.content);
  },
})