// page_login.js

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
  
//临时代码
     mobile = '15068865038',
    pwd = '123123'

    //帐号判空
    if (mobile == '') {
      this.showModal('请输入用户名'); return;
    }
    //密码判空
    if (pwd == '') {
      this.showModal('请输入密码'); return;
    }

    //为适配更改密码接口----
    getApp().globalData['mobile'] = mobile;

    var requestData = {
      mobile: mobile,
      password: pwd
    }
    console.log(requestData);

    var that = this;
    wx.request({
      url: 'https://www.landofpromise.cn/lop/app/member/login',
      data: requestData,
      method:'POST',
      success:function(res)
      {
        console.log(res.data);
        if (res.data.code == 200){
          that.requestSuccess(res.data.data);//登录成功
        }else{
          that.requestFail(res.data.msg);//登录失败
        }
      },
      fail:function(res){
        //that.requestFail(res.errMsg);//系统自带提示
        that.requestFail('亲，网络似乎不大好..');//登录失败
      }
    })

    //调用登录接口失败，清空密码
  },
  requestSuccess: function(data)
  {
    //判空保护
    if (!data.token || data.token.length == 0)return;

    //token存储
    getApp().globalData['token'] = data.token;
    getApp().globalData['roltType'] = data.roltType;
    //登录成功：保存帐号密码至本地，下次打开，直接填上
    //TODO
    //页面跳转
    wx.redirectTo({
      url: '../page_home/page_home',
    })
  },
  requestFail: function (msg) {
    this.showModal(msg);
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

  /*
  页面加载
  */
  onLoad: function (options) 
  {
  //页面初次渲染完成
  },
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
