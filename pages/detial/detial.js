const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationToTopHeight: 80,
    //触顶的样式默认为空，如果触顶为  navigation-bar-fix
    navigationBarFix: "",
    //选择瞬间
    showFollowRecommendView: false,
    //选择详情
    showDiaryRecommendView: true,
    //选择移动动画
    animation: {},

    //瀑布流卡片
    likeImage:"",
    //播放按钮样式
    videoImage:"",
    dataList:[{
      tag:"",
      img:"",
      desc:"",
      hostFace:"",
      nickName:"",
      lickCount:""
    },{
        tag: "",
        src: "",
        desc: "",
        hostFace: "",
        lickCount: ""
    }]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取动画实例 用于在切换导航栏功能的时候执行对应的动画
    this.animation = wx.createAnimation({
      duration: 400
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  // 点击导航栏用户关注推荐功能 切换显示对应页面
  showFollowRecommendView: function() {
    let that = this;
    // 动画：将标识当前选项卡的指示器移动到用户关注推荐选项(第一个) 需要向左移动
    // 34(bar width) + 30(bar margin-right) = 64px
    this.animation.translate(-64, 0).step();
    that.setData({
      animation: this.animation.export(),
      showFollowRecommendView: true, // 显示用户关注推荐页面
      showDiaryRecommendView: false, // 隐藏打卡日记推荐页面
    });
  },

  // 点击导航栏日记推荐功能 切换显示对应页面
  showDiaryRecommendView: function() {
    let that = this;
    // 动画：将标识当前选项卡的指示器移动到日记推荐选项(第二个)，也就是指示器的默认初始位置
    // 距离屏幕最左边 20（margin-left） + 38(bar width) + 30(bar margin-right) = 88px
    this.animation.translate(0, 0).step();
    that.setData({
      animation: this.animation.export(),
      showFollowRecommendView: false, // 隐藏用户关注推荐页面
      showDiaryRecommendView: true, // 显示打卡日记推荐页面
    });
  },

  /*
   * 监听页面滚动的处理函数
   */
  onPageScroll: function(e) {
    let that = this;
    let scrollHeight = e.scrollTop;
    console.log("scroll:" + scrollHeight);

    // 导航栏到达顶部
    if (scrollHeight > that.data.navigationToTopHeight) {
      if (that.data.navigationBarFix === '') {
        that.setData({
          navigationBarFix: 'navigation-bar-fix' // 设置吸附样式
        });
      }
    } else {
      that.setData({
        navigationBarFix: '' // 清除吸附样式
      });
    }
  }
  
})