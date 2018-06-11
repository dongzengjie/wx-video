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
     console.log(videoInfo);
    var videoHeight = videoInfo.videoHeight;
    var videoWidth = videoInfo.videoWidth;
    var cover = "cover";
    if (videoWidth >= videoHeight) {
      cover = "";
    }
    var serverUrl = app.serverUrl;
    var user = app.getGlobalUserInfo();
    var loginUserId = "";
    if (user != null && user != undefined && user != '') {
      loginUserId = user.id;
    }
    wx.request({
      url: serverUrl + '/user/queryIsLike?videoId=' + videoInfo.id + "&userId=" + loginUserId ,
      method:"POST",
      success:function(res){
        me.setData({
          cover: cover,
          serverUrl: serverUrl,
          videoInfo: videoInfo,
          userLikeVideo:res.data.result
        });
      }
      
    })
  
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
    var realUrl = '../videoInfo/videoInfo#videoInfo@' + videoInfo;
    if(user==null || user == undefined || user == '' ){
        wx.navigateTo({
          url: '../userLogin/login?redirectUrl=' + realUrl,
        })
    }else{
      videoUtil.uploadVideo();
    }  
  },
  showMine:function(){
    var user = app.getGlobalUserInfo();

    if (user == null || user == undefined || user == '') {
      wx.navigateTo({
        url: '../userLogin/login',
      })
    } else {
      wx.navigateTo({
        url: '../mine/mine',
      })
    }
  },
  likeVideoOrNot:function(){
    var me = this;
    var userLikeVideo = me.data.userLikeVideo;

    var user = app.getGlobalUserInfo();
    if(user == null || user == undefined || user == ''){
      wx.navigateTo({
        url: '../userLogin/login',
      })
    }else{
      var userId = app.getGlobalUserInfo().id;
      var videoInfo = me.data.videoInfo;
      var videoId = videoInfo.id;
      var videoCreateId = videoInfo.userId;
      var url = app.serverUrl + "/video/userLike?userId=" + userId + "&videoCreateId=" + videoCreateId + "&videoId=" + videoId;
      if (userLikeVideo) {
        url = app.serverUrl + "/video/userUnLike?userId=" + userId + "&videoCreateId=" + videoCreateId + "&videoId=" + videoId;
      }
      wx.request({
        url: url,
        method: "POST",
        header: {
          'userToken': app.getGlobalUserInfo().token,
          'userId': app.getGlobalUserInfo().id
        },
        success: function (res) {
          if (res.data.status == 200) {
            me.setData({
              userLikeVideo: !userLikeVideo
            });
          }
        }
      })
    }
  },
  showIndex:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  showPublisher:function(){
    var me =this;
    var user = app.getGlobalUserInfo();
    var videoInfo = me.data.videoInfo;
    var realUrl = '../mine/mine#publisherId@' + videoInfo.userId;
    if(user ==null || user == undefined || user ==''){
        wx.navigateTo({
          url: '../userLogin/login?redirectUrl=' + realUrl,
        })
    }else{
      wx.navigateTo({
        url: '../mine/mine?publisherId=' + videoInfo.userId,
      })
    }
  }


})