var util = require('../../utils/util.js')
const app= getApp();

Page({
  data: {
    islogin:true,
    usernum:"",
    password:"",
    email:"password"
  },
  getUsername(e){
    var me=this;
    var usernum = e.detail.value;
    console.log(e.detail.value);
    me.setData({
      usernum:usernum
    })
  },
  getPassword(e){
    var me = this;
    var password = e.detail.value;
    console.log(e.detail.value);
    me.setData({
      password: password
    })
  },
  userlogin(e){
    var me=this;
    console.log("账号："+me.data.usernum+"密码："+me.data.password);
    var usernum = me.data.usernum;
    var password = me.data.password;
    var serverUrl=app.serverUrl;
    var islogin=me.data.islogin;
    if (util.isNull(usernum)||util.isNull(password)) {
      console.log("空空")
      wx.showToast({
        title: '账号密码为空',
        image:'../../images/warning.png',
        duration: 1000,
        mask: true
      })
      return;
    }
    wx.showLoading({
      title: '登陆中',
    })
    wx.request({
      url: serverUrl+'/userlogin',
      method:"GET",
      data: {
        islogin : islogin,
        usernum : usernum,
        password : password
      },
      success(res){
        console.log(res);
        if(res.statusCode===200){
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 100,
            mask: true
          })
          var user = res.data.entity;
          console.log(user)
          app.setGlobalUserInfo(user);
          wx.switchTab({
            url: '../mine/mine'
          });
        }else{
          wx.hideLoading();
          wx.showToast({
            title: res.data.errorMsg,
            image: '../../images/warning.png',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  },
  regist(){
    var me=this;
    me.setData({
      islogin:false,
      email:"建议使用国内邮箱注册",
      usernum: "",
      password: "",
    })
  },
  gologin() {
    var me = this;

    me.setData({
      islogin: true,
      email: "邮箱账号",
      usernum: "",
      password: "",
    })
  },
  saveuser(user){

  }
})