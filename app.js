//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  
  globalData:{
    token:null,
    roltType:null,
    mobile: null,
    bPwdChange:false,
    dateAray:['2019-08-29',
              '2019-08-30',
              '2019-08-31',
              '2019-09-01']
  }
})