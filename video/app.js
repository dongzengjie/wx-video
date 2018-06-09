//app.js
App({
  serverUrl: "http://83f73724.ngrok.io",
  userInfo: null,

  setGlobalUserInfo:function(key,value){
    wx.setStorageSync(key, value);
  },
  getGlobalUserInfo(key){
    return wx.getStorageSync(key);
  }
})