// pages/mine-info/mine-answer/mine-answer.js
var util = require("../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HistoryList: [],
    user_phone: 0,
    page: 1,
    page_end: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.Requset("api/Question/score", "GET", { "phone": app.globalData.phone}, function (res) {
      
      if (res.data.status == 200) {
        var num = 0;
      
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].create_time.substr(0, 10));
          //res.data.data.data[i].create_time = res.data.data[i].create_time.substr(0, 10);

        }

        that.setData({
          HistoryList: res.data.data,
          user_phone: app.globalData.phone,
          member_rank: res.data.member_rank,
          //Correct: res.data.data.total
        })




      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.phone.length < 2) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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