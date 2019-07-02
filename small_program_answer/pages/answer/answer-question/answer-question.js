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
    chooseItems: [],
    ChooseId: [],
    falg: false,
    timer: null,
    next: "下一题",
    tip_message: "请选择您的答案",
    time_nums: 10,
    is_end: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    util.Requset("api/Question/GetList", "GET", {}, function(res) {

      if (res.data.success) {
        that.setData({
          questionBank: res.data.list,
          questionShow: res.data.list[0],
          answer_type: res.data.list[0].q_type,
          questionIndex: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 2
              })
              wx.switchTab({
                url: '../../../pages/mine/mine',
              })
            }
          }
        })
      }
    });
  },
  userChoose: function(e) {
    var that = this;
    console.log(e instanceof Array);
    if ((e instanceof Array)) { //时间到了自动选择
      this.setData({
        ChooseId: that.data.ChooseId,
      
        falg: true
      })
    } else {
      if (e.currentTarget.dataset.qtype==2){ //如果是多选题目
        if (that.data.ChooseId.indexOf(e.currentTarget.dataset.optionsid) > -1) {
          remove_arr(that.data.ChooseId, e.currentTarget.dataset.optionsid);
        } else {
          that.data.ChooseId.push(e.currentTarget.dataset.optionsid);
        }
      }else{
        that.data.ChooseId=[];       
        that.data.ChooseId.push(e.currentTarget.dataset.optionsid);
      }      
     // console.log(that.data.ChooseId.indexOf(e.currentTarget.dataset.optionsid));
      this.setData({
        ChooseId: that.data.ChooseId,
       // answer_type: that.data.questionBank[that.data.questionIndex].q_type,
        falg: true
      })
    }


  },
  userConfirm: function() {

    var tmp_item = {};
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
   // that.data.questionBank[that.data.questionIndex].userAnswer=[];
    var userAnswer_tmp=[];
    var question_id_tmp=0;
   // console.log(that.data.questionBank[that.data.questionIndex]);
    if (that.data.ChooseId.length<1) {

      tmp_item = {
        "question_id": waitAnswer[0].question_id,
        "answer_id": []
      };
      that.data.chooseItems[that.data.questionIndex] = tmp_item;
    } else {
      for (var i = 0; i < waitAnswer.length; i++) {
        if (that.data.ChooseId.indexOf(waitAnswer[i].Id )>-1) {
          userAnswer_tmp.push(waitAnswer[i].Id);
         // that.data.questionBank[that.data.questionIndex].question_id = waitAnswer[i].question_id;
          question_id_tmp = waitAnswer[i].question_id;
          
        }
        tmp_item = {
          "question_id": question_id_tmp,
          "answer_id": userAnswer_tmp
        };
        that.data.chooseItems[that.data.questionIndex] = tmp_item;
        that.data.questionBank[that.data.questionIndex].CreateTime = "";
      }
    }

    console.log(that.data.chooseItems);
    that.data.time_nums = 10;
    that.data.ChooseId=[];
    //判断是否是最后一题
    if (that.data.questionIndex == that.data.questionBank.length - 1) {
      that.data.timer = null;
      that.data.is_end = true;
      clearTimeout(that.data.timer);
      clearInterval(that.data.timer);
      wx.showLoading({
        title: '正在提交',
        mask: true

      })
      util.Requset("api/Question/UserAnswer", "POST", {
        "phone": app.globalData.phone,
        "result": JSON.stringify(that.data.chooseItems)
      }, function(res_data) {


        wx.hideLoading();
        if (res_data.data.status == 200) {
          console.log(res_data);
          //app.globalData.userInfo.integral = res.data.integral;       
          wx.showModal({
            title: '提示',
            content: res_data.data.msg,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: "../../answer/answer-result/answer-result?record_id=" + res_data.data.record_id
                })
              }
            }
          })
        }
      });
    } else {
      //判断是否改变按钮文字
      if (that.data.questionIndex == that.data.questionBank.length - 2) {
        console.log(that.data.questionIndex);
        that.setData({
          questionShow: that.data.questionBank[that.data.questionIndex + 1],
          questionIndex: that.data.questionIndex + 1,
          answer_type: that.data.questionBank[that.data.questionIndex+1].q_type,
          next: '提交',
          falg: false
        })
      } else {
       
        that.setData({
         
          questionShow: that.data.questionBank[that.data.questionIndex + 1],
          questionIndex: that.data.questionIndex + 1,
          answer_type: that.data.questionBank[that.data.questionIndex+1].q_type,
        
          falg: false
        })
      }
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.onTimerFun();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    if (app.globalData.record_count > 2) {
        wx.showToast({
          title: '每个账号最多答题两次',
          icon: "none",
        });

      setTimeout(function () { 
        wx.switchTab({
          url: '/pages/index/index',
        })
       }, 1000) ;
      return;
    }
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
    var that = this;
    clearTimeout(that.data.timer);
    //clearInterval(that.data.timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onTimerFun: function() {
    var that = this;
    that.data.timer = setTimeout(function() {
      if (!that.data.is_end) {
        that.setData({
          tip_message: "剩余" + that.data.time_nums + "秒时间",
        })
        that.data.time_nums = that.data.time_nums - 1;

        that.onTimerFun();
        if (that.data.time_nums < 1) {

          that.userChoose(that.data.ChooseId);
          that.userConfirm();
        }
      }

    }, 1000);
  }

})


function remove_arr(arr,val) {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};