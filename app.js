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
    dateAray:['2018-08-30',
              '2018-08-31',
              '2018-09-01',
              '2018-09-02']
  }
})