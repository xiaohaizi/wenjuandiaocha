const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取应用实例
const app = getApp();
var domain = app.globalData.domain;
function Requset(url,method,data,callback){
  wx.request({
    url: domain+url, 
    method:method,
    data:data,
    header: {
      'Cookie': app.globalData.ticket,
      'content-type': 'application/json' // 默认值
    },
    success: callback,
    fail:function(res){
      wx.showToast({
        title: '服务器异常',
        icon:'none',
        duration: 1000
      })
    },
    complete:function(res){
      console.log("complete回调函数：");
      console.log(res);
      if (res.data.status==302){
        app.globalData.userInfo=null;
        console.log(app.globalData.userInfo);
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000
        })
        // wx.switchTab({
        //   url: '../pages/mine/mine',
        // })
      }
    }
  })
}
//两个时间相差天数 兼容firefox chrome
function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
  var dateSpan,
    tempDate,
    iDays;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays
}
//将时间戳转换成2016-12-26 17:00:00
function ChangeDateTimeFormat(jsondate) {
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  }
  else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }
  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second = date.getMilliseconds() / 1000 < 10 ? "0" + parseInt(date.getMilliseconds() / 1000) : parseInt(date.getMilliseconds() / 1000);
  return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + second;
}
//将时间戳转换成2016-12-26
function ChangeDateFormat(jsondate) {
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  }
  else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }
  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return date.getFullYear() + "-" + month + "-" + currentDate;
}
module.exports = {
  formatTime: formatTime,
  Requset: Requset,
  datedifference: datedifference,
  ChangeDateFormat: ChangeDateFormat
}
