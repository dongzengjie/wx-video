//app.js
App({
  serverUrl: "http://127.0.0.1:8080",
  userInfo: null,

  setGlobalUserInfo:function(value){
    wx.setStorageSync('userInfo', value);
  },
  getGlobalUserInfo(){
    return wx.getStorageSync('userInfo');
  }
})