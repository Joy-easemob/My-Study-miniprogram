const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
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
	commentList:[{
		author:{
			avatar:"", //头像地址
			nickname:"",//昵称
			
			},
		agoTime:"1小时前",//发布时间
		content:"",//文字内容
		images:"",//图片
	}
	]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    var index = options.index;
    var topic = options.topic;
    me.setData({
      title: topic
    })
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