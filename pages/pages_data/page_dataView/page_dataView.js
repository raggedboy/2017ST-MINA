var util = require('../../../utils/util.js');
Page({
  data: {
    date: util.getDate(new Date()),
    hiddenModal: true,
    tipsshow: 'hide'
  },
  onLoad: function () {
    //查询数据和权限
    this.refreshData(this.data.date);
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    //更新统计数据
    this.refreshData(this.data.date);
  },

  //查询数据列表
  refreshData: function (date) {
    var url = "https://www.landofpromise.cn/lop/app/data/sup/list";
    url += "?thisDate=" + date + "&token=" + getApp().globalData.token;
    var that = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        if (data.code === 200) {
          var data = data.data
          that.setData({
            dataMeetTotal: data.dataMeetTotal,
            dataShareTotal: data.dataShareTotal,
            dataAcceptTotal: data.dataAcceptTotal,
            dataFindTotal: data.dataFindTotal,
            place: data.place,
            listData: data.dataSubItem,  //列表信息
            tipsshow: ''
          });
        } else if (data.code === 706) {
          var msg = data.msg;
          that.errorShow(msg);
        } else {
          var msg = '数据查询失败，请稍后重试'
          that.errorShow(msg);
        }

      },
      fail: function () {
        var msg = '网络错误，请稍后重试'
        that.errorShow(msg);
      }
    })
  },

  btnconfirm: function () {
    this.setData({
      hiddenModal: true
    })
  },
  
  //查询请求异常处理
  errorShow: function (msg) {
    this.setData({
      modelTitle: msg,
      hiddenModal: false,
      tipsshow: 'hide'
    })
  }
})