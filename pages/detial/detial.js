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
      avatar:""
    },
    createtime:"",
    swiperList: [{
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
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
    title: '【红酒鉴赏】伊犁薰衣草花海是中国的普罗旺斯，风吹过来，深紫色的波浪层叠起伏',
    introduct:'',
    tags: [{ tag: '1600' }, { tag: "春天的欧洲" }, { tag:"有方旅行"}],
    contents: [{ title: '【项目简介】',
                 content:'第一步，编辑你的旅行路线，我们生活的轨迹太过于浮躁，也太过复杂，有时候需要将这颗浮躁的心沉浸下来'}],
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
        var user=data.user;
        console.log(user);
        me.setData({
          serverUrl:serverUrl,
          projectid:data.projectId,
          user:user,
          //swiperList:data.image,
          title:data.title,
          heading:data.heading,
          introduct:data.introduct,
          contents:data.contents
        })
      }
    })

    
   console.log(me.data.projectid)
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