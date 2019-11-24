var util = require('../../utils/util.js');
const app=getApp();

Page({
  data: {
    serverUrl:"",
    userid:"",
    /**true 男 false 女 */
    sex:true,
    imgList: [],
    user: {}
  },
  onLoad: function (options) {
    var me=this;
    console.log(options);
    var userid = options.userid;
    var top=options.top;
    var avatar=options.avatar;
    var nickname=options.nickname;
    var contact=options.contact;
    var local=options.local;
    var serverUrl = app.serverUrl;
    var user={
      top:top,
      avatar:avatar,
      local:local,
      nickname:nickname,
      contact:contact
    }
    me.setData({
      userid:userid,
      serverUrl:serverUrl,
      user:user
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
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
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
  goProject(){
    console.log("跳转编写有方项目！！！");
    wx.navigateTo({
      url: '../youfun/project'
    })
  },
  saveinfo(e){
    var me=this;
    var userid=me.data.userid;
    var serverUrl=app.serverUrl;
    var data = e.detail.value;
    var dataO=me.data.user;
    console.log(data.nickname);
    console.log(util.isNull(data.nickname));
    var local = util.isNull(data.local) ? dataO.local : data.local;
    var nickname = util.isNull(data.nickname) ? dataO.nickname : data.nickname;
    var top = util.isNull(data.top)? dataO.top : data.top;
    var sex = util.isNull(data.top) ? null : data.sex;
    var contact = util.isNull(data.contact)  ? dataO.contact : data.contact;
    var introduct = util.isNull(data.introduct) ? null : data.introduct;
    console.log(contact);
    var user =JSON.stringify( {
      contact: contact,
      local: local,
      nickname: nickname,
      introduct: introduct,
      top: top,
      sex: sex
    });
    console.log(userid);
    console.log(nickname);
    wx.showLoading({
      title: '保存中......',
    })
    wx.request({
      url: serverUrl+'/user/'+userid+'/saveinfo',
      method:'GET',
      data: {
       user:user
      },
      success(res){
        me.uploadimages(userid);
        wx.hideLoading();
        console.log(res);
      }
    })
   },
  uploadimages(userid) {
    var me = this;
    var serverUrl = app.serverUrl;
    var imglist = me.data.imgList;
    var size = imglist.length;
    var count = me.data.count;
    imglist.forEach(function (item, index) {
      console.log(item);
      console.log(index);
      wx.uploadFile({
        url: serverUrl + '/user/push/image',
        name: 'image',
        filePath: item,
        formData: {
          userid: userid,
          size:size,
          index:index
        },
        success(res){
          wx.hideLoading();
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }
      })
    })
  },
  //上传头像
  changeface: function () {
    var me = this;
    var user=me.data.user;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath标识图片上传的临时地址
        const tempFilePaths = res.tempFilePaths;
        var userid = me.data.userid;
        var serverUrl = app.serverUrl;
        wx.uploadFile({
          url: serverUrl + '/user/avatar?userid=' + userid,
          filePath: tempFilePaths[0],
          name: 'avatar',
          success: function (res) {
            console.log("success");
            console.log(res);
            console.log(res.data);
            var data = JSON.parse(res.data)
            console.log(data.entity)
            var avatar = data.entity;
            user.avatar=avatar;
            me.setData({
              user:user,
            });
          }
        })
      }
    })
  }
})