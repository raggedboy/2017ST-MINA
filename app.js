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
    dateAray:['2020-09-02',
              '2020-09-03',
              '2020-09-04',
              '2020-09-05']
  }
})