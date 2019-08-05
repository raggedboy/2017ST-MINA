// page_changePWD.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arayInputGroup:
    [
      { id: 'oldPwdID', index:0, name:'oldPassword',
        value:'', title: '原密码', placeholder:'请输入原密码',
        pwdShow: false, clearBtnHide: true,
      },
      {
        id: 'newPwd1ID', index: 1, name: 'newPassword1',
        value: '', title: '新密码', placeholder: '请输入新密码', 
        pwdShow: false, clearBtnHide: true
      },
      {
        id: 'newPwd2ID', index: 2, name: 'newPassword2',
        value: '', title: '确认密码', placeholder: '请确认密码', 
        pwdShow: false, clearBtnHide: true
      }
    ],
    modalHidden:true,
    modalMsg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /*
       用户操作
       */
  //点击登录按钮
  formSubmit: function (e) {
    var formData = e.detail.value;

    var oldPassword = formData.oldPassword;//旧密码
    var newPassword1 = formData.newPassword1;//新密码
    var newPassword2 = formData.newPassword2;//确认新密码

    if (oldPassword == ""){ this.showModal("请输入原密码"); return; }
    if (newPassword1 == "") { this.showModal("请输入新密码"); return; }
    if (newPassword2 == "") { this.showModal("请输入确认密码"); return; }
    if (!RegExp(/^\w{6,20}$/).test(newPassword1)) { this.showModal("新密码格式错误"); return; }
    if (newPassword2 != newPassword1) { this.showModal("确认密码与新密码不一致"); return; }

    formData["mobile"] = getApp().globalData.mobile;
    console.log(formData);

    var that = this;
    //发送请求
    wx.request({
      url: 'https://www.landofpromise.co:8088/lop/app/member/change/password',
      data: formData,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          that.requestSuccess();//登录成功
        } else {
          that.requestFail(res.data.msg);//登录失败
        }
      },
      fail: function (res) {
        //that.requestFail(res.errMsg);//系统自带提示
        that.requestFail('亲，网络似乎不大好..');//登录失败
      }
    })
  },

  requestSuccess: function () {
    getApp().globalData["bPwdChange"] = true;
    wx.navigateBack({});
  },
  requestFail: function (msg) {
    this.showModal(msg);
  },

  //1-成为焦点
  bindFocus: function (e) {
    var id = e.target.id;
    var value = e.detail.value;

    var item = this.getItem(id);
    item["clearBtnHide"] = false;
    // item["clearBtnHide"] = value == '';
    this.setItem(item);
  },
  //2-失去焦点
  bindBlur: function (e) {
    var id = e.target.id;
    var value = e.detail.value;

    var item = this.getItem(id);
    item["clearBtnHide"] = true;
    this.setItem(item);;//clear icon hidden
  },
  //3-输入响应
  bindInput: function (e) {
    var id = e.target.id;
    var value = e.detail.value;

    var item = this.getItem(id);
    item["value"] = value;
    // item["clearBtnHide"] = value == '';
    this.setItem(item);
  },

  //清理输入框
  bindClearIcon: function (e) {
    var item = this.getItem(e.target.id);
    item["value"] = '';
    item["clearBtnHide"] = true;
    this.setItem(item);
  },

  //密码显隐
  bindShowPWDIcon: function (e) {
    var item = this.getItem(e.target.id);
    item["pwdShow"] = !item.pwdShow;
    this.setItem(item);
  },

  //获取对应item
  getItem: function(id){
    var item;//用for in 取值取不到 sigh
    for (var i = 0; i < 3; i++) 
    {
      item = this.data.arayInputGroup[i];
      if (item.id == id) break;
    };
    return item;
  },
  //设置item刷新页面
  setItem: function(item){
    this.data.arayInputGroup[item.index] = item;
    this.setData({ arayInputGroup: this.data.arayInputGroup });
  },

  /*
弹窗
*/
  //显示弹窗
  showModal: function (msg) {
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
})