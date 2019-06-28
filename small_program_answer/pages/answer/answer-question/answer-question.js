// pages/answer/answer-question/answer-question.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionBank: [],
    questionShow: {},
    questionIndex: 0,
    ChooseId: 0,
    falg: false,
    next: "下一题",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.Requset("Phone/Question/GetList", "GET", {}, function (res) {
      console.log(res);
      if (res.data.success) {
        that.setData({
          questionBank: res.data.list,
          questionShow: res.data.list[0],
          questionIndex: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 2
              })
              // wx.switchTab({
              //   url: '../../../pages/mine/mine',
              // })
            }
          }
        })
      }
    });
  },
  userChoose: function (e) {
    this.setData({
      ChooseId: e.currentTarget.dataset.optionsid,
      falg: true
    })
  },
  userConfirm: function () {
    console.log(this.data.falg);
    //判断是否选择答案
    if (!this.data.falg) {
      wx.showToast({
        title: '请选择您的答案',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    //将选中的答案存入题库
    var that = this;
    var waitAnswer = that.data.questionBank[that.data.questionIndex].answers;
    for (var i = 0; i < waitAnswer.length; i++) {
      if (waitAnswer[i].Id == that.data.ChooseId) {
        that.data.questionBank[that.data.questionIndex].userAnswer = waitAnswer[i].Id;
      }
      that.data.questionBank[that.data.questionIndex].CreateTime = "";
    }
    //判断是否是最后一题
    if (that.data.questionIndex == that.data.questionBank.length - 1) {
      wx.showLoading({
        title: '正在提交',
        mask: true

      })
      util.Requset("Phone/Question/UserAnswer", "POST", JSON.stringify(that.data.questionBank), function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.success) {
          app.globalData.userInfo.integral = res.data.integral;
        }
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 2
              })
            }
          }
        })
      });
    } else {
      //判断是否改变按钮文字
      if (that.data.questionIndex == that.data.questionBank.length - 2) {
        that.setData({
          questionShow: that.data.questionBank[that.data.questionIndex + 1],
          questionIndex: that.data.questionIndex + 1,
          next: '提交',
          falg: false
        })
      } else {
        that.setData({
          questionShow: that.data.questionBank[that.data.questionIndex + 1],
          questionIndex: that.data.questionIndex + 1,
          falg: false
        })
      }
    }
    console.log(that.data.questionBank);
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