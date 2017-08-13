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
       "costUrbantraffic": "市内交通",
       "costOthers": "其它",

       "costTicket": "家/杭州-目标城市车费",
       "costReturnticket": "目标城市-嘉年华城市车费",

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
        "costTicket",
        "costReturnticket"
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

    this.requestDetail(options.costId);
  },

  bindClickBtn: function (e){
    
    var content = '确定' + (e.target.id == 1 ? '通过' : '不通过') + '当前报销申请？';
    var that = this;
    wx.showModal({
      title: '',
      content: content,
      success: function (res) {
        if (res.confirm) {
          that.doCostAudit(e.target.id);
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
  
  },

  requestDetail: function (costId) {
    var token = getApp().globalData.token;
    var that = this;

    var data = {
       costId: costId,
       token: token
    };
    wx.request({
      url: "https://www.landofpromise.cn/lop/app/cost/detail",
      data: data,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 200) {
          that.requestSuccess(res.data.data);//添加成功
        } else {
          that.requestFail(res.data.msg);//添加失败
        }
      },
      fail: function (res) {
        //that.requestFail(res.errMsg);//系统自带提示
        that.requestFail('亲，网络似乎不大好..');//添加失败
      }
    })
  },
  requestSuccess: function (data) 
  {
    this.setData({ data: data });
  },
  requestFail: function (msg)
  {
    wx.showModal({
      title: '',
      content: msg,
      showCancel: false
    })
  },


  doCostAudit: function (auditStatus) {
    var url = "https://www.landofpromise.cn/lop/app/cost/sup/audit";
    url += "?token=" + getApp().globalData.token;

    var data = { 
      costId:this.data.data.id,
      auditStatus: auditStatus
    };
    console.log(data);
    var that = this;
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 200) {
          wx.navigateBack({});//请求成功
        } else {
          that.requestFail(res.data.msg);//请求失败
        }
      },
      fail: function (res) {
        //that.requestFail(res.errMsg);//系统自带提示
        that.requestFail('亲，网络似乎不大好..');//添加失败
      }
    })
  }
})