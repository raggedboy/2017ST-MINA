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
    dateAray:[
      '2023-08-30',
      '2023-08-31',
      '2023-09-01',
      '2023-09-02',
    ]
  }
})