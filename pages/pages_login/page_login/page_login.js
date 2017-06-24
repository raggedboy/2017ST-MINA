// page_login.js

//TODO list
/*
  1-与产品确认clearbtn规则
  2-与产品确认placeholder显隐规则
  3-toast控件获取
  4-输入框限制
  5-密码加密
*/

//获取应用实例
var app = getApp()
Page(
  {
  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    password: '',
    pwdShow:'false',

    modalHidden:'true',
    modalMsg:'',

    clearPWDIconHidden:'true',
    clearMobileIconHidden: 'true',
    // userInfo: {}
  },

  /*
  用户操作
  */
  //点击登录按钮
  bindLoginBtn: function () {
    console.log('click success');

    var mobile = this.data.mobile;
    var pwd = this.data.password;

    //帐号判空
    if (mobile == '') {
      this.showModal('请输入用户名'); return;
    }
    //密码判空
    if (pwd == '') {
      this.showModal('请输入密码'); return;
    }

    console.log('verify success');

    //模拟密码判断
    if(this.data.password == '123')
    {
      //页面跳转
      wx.navigateTo({
        url: '../page_home/page_home',
      })
    }else{
      this.showModal('帐号或密码错误'); return;
    }

    //调用登录接口失败，清空密码

    //调用登录接口
    //登录成功：保存帐号密码至本地，下次打开，直接填上
    //登录成功：获得用户信息，存入全局变量
    //登录成功后跳转

    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },

  //1-成为焦点
  bindFocus: function (e) {
    var id = e.target.id;
    var value = e.detail.value;

    // this.showClearIcon(id, value == '');//clear icon show depends
    this.showClearIcon(id, false);//clear icon show depends
  },
  //2-失去焦点
  bindBlur: function (e) {
    var id = e.target.id;
    var value = e.detail.value;

    this.showClearIcon(id, true);//clear icon hidden
  },
  //3-输入响应
  bindInput: function (e) {
    var id = e.target.id;
    var value = e.detail.value;

    if (this.isMobileID(id)) {//mobile
      this.setData({ mobile: value });
    }
    if (this.isPwdID(id)) {//pwd
      this.setData({ password: value });
    }

    // this.showClearIcon(id, value == '');//clear icon show depends
  },

  //清理输入框
  bindClearIcon: function (e) {
    var id = e.target.id;
    if (this.isMobileID(id)) {//mobile
      this.setData({ mobile: '' });
    }
    if (this.isPwdID(id)) {//pwd
      this.setData({ password: '' });
    }
  },

  //clearicon显隐
  showClearIcon: function (id,bHidden) {
    if (this.isMobileID(id)) {//mobile
      this.setData({ clearMobileIconHidden: bHidden })
    }
    if (this.isPwdID(id)) {//pwd
      this.setData({ clearPWDIconHidden: bHidden })
    }
  },

  //密码显隐
  bindShowPWDIcon: function (e) {
    this.setData({ pwdShow:!this.data.pwdShow})
  },

  // var logs = wx.getStorageSync('logs') || [];
  // wx.setStorageSync('logs', logs)

  /*
  页面加载
  */
  onLoad: function (options) 
  {
    console.log('onLoad');

    //好绕，不看,反正登录微信顺带拿到用户信息了，密钥相关等待锡哥确认
    // var that = this
    // //登录
    // wx.login({
    //   success: function () {
    //     wx.getUserInfo({
    //       success: function (res) {
    //         that.setData({ userInfo: res.userInfo });
    //         that.update();
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // });

    //若曾登录成功，保存上次登录的帐号密码，用户只需直接点登录
  },
  //页面初次渲染完成
  onReady: function () {
  },
  //页面显示
  onShow: function () {
  },
  //页面隐藏
  onHide: function () {
  },
  //页面卸载
  onUnload: function () {
  },



  /*
  弹窗
  */
  //显示弹窗
  showModal: function (msg)
  {
    this.setData({
      modalHidden: false,
      modalMsg: msg
    });
  },
    // 弹窗消失
  modalChange: function () {
    this.setData({
      modalHidden: true,
      modalMsg: ''
    })
  },

  //内部方法
  isPwdID(id){ return id == "pwdID"; },
  isMobileID(id) { return id == "mobileID"; },
})
