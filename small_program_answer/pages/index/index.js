var util = require("../../utils/util.js");
const app = getApp();
Page({
  data: {
    // banner_1: "../../images/banner/banner_1.jpg",
    // banner_2: "../../images/banner/banner_2.jpg",
    // banner_3: "../../images/banner/banner_3.jpg",
    banner_1: "../../images/banner/banner_4.jpg",
    realname:"",
    phone: "",
    company:  "",
    // banner_1: "https://www.gmoai.top/Resources/banner/banner_1.jpg",
    // banner_2: "https://www.gmoai.top/Resources/banner/banner_2.jpg",
    // banner_3: "https://www.gmoai.top/Resources/banner/banner_3.jpg",
  },
  onLoad: function (options) {

    this.setData({
      realname: app.globalData.realname ? app.globalData.realname : "",
      phone: app.globalData.phone ? app.globalData.phone : "",
      company: app.globalData.company ? app.globalData.company : "",
      hasUserInfo: app.globalData.hasUserInfo,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.realname);
    this.setData({
      realname: app.globalData.realname,
      phone: app.globalData.phone,
      hasUserInfo: app.globalData.hasUserInfo,
    })
  },
  realname_input: function (e) {
    this.data.realname = e.detail.value;
  },
  phone_input: function (e) {
    this.data.phone = e.detail.value;

  },

  company_input: function (e) {
    this.data.company = e.detail.value;
    //console.log(e.detail.value);

  },
  onShareAppMessage: function (options) {
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

    // app.globalData.phone = "15072433059";
    // wx.redirectTo({
    //   url: "../../pages/answer/answer-loading/answer-loading"
    //  //url:"../../pages/answer/answer-result/answer-result"
    // })
    // return ;
    if (this.data.realname.length < 1) {
      wx.showToast({
        title: '请输入姓名',
        icon: "none",
      });
      return;
    }

    if (this.data.phone.length < 11) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
      });
      return;
    }
    app.globalData.realname = this.data.realname;
    app.globalData.phone = this.data.phone;

    util.Requset("api/login/login", "POST", {
      "realname": this.data.realname,
      "phone": this.data.phone,
      "wechat_openid": app.globalData.wechat_openid
    },
      function (data) {
        wx.navigateTo({
          //url: "../../pages/answer/answer-question/answer-question"
        })

      });


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
  getUserInfo: function (e) {
    var that = this;
    if (that.data.realname.length < 1) {
      wx.showToast({
        title: '请输入姓名',
        icon: "none",
      });
      return;
    }
    if (that.data.phone.length < 11) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
      });
      return;
    }

    if (!that.data.company) {
      wx.showToast({
        title: '请输入公司名称',
        icon: "none",
      });
      return;
    }

    if (that.data.company.length < 2) {
      wx.showToast({
        title: '请输入公司名称',
        icon: "none",
      });
      return;
    }

   

    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      // 登录
      wx.login({
        success: data => {
          SubUserInfo(app.globalData.userInfo, data.code, function (res) {
            wx.showLoading({
              title: '加载中...',
            });
            if (res.data.success) {
              util.Requset("api/login/login", "POST", {
                "realname": that.data.realname,
                "phone": that.data.phone,
                "company": that.data.company,
                "wechat_openid": app.globalData.wechat_openid
              },
                function (res_data) {
                  wx.hideLoading();
                  app.globalData.phone = res_data.data.data.phone;
                  app.globalData.company = res_data.data.data.company
                  app.globalData.realname = res_data.data.data.realname;
                  app.globalData.wechat_openid = res_data.data.data.wechat_openid;                 
                  app.globalData.hasUserInfo = true;                  
                  app.globalData.record_count = res_data.data.record_count;
                  console.log(app.globalData.phone);
                  if (res_data.data.record_count > 1) {
                    wx.showToast({
                      title: '每个账号最多答题两次',
                      icon: "none",
                    });
                    return;
                  } else {
                   wx.navigateTo({
                     url: "../../pages/answer/answer-question/answer-question"
                   })
                  }


                });
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