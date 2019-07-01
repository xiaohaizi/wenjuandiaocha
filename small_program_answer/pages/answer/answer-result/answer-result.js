const app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    right_count: 0,
    score: 0,
    error_count: 0,
    create_time: 0,

  },
  onLoad: function(options) {
    var that = this;
    console.log(options.record_id);
    util.Requset("api/Question/record", "GET", {
      "record_id": options.record_id,
      "phone": app.globalData.phone
    }, function(res) {
      
      if (res.data.status == 200) {
        that.setData({
          right_count: res.data.data.right_count,
          score: res.data.data.score,
          error_count: res.data.data.error_count,
          create_time: res.data.data.create_time
        })
      }
    });
  },
  index_page:function(e){
    console.log(111);
    wx.switchTab({
      url: '/pages/index/index',
    })
   
  },
  user_page:function(){
    wx.switchTab({
      url: "/pages/mine/mine"
    })
  }
})