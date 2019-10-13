const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl:"",
    projectid:"",
    user:{
      nickname:"",
      avator:""
    },
    createtime:"",
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    title:"",
    tags:[],
    heading:"",
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    console.log(options.proId);
    var proid = options.proId;
    var serverUrl=app.serverUrl;
    wx.request({
      url: serverUrl +'/prodetail?proid='+proid,
      success(res) {
        var data = res.data.entity;
        console.log(data);
        var user={
          nickname: data.user.userName,
          avator: serverUrl+data.user.userAvatar,
        }
        console.log(user);
        me.setData({
          serverUrl:serverUrl,
          projectid:data.projectId,
          user:user,
          // swiperList:
          title:data.title,
          heading:data.heading,
          content:data.desc
        })
      }
    })
   // console.log(me.data.projectid)
  },
  goBack:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  getComment:function(e){
    console.log(e.currentTarget.dataset.id);
    var projectid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detialComment/detialComment?projectid='+projectid
    })
  },

  //下一篇功能
  getNext:function(){
  },


































  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})