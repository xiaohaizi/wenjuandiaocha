// pages/mine/mine.js
//获取应用实例
var util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  answer: function (event) {
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: "../../pages/mine-info/mine-answer/mine-answer"
    })
  },


  rank: function (event) {
    if (!this.data.hasUserInfo ) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: "../../pages/mine-info/rank/rank"
    })
  },
  
  // onGotUserInfo: function (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.userInfo)
  //   console.log(e.detail.rawData)
  // },

  inte: function (event) {
    if (!this.data.hasUserInfo || this.data.userInfo==null){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: "../../pages/mine-info/mine-integral/mine-integral"
    })
  },

  sign: function (event) {
    if (!this.data.hasUserInfo || this.data.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: "../../pages/mine-info/mine-signin/mine-signin"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    var that=this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      // 登录
      wx.login({
        success: data => {
          SubUserInfo(app.globalData.userInfo, data.code, function (res) {
            if (res.data.success) {
              app.globalData.phone = res.data.phone;
              app.globalData.company = res.data.company
              app.globalData.realname = res.data.realname;
              app.globalData.wechat_openid = res.data.wechat_openid  
              app.setData({
               // userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
            }
            wx.hideLoading();
          });
          }
      })
    } else {
      wx.showToast({
        title: '已取消',
        icon: 'none',
        duration: 1000
      })
      console.log("用户拒绝登陆");
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (app.globalData.phone.length < 2) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }

    if(app.globalData.userInfo==null)
    {
      this.setData({
        userInfo: null,
        hasUserInfo: false
      })
    }else{
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function SubUserInfo(userinfo, code, callback) {
  var data = {
    NickName: userinfo.nickName,
    AvatarUrl: userinfo.avatarUrl,
    Gender: userinfo.gender,
    City: userinfo.city,
    Province: userinfo.province,
    Country: userinfo.country,
    code: code
  }
  util.Requset("api/Login/LoginIn", "POST", data, callback);
}