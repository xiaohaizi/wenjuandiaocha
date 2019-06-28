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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.Requset("Phone/History/GetHistoryList", "GET", {}, function (res) {
      console.log(res);
      if (res.data.success) {
        var num=0;
        for (var i = 0; i < res.data.list.length; i++) {
          res.data.list[i].AnswerDate=res.data.list[i].AnswerDate.replace(/\//g, '-');
          num += res.data.list[i].CorrectNumber;
        }
        that.setData({
          HistoryList: res.data.list,
          Correct: num
        })
      }
    });
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