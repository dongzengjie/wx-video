const app = getApp()

Page({
  data: {
    screenWidth: 350,
    serverUrl: "",
    videoList: [],
    page: 1,//当前页
    totalPage: 1//总页数
  },

  onLoad: function (params) {
    var me = this;
    var serverUrl = app.serverUrl;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth,
    });
    var currentPage = me.data.page;

    me.getVideoList(currentPage);

  },

  getVideoList: function (page) {
    var me = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: serverUrl + '/video/getAllVideo?page=' + page,
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log(res.data.result);
        if (page == 1) {
          me.setData({
            videoList: []
          });
        }
        var videoList = res.data.result.rows;
        var newVideoList = me.data.videoList;

        me.setData({
          videoList: newVideoList.concat(videoList),
          page: page,
          serverUrl: serverUrl,
          totalPage: res.data.result.total
        });
      }
    })

    
  },
  onReachBottom: function () {
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    if (currentPage == totalPage) {
      wx.showToast({
        title: '没有视频啦~~',
        icon: "none",
        duration: 1500
      });
      return;
    }
    var newpage = currentPage + 1;
    me.getVideoList(newpage);
  },
  onPullDownRefresh:function(){ 
    wx.showNavigationBarLoading();
    this.getVideoList(1);
  }

})
