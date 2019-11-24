const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    attention:{
      is: false,
      name: "关注"
      // is:true,
      // name:"已关注"
    },
    TabCur: 0,
    scrollLeft: 0,
    tabscroll:[{name:"介绍"},{name:"图片"},{name:"项目"}],
    serverUrl:'',
    user:{
      nickname: '',
      sex:1,
      avatar:'',
      background:'',
      contact:'',
      top:'',
      local:'',
      introduct:``,
      imagelist:'',
      projectlist:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this; 
    var userid = options.userid;
    var serverUrl=app.serverUrl;
    wx.request({
      url: serverUrl+'/user/detial?userId='+userid,
      success(res){
        console.log(res);
        var user=res.data.entity;
        me.setData({
          serverUrl:serverUrl,
          user:user
        })
      }
    })
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