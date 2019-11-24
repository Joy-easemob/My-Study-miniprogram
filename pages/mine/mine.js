var util = require('../../utils/util.js')

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // true: 登陆 //false：未登录 
    islogin:false,
    attention: {
      is: false,
      name: "关注"
      // is:true,
      // name:"已关注"
    },
    TabCur: 0,
    scrollLeft: 0,
    tabscroll: [{ name: "介绍" }, { name: "图片" }, { name: "项目" }],
    serverUrl: '',
    userid:"",
    user: {
      nickname: '',
      sex: true,
      avatar: '../../images/nologin.png',
      background: '../../images/background.jpg',
      contact: '未登录',
      top: '请登陆后在进行操作，有方诚挚的邀请您加入！！！',
      local: '',
      introduct: ``,
      imagelist: '',
      projectlist: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    var me = this;
    var user = app.getGlobalUserInfo("userInfo");
    var serverUrl=app.serverUrl;
    console.log(user);
    if(util.isNull(user)||util.isNull(user.userid)){
      me.setData({
        islogin: false
      })
    }else{
      var userid=user.userid;
      wx.showLoading({
        title: '加载中...',
      })
      console.log("userid:"+user.userid);
      wx.request({
        url: serverUrl +'/user/detial?userId='+userid,
        success(res){
          wx.hideLoading();
          me.setData({
            serverUrl:serverUrl,
            islogin:true,
            user:res.data.entity,
            userid:userid
          })
        }
      })
    }
  },
   //tab选择栏
  tabSelect(e) {
    var me = this;
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  gologin(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  userInfo(){
    var me=this;
    var userid=me.data.userid;
    var avatar=me.data.user.avatar;
    var top=me.data.user.top;
    var local=me.data.user.local;
    var nickname=me.data.user.nickname;
    var contact =me.data.user.contact
    wx.navigateTo({
      url: '../userinfo/userinfo?userid=' + userid + '&avatar=' + avatar + '&top=' + top + '&nickname=' + nickname + '&local=' + local+'&contact='+contact
    })
  },
  logout(){
    var me=this;
    app.setGlobalUserInfo(null);
  },

  deletepro:function(e){
    var me=this;
    var serverUrl=app.serverUrl;
    console.log("delete project id:"+e.currentTarget.dataset.id);
    var projectid = e.currentTarget.dataset.id;
    var userid=app.getGlobalUserInfo().userid;
    var projectlist = me.data.user.projectlist;
    var user=me.data.user;
    console.log("大小");
    console.log(projectlist);
    wx.showModal({
      title: '提示',
      content: '确定要删除此项目吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          wx.request({
            url: serverUrl + '/project/delete?projectid=' + projectid + '&userid=' + userid,
            method:"DELETE",
            success(e){
              user.projectlist = e.data.entities;
              me.setData({
                user:user
              });
            }
          })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  }
})