const app = getApp()
Page({
  data: {
    bgmList: [],
    serverUrl: "",
    videoParm: {}
  },
  onLoad: function (params) {
    var me  = this;
 
    console.log(params);
    me.setData({
      videoParm : params
    });
    wx.showLoading({
      title: '请稍等...',
    });
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/bgm/bgmlist',
      method: 'GET',
      success : function(res){
        wx.hideLoading();
        if(res.data.status ==200){
          var bgmList = res.data.result;
          me.setData({
            bgmList: bgmList,
            serverUrl: serverUrl
          });
        }
      }
    })

  },
  upload:function(e){
    var me = this;
    var serverUrl = app.serverUrl;
    var bgmId = e.detail.value.bgmId;
    var desc = e.detail.value.desc;
    console.log(bgmId);
 
    var videoSeconds = me.data.videoParm.duration;
    var videoWidth = me.data.videoParm.width;
    var videoHeight = me.data.videoParm.height;
    var fileUrl = me.data.videoParm.tempFilePath;
    var desc = desc;
    var bgmId = bgmId;
    var userId = app.getGlobalUserInfo().id
    
    // 上传短视频
    wx.showLoading({
      title: '上传中...'
    });
  
    wx.uploadFile({
      url: serverUrl + '/video/videoUpLoad',
      formData: {
        bgmId: bgmId,
        desc: desc,
        videoSeconds: videoSeconds,
        videoWidth: videoWidth,
        videoHeight: videoHeight,
        userId: userId
      },
      filePath: fileUrl,
      name: 'file',
      success:function(res){
        var data = JSON.parse(res.data);
        console.log(data);
        wx.hideLoading();
        if(data.status==200){
         
          wx.showToast({
            title: '上传成功!~~',
            icon: "success",
            duration:1200
          });
          // 上传成功后跳回之前的页面
          wx.navigateBack({
            delta: 1
          })
        }else{
         wx.showToast({
           title: '上传失败',
           icon: "success",
              duration: 1200
         })
        }
      }
    })

  }


})

