var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dates: util.getDate(new Date()),//获取当前时间
    index: 0,
    disabled: false,
    hiddenModal: true,
    submit_error: '',
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function () {
    //获取组员列表
    var url = "https://www.landofpromise.co:8080/lop/app/data/member/list";
    url += "?token=" + getApp().globalData.token;
    var that = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        if (data.code === 200) {
          var data = data.data;
          var array = [];
          for (var i = 0, length = data.length; i < length; i++) {
            array.push(data[i].memberName);
          }
          that.setData({
            array: array,     //组员列表
            memberData: data  //组员信息
          });
        } else {
          var msg = '查询组员信息失败，请稍后重试';
          that.inquireError(msg);
        }

      },
      fail: function () {
        var msg = '网络错误，请稍后重试';
        that.inquireError(msg);
      }
    })

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

  //组员选择
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  //保存用户输入数据
  saveMeetNum: function (e) {
    this.setData({
      meetNum: e.detail.value
    })
  },

  saveShareNum: function (e) {
    this.setData({
      shareNum: e.detail.value
    })
  },

  saveAcceptNum: function (e) {
    this.setData({
      acceptNum: e.detail.value
    })
  },

  saveFindNum: function (e) {
    this.setData({
      findNum: e.detail.value
    })
  },

  //提交处理
  submit: function (e) {
    var data = this.data,
      meetNum = data.meetNum ? data.meetNum : 0,
      shareNum = data.shareNum ? data.shareNum : 0,
      acceptNum = data.acceptNum ? data.acceptNum : 0,
      findNum = data.findNum ? data.findNum : 0;
    var submitData = {
      "memberId": data.memberData[data.index].memberId,
      "dataTime": data.dates,
      "dataMeet": meetNum,
      "dataShare": shareNum,
      "dataAccept": acceptNum,
      "dataFind": findNum
    }
    //submitData = JSON.stringify(submitData);
    var url = "https://www.landofpromise.co:8080/lop/app/data/add";
    url += "?token=" + getApp().globalData.token;
    var that = this;
    wx.request({
      url: url,
      data: submitData,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        if (data.code == 200) {
          var msg = '提交成功'
          that.submitInfo(msg);
        } else {
          var msg = '提交失败，请重新提交'
          that.submitInfo(msg);
        }
      },
      fail: function () {
        var msg = '网络错误，请稍后重试'
        that.submitInfo(msg);
      }
    })

  },

  //组员列表请求异常处理
  inquireError: function(msg){
    this.setData({
      modelTitle: msg,
      hiddenModal: false,
      disabled: true,
      submit_error: 'submit_error'
    })
  },

  //提交请求异常处理
  submitInfo: function (msg) {
    this.setData({
      modelTitle: msg,
      hiddenModal: false
    })
  },

  //跳转查看数据页
  bindViewadded: function () {
    wx.navigateTo({
      url: '../page_dataView/page_dataView',
    })
  },

  btnconfirm: function () {
    this.setData({
      hiddenModal: true
    })
  },

  //微信小程序的number键盘只有数字
  /*bindReplaceInput: function (e) {
    var value = e.detail.value
    return {
      value: value.replace(/[^\d]/g, "")
    }
  }*/


})