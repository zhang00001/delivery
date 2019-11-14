 
const http = require('../../request/http.js')
const api = require("../../request/api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModalBl: false,
    goodsList:[
      {}
    ],orderDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    http.get("/deliveryMan/queryBanquetById", { id: options.id }).then(res => {
      if (res.code == 200) {
        console.log(res.data.hostingTime)
        res.data.hostingTime = api.formatDate(res.data.hostingTime-0)
        this.setData({
          orderDetail: res.data
        })

      }
    })
     

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getOrdeeDetail(){
  
  },
  // 确定抢单 弹出框
  alertShow() {
//console.log(wx.getStorageSync(key))
    if (wx.getStorageSync('token')) {
      this.setData({
        showModalBl: true
      });
    console.log(wx.getStorageSync('token'))
    
     } else {
    wx.navigateTo({
       url: '/pages/index/index',
   })
     }


  },
  // 取消抢单
  cancel() {
    this.setData({
      showModalBl: false
    })
  },
  // 抢单
  confirm() {
    this.setData({
      showModalBl: false
    })
    var that = this;
    wx.showToast({
      title: '抢单成功',
      icon: 'success',
      duration: 1000
    });
 
    http.post("/deliveryMan/grabSingle", { id: this.data.orderDetail.activityId}).then(res=>{
      if(res.code==200){
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1000
        });
        wx.navigateTo({
          url: '/pages/orderIndex/orderIndex',
        })
      }else{
        wx.showToast({
          title: "一天只能抢一单",
          icon: 'error',
          duration: 2000
        });
      }
    })
    

    

  },


})