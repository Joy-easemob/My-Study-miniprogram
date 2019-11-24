var util = require('../../utils/util.js')
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isgroup:false,
    imgList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  changegroup(){
    var me=this;
    var isgroup=me.data.isgroup;
    isgroup=!isgroup;
    me.setData({
      isgroup:isgroup
    })
  },
  textComment(e){
    var me=this;
    var content = e.detail.value;
    me.setData({
      content:content
    })
  },
  groupname(e){
    var me=this;
    var groupname = e.detail.value;
    me.setData({
      groupname:groupname
    })
  },
  addcode(){
    var me=this;
    console.log("hello world");
    wx.chooseImage({
      success: function(res) {
        var groupcode = res.tempFilePaths[0];
        me.setData({
          groupcode: groupcode
        })
      },
    })
  },
  addcomment(e){
    var me=this;
    var serverUrl=app.serverUrl;
    var user = app.getGlobalUserInfo("userInfo");
    var userid=user.userid;
    var data=me.data;
    var isgroup=data.isgroup;
    var content=data.content;
    var imgList=data.imgList;
    var groupcode=data.groupcode;

    //commentid
    var commentid = Math.round(Math.random() * 1000000) ;
    console.log(user);
    console.log(content);
    console.log(commentid);
    //上传文字
    wx.request({
      url: serverUrl+'/comment/add',
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        commentid:commentid,
        userid: userid,
        content:content
      },
    })
    //上传图片
    me.uploadimages(commentid);
    //是否组团
    if (isgroup&&!util.isNull()){
      me.uploadGroup(commentid);
    }
  },
  uploadimages(commentid) {
    var me=this;
    var imgList = me.data.imgList;
    
   // console.log("*************")
    //console.log(serverUrl)

    imgList.forEach(function (item, index) {
      var serverUrl = app.serverUrl;
      console.log(serverUrl)
      wx.uploadFile({
        url: serverUrl+'/comment/add/image?commentid=' + commentid,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        name: 'image',
        filePath: item
      })
    })
  },
  uploadGroup(commentid){
    var me=this;
    var data=me.data;
    var groupcode = data.groupcode;
    var groupname=data.groupname;
    wx.uploadFile({
      url: serverUrl + '/comment/add/group?commentid=' + commentid,
      name: 'group',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      filePath: groupcode,
      formData:{
        commentid: commentid,
        groupname: groupname
      }
    })
  }
})