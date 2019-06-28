var util = require("../../utils/util.js");
const app = getApp();
Page({
    data: {
        banner_1: "../../images/banner/banner_1.jpg",
        banner_2: "../../images/banner/banner_2.jpg",
        banner_3: "../../images/banner/banner_3.jpg",
      realname:"",
      phone:"",
        // banner_1: "https://www.gmoai.top/Resources/banner/banner_1.jpg",
        // banner_2: "https://www.gmoai.top/Resources/banner/banner_2.jpg",
        // banner_3: "https://www.gmoai.top/Resources/banner/banner_3.jpg",
    },
  realname_input: function (e) {

    this.data.realname = e.detail.value;
    console.log(e.detail.value);
  },
  phone_input:function(e)
  {
    this.data.phone = e.detail.value;
  },
    onShareAppMessage: function (options){
      return {
        title: '节能有我，一起来答题，赢取精美礼品',
        path: 'pages/loading/loading',
        success: function (res) {
          // 转发成功
          console.log("转发成功");
          console.log(res);
        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败");
          console.log(res);
        }
      }
    },
    start: function (event) {
      if(this.data.realname.length<1){
        wx.showToast({
          title: '请输入姓名',
          icon:"none",
        });
        return;
      }

      if (this.data.phone.length <11) {
        wx.showToast({
          title: '请输入手机号',
          icon: "none",
        });
        return;
      }


        wx.navigateTo({
            url: "../../pages/answer/answer-loading/answer-loading"
        })
    },
    study: function () {
        wx.navigateTo({
          url: "../../pages/other/study/study"
        })
    },
    rubbish: function () {
        wx.navigateTo({
            url: "../../pages/other/rubbish/rubbish"
        })
    },
    sign: res => {
      wx.showLoading({
        title: '签到中',
        mask: true
      })
      util.Requset("Phone/Sign/UserSign", "POST", {}, function (res) {
        if (res.data.success) {
          app.globalData.userInfo.integral = res.data.integral;
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      });

    }
})