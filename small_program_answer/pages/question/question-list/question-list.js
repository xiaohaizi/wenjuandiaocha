// pages/mine-info/mine-answer/mine-answer.js
var util = require("../../../utils/util.js");
const app = getApp();
Page({
  data: {
    question_list: [],
    page: 1,
    page_end: false,
    counts:0
  },

  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    that.data.page = 1;
    that.data.page_end = false;
    util.Requset("api/Question/answer", "GET", {
      "page": 1
    }, function(res) {
      wx.hideLoading();
      if (res.data.data.length > 0) {
        that.setData({
          question_list: res.data.data,
          counts: res.data.total,
        })
      }
      console.log(res);
    });

    // question_list[1]["item"] = arr;
    // question_list[2]["item"] = arr1;
    // this.setData({
    //   question_list: arr
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
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
    util.Requset("api/Question/answer", "GET", {     
      "page": 1
    }, function (res) {
      wx.hideLoading();
      if (res.data.data.length > 0) {     
        that.setData({
          question_list: res.data.data,
          counts: res.data.total,
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

    util.Requset("api/Question/answer", "GET", {   
      "page": that.data.page
    }, function (res) {
      wx.hideLoading();
      if (res.data.data.length > 0) {
        that.setData({          
          question_list: that.data.question_list.concat(res.data.data),
        })
      }else{
        that.data.page_end=true;
      }
    });
  },
});