const app=getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    projectid:"",
    imgList: [],
    uploadfile:{size:0,tempfiles:[]},
    title: '',//项目标题
    content: '',//项目简介
    count:0//用户发表过多少项目
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this;
    var serverUrl=app.serverUrl;
    var user=app.getGlobalUserInfo("userInfo");
    wx.request({
      url: serverUrl+'/project/has?userid='+user.userid,
      success(res){
        console.log(res.data.entity);
        me.setData({
          userid: user.userid,
          projectid: "",
          count: res.data.entity
        })
      }
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '体验官',
      content: '确定要删除这张图片吗吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  textContent(e){
    console.log(e);
    this.setData({
      content: e.detail.value
    })
  },
  uploadfile(){
    console.log("上传文件");
    var me=this;
    var serverUrl=app.serverUrl;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log(res);
        console.log(res.tempFiles.length);
        var uploadfile={
          size: res.tempFiles.length,
          tempfiles: res.tempFiles
        }
        me.setData({
          uploadfile:uploadfile
        })
      }
    })
  },
  pushProject(){
    var me=this;
    var userid=me.data.userid;
    var serverUrl=app.serverUrl;
    var project = me.data.uploadfile.tempfiles[0];
    var title = me.data.title;
    var content = me.data.content;
    var tempath = project.path;
    var name = project.name;
    var projectid=me.data.projectid;
    if (!util.isNull(projectid)){
      wx.showToast({
        title: '已上传',
        image: '../../images/warning.png',
        duration: 1000,
        mask: true
      })
      return;
    }
    wx.showLoading({
      title: '上传中......',
    })
    wx.uploadFile({
      url: serverUrl+'/project/push/'+userid,
      filePath: tempath,
      name: 'file',
      header: {},
      formData: {
        filename: name,
        title:title,
        content:content
      },
      success: function (res) {
        console.log(res);
        console.log(res.data);
        //console.log(res.data.entity);
        var projectid = res.data;
        console.log(projectid);
        me.uploadimages(projectid);
      },
      //fail: function (res) { },
      //complete: function (res) { },
    });
  },
  getmyproject(){
    var me=this;
    var userid=me.data.userid;
    wx.navigateTo({
      url: '../myproject/myproject?userid='+userid,
    })
  },
  uploadimages(projectid){
    var me=this;
    var userid=me.data.userid;
    var serverUrl=app.serverUrl;
    var imglist = me.data.imgList;
    var size=imglist.length;
    var count=me.data.count;
    imglist.forEach(function (item, index) {
      console.log(item);
      console.log(index);
      wx.uploadFile({
        url: serverUrl + '/project/push/' + userid + '/image?' + 'projectid=' + projectid+'&size='+size+'&index='+index,
        name:'image',
        filePath: item
      })
    })
    wx.hideLoading();
    wx.showToast({
      title: '上传成功',
      icon: 'success',
      duration: 1000,
      mask: true
    })
    me.setData({
      projectid:projectid,
      count:count+1
    })
  }
})