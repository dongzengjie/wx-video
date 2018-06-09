var videoUtil = require('../../utils/uploadVideo.js');
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: 'cover',
    userLikeVideo: false,
    videoInfo: {},
    serverUrl: "",

  },
  videoCtx: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var me = this;
  
    me.videoCtx = wx.createVideoContext('myVideo', me);

    var videoInfo = JSON.parse(params.videoInfo);
    // console.log(videoInfo);
    var videoHeight = videoInfo.videoHeight;
    var videoWidth = videoInfo.videoWidth;
    var cover = "cover";
    if (videoWidth >= videoHeight) {
      cover = "";
    }
    var serverUrl = app.serverUrl;
    me.setData({
      cover: cover,
      serverUrl: serverUrl,
      videoInfo: videoInfo
    });
  },
  onShow() {
    var me = this;
    me.videoCtx.play();
  },
  onHide: function () {
    var me = this;
    me.videoCtx.pause();

  },
  showSearch: function () {
    wx.navigateTo({
      url: '../searchVideo/searchVideo',
    })
  },
  upload: function () {
    var me = this;
    var user = app.getGlobalUserInfo();
    var videoInfo = JSON.stringify(me.data.videoInfo);
    var realUrl = '../videoInfo/videoInfo#realUrl@' + videoInfo;
    if(user==null || user == undefined || user == '' ){
        wx.navigateTo({
          url: '../userLogin/login?redirectUrl=' + realUrl,
        })
    }else{
      videoUtil.uploadVideo();
    }

   
  }


})