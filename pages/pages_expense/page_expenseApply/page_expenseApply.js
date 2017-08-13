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

var aray = ['2017-09-01',
            '2017-09-02',
            '2017-09-03',
            '2017-09-04'];

var today = new Date().Format('yyyy-MM-dd');
var date = today;
if (today.replace(/-/g, "") < aray[0].replace(/-/g, "")){
  date = aray[0];
} 
else if (today.replace(/-/g, "") > aray[0].replace(/-/g, "")){
  date = aray[aray.length - 1];
}

date.replace(/-/g, "");

// page_expenseApply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArray:["日常费用", "车票费用"],
    typeIndex:0,
    date: date,
    startDate: aray[0],
    endDate: aray[aray.length - 1],
    input_list:[],
    totalCost: '0.0',
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshList();
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

    this.refreshList();
  },

  refreshList: function (e) {
    this.setData(
      { input_list: this.generateInputList(this.data.typeIndex),
      remark:''});

    this.setData(
      {
        totalCost: this.calculateTotalCost(),
        input_list: this.data.input_list
      }
    );
  },
// ===== 用户输入 =====
  bindInputChange: function (e) {
    var value = e.detail.value;

    //this.data.input_list[e.target.id]['value'] = value + '';
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

    if (this.data.typeIndex == 1){
      dic_submit['costTime']='2017-09-05';
    }
    console.log('最终提交数据：', dic_submit);
    this.doCostAdd(dic_submit);
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
        { 'name': 'costDrink', 'title': '饮料', 'value': '' },
        { 'name': 'costUrbantraffic', 'title': '市内交通', 'value': '' },
        { 'name': 'costOthers', 'title': '其它', 'value': '' },
      ];
    }

    if (typeIndex == 1) {
      return [
        { 'name': 'costTicket', 'title': '家/杭州-目标城市', 'value': '' },
        { 'name': 'costReturnticket', 'title': '目标城市-嘉年华城市', 'value': '' },
      ];
    }
  },

  doCostAdd:function(data)
  {
    var url = "https://www.landofpromise.cn/lop/app/cost/add";
    url += "?token=" + getApp().globalData.token;
    console.log(data);
    var that = this;
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        if (res.data.code >= 200 || res.data.code <300) {
          that.requestSuccess(res.data.msg);//请求成功
        } else {
          that.requestFail(res.data.msg);//请求失败
        }
      },
      fail: function (res) {
        //that.requestFail(res.errMsg);//系统自带提示
        that.requestFail('亲，网络似乎不大好..');//添加失败
      }
    })
  },
  requestSuccess: function (msg) {
    if (!msg || msg.lenght == 0) 
    {
      wx.showToast({title: "添加成功",});
      wx.navigateBack({});
      return;
    }
    wx.showModal({
      title: '',
      content: msg,
      showCancel: false,
      success: function (res) {
        wx.navigateBack({});
      }
    })
  },
  requestFail: function (msg) {
    wx.showModal({
      title: '',
      content: msg,
      showCancel:false
    })
  },
})