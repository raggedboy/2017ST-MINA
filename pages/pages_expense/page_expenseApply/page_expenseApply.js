//全局函数，不知道放哪里
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


// page_expenseApply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArray:["日常费用", "车票费用"],
    typeIndex:0,
    date: new Date().Format('yyyy-MM-dd'),
    startDate: '2017-06-01',
    endDate: '2017-09-20',
    input_list:[],
    totalCost: '0.0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ input_list: this.generateInputList(this.data.typeIndex) });
    // this.setData({ date: new Date().Format('yyyy-MM-dd') });
    // console.log(date);
    // var that = this;
    // setTimeout("that.setData({ date: date})", 1);
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
  },

  bindTypeChange: function (e) {
    console.log('：', e.detail.value)
    this.setData(
      {typeIndex:e.detail.value}
    );

    this.setData({ input_list: this.generateInputList(this.data.typeIndex) });
  },
// ===== 用户输入 =====
  bindInputChange: function (e) {
    var value = e.detail.value;

    this.data.input_list[e.target.id]['value'] = (value + '').match(/\d{0,3}(\.\d?)?/)[0];
    
    this.setData(
      { totalCost: this.calculateTotalCost(),
        input_list: this.data.input_list}
    );
  },

// ===== 表单提交 =====
  formSubmit: function (e) {
    
    // 处理表单空数据
    console.log('表单原始数据：', e.detail.value);
    var dic_submit = e.detail.value;
    for (var input_item of this.data.input_list)
    {
      var name = input_item.name;
      var value = dic_submit[name];
      if (!value || value.length == 0){
        dic_submit[name] = '0.0';
      }
    }
    console.log('最终提交数据：', e.detail.value);

    //提醒用户当天记录已提交，本地应该不做处理
    wx.showModal({
      title: '',
      content: '当天日常费用已申请报销，再次提交覆盖已有报销记录',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

// ===== 计算总收益 =====
  calculateTotalCost: function (){
    var totalCost = 0;
    for (var item of this.data.input_list) {
      if (item.value) {
        totalCost += parseFloat(item.value);
      }
    }
    return totalCost.toFixed(1);
  },

  generateInputList(typeIndex){
    if (typeIndex == 0){
      return [
        { 'name': 'costBreakfast', 'title': '早餐', 'value': '' },
        { 'name': 'costLunch', 'title': '中餐', 'value': '' },
        { 'name': 'costDinner', 'title': '晚餐', 'value': '' },
        { 'name': 'costUrbantraffic', 'title': '市内交通', 'value': '' },
        { 'name': 'costDrink', 'title': '饮料', 'value': '' },
        { 'name': 'costOthers', 'title': '其它', 'value': '' },
      ];
    }

    if (typeIndex == 1) {
      return [
        { 'name': 'ticket1', 'title': '家/杭州-目标城市车费', 'value': '' },
        { 'name': 'ticket2', 'title': '目标城市-嘉年华城市车费', 'value': '' },
      ];
    }
  }
})