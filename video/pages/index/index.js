const app = getApp()
Page({
  data: {
    screenWidth: 350,
    serverUrl: "",
    videoList: [],
    page: 1,//当前页
    totalPage: 1,//总页数
    searchContent:''
  },

  onLoad: function (params) {
    var me = this;

    var isSaveHot = params.isSaveHot;//是否保存热搜词
    var searchContent='';
    if (params.searchContent != null && params.searchContent != '' && params.searchContent != undefined){
       searchContent = params.searchContent;//获取搜索内容
    }
  
    if(isSaveHot ==null || isSaveHot == '' || isSaveHot == undefined){
      isSaveHot = 0 ;
    }
  
    var serverUrl = app.serverUrl;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth,
      searchContent: searchContent
    });
    var currentPage = me.data.page;

    me.getVideoList(currentPage, isSaveHot);

  },

  getVideoList: function (page, isSaveHot) {
    var me = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '加载中',
    });
    var searchContent = me.data.searchContent;
    wx.request({
      url: serverUrl + '/video/getAllVideo?page=' + page + '&isSaveHot=' + isSaveHot,
      method: 'POST',
      data :{
        videoDesc : searchContent
      },  
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
    me.getVideoList(newpage,0);
  },
  onPullDownRefresh:function(){ 
    wx.showNavigationBarLoading();
    this.getVideoList(1,0);
  },
  showVideoInfo: function (e){
    var me = this;
    var arrIndex = e.target.dataset.arrindex;

    var videoList = me.data.videoList;
    var videoInfo = JSON.stringify(videoList[arrIndex]);
    //console.log(videoInfo);
    wx.redirectTo({
      url: '../videoInfo/videoInfo?videoInfo=' + videoInfo,
    })
  
  }

})
