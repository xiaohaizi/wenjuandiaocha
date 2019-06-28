// pages/mine-info/mine-signin/mine-signin.js
var util = require("../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SignDate:[],
    SingDay:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.Requset("Phone/Sign/GetSignList", "GET", {}, function (res) {
      console.log(res);
      if (res.data.success) {
        var arr = [];
        for (var i = 0; i < res.data.list.length; i++) {
          arr.push(res.data.list[i].SignDate.replace(/\//g, '-'));
        }
        that.setData({
          SignDate: arr,
          SingDay: res.data.list.length
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