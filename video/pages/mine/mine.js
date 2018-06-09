const app = getApp()

Page({
    data: {
        faceUrl: "../resource/images/noneface.png",
        fansCounts:0,
        followCounts:0,
        receiveLikeCounts:0


    },
    onLoad(){
      var serverUrl = app.serverUrl;
      var me =this;
//     var user =  app.userInfo;
      var user = app.getGlobalUserInfo('userInfo');
     if (user.faceImage != null && user.faceImage != undefined && user.faceImage !=''){
        me.setData({
          faceUrl: serverUrl + user.faceImage,
          fansCounts: user.fansCounts,
          followCounts: user.followCounts,
          receiveLikeCounts: user.receiveLikeCounts
        });
     }else{
       me.setData({
         faceUrl: "../resource/images/noneface.png",
         fansCounts: user.fansCounts,
         followCounts: user.followCounts,
         receiveLikeCounts: user.receiveLikeCounts
       });
     }
    },
    logout:function(){
      var serverUrl = app.serverUrl;
      var id = app.getGlobalUserInfo('userInfo').id
      wx.showLoading({
        title: '请等待...',
      });
      wx.request({
        url: serverUrl + '/loginout',
        method:'POST',
        data:{
          id:id
        },
        success:function(res){
            if(res.data.status == 200){
             // app.userInfo = null;
              wx.hideLoading();
              wx.showToast({
                title: '注销成功',
                icon: 'success',
                duration: 1500
              })
              wx.removeStorageSync("userInfo")
              wx.redirectTo({
                url: '../userLogin/login',
              });
             
            }else{
              wx.showToast({
                title: '注销失败',
                icon: 'none',
                duration: 1500
              })
            }
        }
      })
     
    },
    changeFace:function(){
      var me = this;
      var serverUrl = app.serverUrl;
      var userId = app.getGlobalUserInfo("userInfo").id;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
         
          var tempFilePaths = res.tempFilePaths
       
          wx.showLoading({
            title: '请等待...',
          });
          console.log(tempFilePaths[0]);
          wx.uploadFile({
            url: serverUrl + '/user/userFaceImage?userId=' + userId,
            filePath: tempFilePaths[0],
            name: 'file',
            success:function(res){
              var newRes = JSON.parse(res.data);
           
              if (newRes.status==200){
                me.setData({
                  faceUrl: serverUrl + newRes.result
                });
                console.log("地址："+serverUrl + newRes.result);
                wx.hideLoading();
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1500
                })
                }
            }
          })
        }
      })
    },
    uploadVideo:function(){

      var me = this;
      // var serverUrl = app.serverUrl;
      // var userId = app.getGlobalUserInfo('userInfo').id;

      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed : true,//是否开启视频压缩
        maxDuration : 15,
        success : function(res){
          var tempFilePath = res.tempFilePath;//视频临时路径
          var duration = res.duration;//视频时间
          var height =res.height;//视频长度
          var width = res.width;//视频宽度

          if(duration >16){
              wx.showToast({
                title: '上传视频不能超过15秒',
                icon:"none",
                duration: 1500
              })
          } else if (duration < 2){
            wx.showToast({
              title: '上传视频太短',
              icon: "none",
              duration: 1500
            })
          }else{
            wx.navigateTo({
              url: '../chooseBgm/chooseBgm?tempFilePath=' + tempFilePath
              + "&duration=" + duration
              +"&height=" + height
              +"&width=" + width

            })
          }

         // console.log(tempFilePath + " ::  " + "视频时间" + duration);
        }


      })
    }

    

})
