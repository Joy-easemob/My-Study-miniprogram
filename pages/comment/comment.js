const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:"有方微社区",
    //头部信息
     meta: {
		 //背景图片地址
          app_cover: "",
		 //logo图片
          app_logo: "",
		 //社区名称 
          app_name: "红酒微社区",
        },
	//公告部分
	speaker: {
		//喇叭图片
		images:"",
		//公告两个字
		title:"公告：",
		//信息
		desc:""
	},
	//话题标签
	topic:[
		{text:"全部话题"},
		{text:"好评"},
		{text:"差评"}
	],
	// 右下角的新发帖子的图片
	write:"../../images/write.png",
	//评论按钮图片
	comment:"",
	//点赞图片
	like:"",
	//讨论区
    commentList: [{
      user: {
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg", //头像地址
        nickname: "图样图森破",//昵称
      },
      agoTime: "1小时前",//发布时间
      content: "郁闷的心情久久不能平复",//文字内容
      //0:纯文字 1：一张图片 2：多张图片
      type: 1,
      images: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",//图片
      //是否组队
      isgroup:true
    },{
      user: {
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg", //头像地址
        nickname: "图样图森破",//昵称
      },
      agoTime: "1小时前",//发布时间
      content: "郁闷的心情久久不能平复",//文字内容
      //0:纯文字 1：一张图片 2：多张图片
      type: 2,
      images: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",//图片
      //是否组队
      isgroup: false
    }
	],
  //图片
  iconList:[{
    
  }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    var index = options.index;
    var topic = options.topic;
    me.setData({
      //title: topic
    }),
    me.getCommentList();
  },
  getCommentList:function(){
    var me=this;
    var serverUrl=app.serverUrl;
    wx.request({
      url: serverUrl+'/commentlist',
      success(e){
        console.log(e);
        var commentList=e.data.entities;
        me.setData({
          commentList: commentList
        })
      }
    })
  },
  addcomment:function(){
    console.log("新建");
    wx.navigateTo({
      url: '../addcomment/addcomment',
    })
  }

})