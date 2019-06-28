//app.js
App({
  onLaunch: function () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    this.userLogin();

  },
  userLogin:function(){
        var that=this;
        // 登录
        wx.login({
          success: data => {
            console.log(data);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            // 获取用户信息
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo;
                that.globalData.userInfo.integral="不详";
                console.log(that.globalData.userInfo);
                wx.showLoading({
                  title: '登录中',
                  mask: true
                })
                SubUserInfo(res.userInfo, data.code, function (res) {
                  if (res.data.success) {
                    that.globalData.ticket=res.data.ticket;
                    that.globalData.userInfo.integral = res.data.integral
                  }
                  wx.hideLoading();
                });
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  console.log("callback");
                  this.userInfoReadyCallback(res)
                }
              },
              fail: res => {
                console.log("登录失败");
                console.log(res);
              }
            })
          }
        })
   
  },
  globalData: {
    userInfo: null,
    domain: 'https://www.gmoai.top/',
    ticket:''
  }
})
var util = require("/utils/util.js");
function SubUserInfo(userinfo, code,callback) {
  var data = {
    NickName: userinfo.nickName,
    AvatarUrl: userinfo.avatarUrl,
    Gender: userinfo.gender,
    City: userinfo.city,
    Province: userinfo.province,
    Country: userinfo.country,
    code: code
  }
  util.Requset("Phone/Login/LoginIn", "POST", data, callback);
}