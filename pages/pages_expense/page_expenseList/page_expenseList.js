var app = getApp()

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

// 当前时间
var oriDate = new Date().Format('yyyy-MM-dd');
// 实际日期
var arrayDate = [
  '2019-08-29',
  '2019-08-30',
  '2019-08-31',
  '2019-09-01',
  '2019-09-05'
];

// 筛选列表
var arrayFilter = [
  '2019-08-29',
  '2019-08-30',
  '2019-08-31',
  '2019-09-01',
  '车票费用'
];
// 初始筛选字段
var oriFilter = arrayFilter[0];

if (arrayDate.indexOf(oriDate) > 0){
  oriFilter = arrayFilter[arrayDate.indexOf(oriDate)];
}

Page({
  data: {
    roltType: 1,
    curTab: 0,//当前选中按钮,将会以checkType:0，非审核 1, 审核 字段传入详情页
    filter: oriFilter,
    arrayFilter: arrayFilter,
    // date: new Date().Format('yyyy-MM-dd'),
    tab_btn_list: ['报销列表','报销审核'],
    submit_btn_list: ['申请报销', '确认数据，提交财务'],
    submit_title: '申请报销',
    my_record_list: [],
    group_record_list: [],
    btn_disable: false
  } ,
  bindSubmitBtn: function (e) {
    if(this.data.curTab == 0){
      wx.navigateTo({
        url: '../page_expenseApply/page_expenseApply',
      });

      return;
    }

    var that = this;
    wx.showModal({
      title: '',
      content: '确定向财务提交当前 ' + this.data.group_record_list.length + ' 条有效申请?',
      success: function(e){
        if (e.confirm) {
          that.doCostListSubmit();
        } 
      }
    })
  },
  bindDateChange: function (e) {
    var index = e.detail.value;
    this.setData({
      filter: arrayFilter[index]
    })

    this.requestList();
  },
  bindQuestionBtn: function (e) {
    wx.showModal({
      title: '操作说明',
      content: '选择日期，点击【数据确认 提交财务】，即可将当天小组成员及组长的有效报销申请（组长通过的申请）提交给财务。一天的申请仅可提交一次，请确认无误后提交。',
      showCancel:false,
      confirmText:'关闭'
    })
  },

  bindTab: function (e) {
    console.log(e);
    var curTab = e.target.id;
    var submitTit = this.data.submit_btn_list[curTab];

    if (curTab == this.data.curTab)return; 
    this.setData({
      curTab: curTab,
      submit_title: submitTit
    });

    this.requestList();
  },

  refreshList: function(){
    if (this.data.curTab == 0) {
      this.setData({
        "list": this.data.my_record_list
      });
    } else {
      this.setData({
        "list": this.data.group_record_list
      });

      //提交按钮无效设置
      var btn_disable = false;
      for (var record of this.data.group_record_list) {
        if (record.submitStatus == 1) {
          btn_disable = true;
          break;
        }
      }
      this.setData({ "btn_disable": btn_disable});
    }
  },
  onLoad: function (options){
    this.setData({ roltType: app.globalData.roltType})
    
  },
  onShow: function (){
    this.requestList();
  },

  //============== 列表请求 ============
  requestList:function() {
    var index = arrayFilter.indexOf(this.data.filter);
    var date = arrayDate[index];
    var curTab = this.data.curTab;
    var token = getApp().globalData.token;
    var that = this;

    var data = { token: token };
    var url = 'https://www.landofpromise.co:8080/lop/app/cost/list';
    
    if (curTab == 1){
      data["thisDate"]=date;
      url = 'https://www.landofpromise.co:8080/lop/app/cost/someday/list';
    }
    console.log(data);
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 200) {
          that.requestSuccess(res.data.data, curTab);//登录成功
        } else {
          that.requestFail(res.data.msg);//登录失败
        }
      },
      fail: function (res) {
        //that.requestFail(res.errMsg);//系统自带提示
        that.requestFail('亲，网络似乎不大好..');//登录失败
      }
    });
  },

  //===============当天审核通过请求=================
  doCostListSubmit: function(){
    var index = arrayFilter.indexOf(this.data.filter);
    var date = arrayDate[index];
    var token = getApp().globalData.token;
    var that = this;

    var data = {
      thisDate: date,
      token: token
      };

    console.log(data);
    wx.request({
      url: 'https://www.landofpromise.co:8080/lop/app/cost/sup/submit',
      data: data,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 200) {
          that.requestList();//登录成功
        } else {
          that.requestFail(res.data.msg);//登录失败
        }
      },
      fail: function (res) {
        //that.requestFail(res.errMsg);//系统自带提示
        that.requestFail('亲，网络似乎不大好..');//登录失败
      }
    });
  },

//=========== 请求结果处理 ============

  requestSuccess: function (data, curTab) {
    if (curTab == 0){
      this.setData({ my_record_list: data });
    }else{
      this.setData({ group_record_list: data });
    }
    this.refreshList();
  },
  requestFail: function (msg) {
    wx.showModal({
      title: '',
      content: msg,
      showCancel:false
    })
  },
})