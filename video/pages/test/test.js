const app = getApp()

Page({
  data: {
    serverUrl: "",
    videoList: [],
    currentId:""
    
  },
  onLoad:function(){
    var me = this;
    var serverUrl = app.serverUrl;

    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: serverUrl + '/video/getAllVideo?page='+ 1,
      method: 'GET',
      success: function (res) {
        console.log(res.data.result);
        wx.hideLoading();
        var videoList = res.data.result.rows;
        var newVideoList = me.data.videoList;
        
        me.setData({
          videoList: newVideoList.concat(videoList),
          serverUrl: serverUrl,
          totalPage: res.data.result.total
        });
      }
    })
  },


  changeOne: function (e) {
  //  console.log(e);
    // var videoContext = wx.createVideoContext('myVideo', this)
    // videoContext.pause();


  },
  // onReady: function (res) {
   
  // },

  changeTwo: function (e) {
    console.log(e);
  },
  // onPullDownRefresh: function () {
  // console.log("刷新···");
  // }

  
  
})