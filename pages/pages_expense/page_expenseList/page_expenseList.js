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

var id;
Page({
  data: {
    userLevel:1,
    submitBtnAvailable:true,
    curTab: 0,//当前选中按钮,将会以checkType:0，非审核 1, 审核 字段传入详情页
    date: new Date().Format('yyyy-MM-dd'),
    tab_btn_list: ['报销列表','报销审核'],
    submit_btn_list: ['申请报销', '确认数据，提交财务'],
    submit_title: '申请报销',
    my_record_list: [
      // {
      //   "costType": 0,
      //   "costId": 1,
      //   "costTime": "2017-06-24",
      //   "dailyCost": 25.3,
      //   "checkSatus": 0,
      //   "memberName": "唐玉杰"
      // },
      // {
      //   "costType": 1,
      //   "costId": 2,
      //   "costTime": "2017-06-25",
      //   "trainCost": 14.3,
      //   "checkSatus": 1,
      //   "memberName": "唐玉杰"
      // }
    ],
    group_record_list: [{
      "costType": 1,
      "costId": 2,
      "costTime": "2017-06-25",
      "trainCost": 14.3,
      "checkSatus": 1,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 3,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 2,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 4,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 3,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 3,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 2,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 4,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 3,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 5,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 0,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 3,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 2,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 4,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 3,
      "memberName": "唐玉杰"
    },
    {
      "costType": 0,
      "costId": 5,
      "costTime": "2017-06-26",
      "dailyCost": 25.4,
      "checkSatus": 0,
      "memberName": "唐玉杰"
    }]
  } ,
  bindSubmitBtn: function (e) {
    if(this.data.curTab == 0){
      wx.navigateTo({
        url: '../page_expenseApply/page_expenseApply',
      });

      return;
    }

    wx.showModal({
      title: '',
      content: '确定向财务提交当前X人的X条有效申请?',
      success: function(e){
        console.log(e);
      }
    })

  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })

    //重新请求group_record数据
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

    if(curTab == 0){
      this.setData({
        "list": this.data.my_record_list
      });
    }else{
      this.setData({
        "list": this.data.group_record_list
      });
    }
  },
  onLoad: function (options) {

    this.setData({
      "list": this.data.my_record_list
    });
    // var that = this

    // wx.request({
    //   url: 'http://www.huanqiuxiaozhen.com/wemall/goods/inqGoodsByTypeBrand?brand=' + 1 + "&typeid=" + 1,
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       list: res.data.data
    //     });
    //   }
    // })
  },
})