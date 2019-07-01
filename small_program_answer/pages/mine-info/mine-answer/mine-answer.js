// pages/mine-info/mine-answer/mine-answer.js
var util = require("../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HistoryList: [],
    Correct: 0,
    page: 1,
    page_end: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    var that = this;
    util.Requset("api/Question/GetHistoryList", "GET", {
      "phone": app.globalData.phone,
      "page": 1
    }, function(res) {

      if (res.data.status == 200) {
        var num = 0;
        for (var i = 0; i < res.data.data.data.length; i++) {
          res.data.data.data[i].create_time = res.data.data.data[i].create_time.substr(0, 10);

        }

        that.setData({
          HistoryList: res.data.data.data,
          Correct: res.data.data.total
        })




      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (app.globalData.phone.length < 2) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    wx.showLoading({
      title: '刷新中...',
    });
    that.data.page = 1;
    that.data.page_end = false;
    util.Requset("api/Question/GetHistoryList", "GET", {
      "phone": this.data.phone,
      "page": 1
    }, function(res) {
      wx.hideLoading();
      if (res.data.status == 200) {
        var num = 0;
        for (var i = 0; i < res.data.data.data.length; i++) {
          res.data.data.data[i].create_time = res.data.data.data[i].create_time.substr(0, 10);
          // num += res.data.list[i].CorrectNumber;
        }
        that.setData({
          HistoryList: res.data.data.data,
          Correct: res.data.data.total
        })
      }
      wx.hideNavigationBarLoading() //完成停止加载 
      wx.stopPullDownRefresh() //停止下拉刷新 
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中',
    });
    console.log(111);

    var that = this;
    if (that.data.page_end) {
      wx.showToast({
        title: '没有更多数据',
        icon: "none",
      });
      return;
    } else {
      that.data.page = that.data.page + 1;
    }


    util.Requset("api/Question/GetHistoryList", "GET", {
      "phone": app.globalData.phone,
      "page": that.data.page
    }, function(res) {
      wx.hideLoading();
      if (res.data.status == 200) {
        var num = 0;
        if (res.data.data.data.length < 15) {
          that.data.page_end = true;

        }

        for (var i = 0; i < res.data.data.data.length; i++) {
          res.data.data.data[i].create_time = res.data.data.data[i].create_time.substr(0, 10);
          // num += res.data.list[i].CorrectNumber;
        }
        that.setData({
          HistoryList: that.data.HistoryList.concat(res.data.data.data),
          // Correct: num
        })
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})