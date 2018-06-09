//app.js
App({
  serverUrl: "http://83f73724.ngrok.io",
  userInfo: null,

  setGlobalUserInfo:function(value){
    wx.setStorageSync('userInfo', value);
  },
  getGlobalUserInfo(){
    return wx.getStorageSync('userInfo');
  }
})