// pages/mine-info/mine-answer/mine-answer.js
var util = require("../../../utils/util.js");
const app = getApp();
Page({
  data: {
    question_list: [],
    record_id: 0,
    page_end: false,
    counts: 0
  },

  onLoad: function (options) {
    console.log(options);
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    that.data.record_id = options.record_id;
    //that.data.page_end = false;
    util.Requset("api/Answer/error_info", "GET", {
      "phone": app.globalData.phone,
      "record_id": that.data.record_id
    }, function (res) {
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },
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
});