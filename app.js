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
    dateAray:['2017-09-01',
              '2017-09-02',
              '2017-09-03',
              '2017-09-04']
  }
})