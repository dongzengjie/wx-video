function uploadVideo() {
  var me = this;
  // var serverUrl = app.serverUrl;
  // var userId = app.getGlobalUserInfo('userInfo').id;

  wx.chooseVideo({
    sourceType: ['album', 'camera'],
    compressed: true,//是否开启视频压缩
    maxDuration: 15,
    success: function (res) {
      var tempFilePath = res.tempFilePath;//视频临时路径
      var duration = res.duration;//视频时间
      var height = res.height;//视频长度
      var width = res.width;//视频宽度

      if (duration > 16) {
        wx.showToast({
          title: '上传视频不能超过15秒',
          icon: "none",
          duration: 1500
        })
      } else if (duration < 2) {
        wx.showToast({
          title: '上传视频太短',
          icon: "none",
          duration: 1500
        })
      } else {
        wx.navigateTo({
          url: '../chooseBgm/chooseBgm?tempFilePath=' + tempFilePath
          + "&duration=" + duration
          + "&height=" + height
          + "&width=" + width

        })
      }

      // console.log(tempFilePath + " ::  " + "视频时间" + duration);
    }


  })
}

module.exports={
  uploadVideo: uploadVideo
}