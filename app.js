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
    dateAray:['2021-08-25',
              '2021-08-26',
              '2021-08-27',
              '2021-08-28',
            ]
  }
})