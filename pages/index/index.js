//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    serverUrl:"",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
    gridCol: 3,
    skin: false,
    ColorList: app.globalData.ColorList,
    //indruduct信息
    page: 0,
    totalPage:0,
    projeIntruduct:[]
  },

  onLoad: function() {
    var me = this;
    var serverUrl = app.serverUrl;
    var iconList = me.data.iconList;
    wx.request({
      url: serverUrl + '/grid',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
      },
      success(res) {
        var data = res.data.map;
        me.setData({
          serverUrl:serverUrl,
          iconList: [{
            index: 0,
            icon: 'footprint',
            color: 'red',
            badge: data.footprint,
            name: '艺术游学'
          }, {
            index: 1,
            icon: 'group_fill',
            color: 'mauve',
            badge: data.group_fill,
            name: '酒店管理'
          }, {
            index: 2,
            icon: 'picfill',
            color: 'yellow',
            badge: data.picfill,
            name: '欧洲画廊'
          }, {
            index: 3,
            icon: 'medalfill',
            color: 'olive',
            badge: data.medalfill,
            name: '马术学校'
          }, {
            index: 4,
            icon: 'rankfill',
            color: 'cyan',
            badge: data.rankfill,
            name: '建筑流派'
          }, {
            index: 5,
            icon: 'upstagefill',
            color: 'red',
            badge: data.upstagefill,
            name: '红酒鉴赏'
          }],
        })
      }
    }),
    me.getIntruductList();
  },

  //获取简介列表
  getIntruductList: function() {
    var me = this;
    var page = this.data.page;
    var serverUrl = app.serverUrl + "/introduction?page=" + page;
    wx.request({
      url: serverUrl,
      method:"GET",
      success(res) {
        console.log(res);
        if(res.data.status===401){
          console.log(res.data.errMsg);
        }else{
            //获取到intruduction列表
          var projeIntruduct=me.data.projeIntruduct;
          var newProjeIntruduct = res.data.entities;
            me.setData({
            page: page + 1,
            projeIntruduct: projeIntruduct.concat(newProjeIntruduct)
          })
        }
      }
    })
  },
  //触底加载
  /**********************/
  /********未完成功能*****/ 
  /**********************/

  //进入分类社区
  goClass: function(e) {
    var me = this;
    var index = e.currentTarget.dataset.index;
    var topic = e.currentTarget.dataset.topic;
    var iconList = me.data.iconList;
    iconList[index].badge = 0;
    me.setData({
      iconList: iconList
    });
    wx.navigateTo({
      url: '../comment/comment?topic=' + topic + '&index=' + index,
    })
  },
  //点击进入detail页面
  goDetail:function(e){
    console.log("查看项目:"+e.currentTarget.dataset.id);
    var proId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detial/detial?proId='+proId,
    })
  }
})