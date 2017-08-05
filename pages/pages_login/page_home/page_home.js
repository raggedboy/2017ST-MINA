// page_home.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
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

  navigationBack(){
    wx.redirectTo({
      url: '../page_login/page_login',
    }); 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    //更改密码
    if (getApp().globalData.bPwdChange)
    {
      getApp().globalData["bPwdChange"]=false;
      
      var that = this;
      function showModalBack(){
        wx.showModal(
          {
            title: '',
            content: '密码更改成功，请重新登录',
            showCancel: false,
            success: function (res) { that.navigationBack(); }
          });
      }
      //setTimeout真难用
      setTimeout(function () {
        showModalBack();
      }, 100);
    }
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

  bindExpenseImg: function () {
    wx.navigateTo({
      url: '../../pages_expense/page_expenseList/page_expenseList',
    })
  },

  bindDataImg: function () {
    wx.navigateTo({
      url: '../../pages_expense/page_expenseList/page_expenseList',//数据模块入口
    })
  },

  bindChangePWDBtn: function () {
    wx.navigateTo({
      url: '../page_changePWD/page_changePWD',
    })
  },
})