// page_expenseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     data:{checkStatus:0},//不写初始化数据会报错
     checkType:0,
     title: {
       "totalcost0": "日常费用",
       "totalcost1": "车票费用",

       "costBreakfast": "早餐",
       "costLunch": "中餐",
       "costDinner": "晚餐",
       "costDrink": "饮料",
       "costUrbantraffic": "室内交通",
       "costOthers": "其它",

       "costTicket1": "家/杭州-目标城市车费",
       "costTicket2": "目标城市-嘉年华城市车费",

       "remark": "备注"
     },

     detail_list:
     [
      [
         "costBreakfast",
         "costLunch",
         "costDinner",
         "costDrink",
         "costUrbantraffic",
         "costOthers"
      ],
      [
        "costTicket1",
        "costTicket2"
      ]
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(options.checkType);
    this.setData({ checkType: options['checkType']});

    var retData =
    {
      "msg": "success",
      "code": 200,
      "data": {
        "delFlag": null,
        "createUserId": 1,
        "createTime": "2017-06-25 21:25:51",
        "updateUserId": null,
        "updateTime": null,
        "id": 1,//
        "subId": 2,//组长id
        "memberId": 1,
        "memberName": "唐玉杰",
        "costType":0,//0常规花销 1车费花销

        "costTime": "2017-06-24",

        "costBreakfast": 1.1,
        "costLunch": 2.2,
        "costDinner": 3.3,
        "costDrink": 4.4,
        "costUrbantraffic": 5.5,
        "costOthers": 8.8,

        "totalcost": 39.6,

        "remark": "有人暗恋腿哥有人暗恋腿哥有人暗恋腿哥有人暗恋腿哥有人暗恋腿哥有人暗恋腿哥有人暗恋腿哥有人暗恋腿哥",
        "checkStatus": 0,

        "costTicket1": 6.6,
        "costTicket2": 7.7,
      }
    }

    this.setData({data: retData.data});
  },

  bindClickBtn: function (e){
    
    var content = '确定' + (e.target.id == -1 ? '不通过' : '通过') + '当前报销申请？';
    wx.showModal({
      title: '',
      content: content,
      success: function (res) {
        if (res.confirm) {
          console.log(e.target.id+'提交');
        }
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
  
  }
})