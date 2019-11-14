// pages/pickGoods/pickGoods.js
const api = require('../../request/api.js')
const http = require('../../request/http.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 订单详情数据
    goods: {
      name: 1
    },
    id:"",
    list:[],
    // 弹框变量
    showModalBl: false
  },
  // 显示弹框
  affirmNum() {
    this.setData({
      showModalBl: true
    })
  },
  // 取消函数
  cancel() {
    this.setData({
      showModalBl: false
    })
  },
  /**
   * 获取订单详情
   */
  initdata(){
    
  },
  // 确认函数
  confirm() {
   
  
    http.post(
      '/deliveryMan/confirmDelivery',{
        id: this.data.id
        }
     ).then(res => {
       if(res.success){
         this.setData({
           showModalBl: false
         })
         wx.showToast({
           title: '提交成功',
           icon: 'success',
           duration: 1000
         })
       }
      console.log(res)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData
    http.get(
      "/deliveryMan/getDeliveryConfirmation",{
        id: options.id
        }
     ).then(res => {
       res.data.wineSkuList = res.data.wineSkuList.split(",")
      
       res.data.hostingTime = api.formatDate(res.data.hostingTime - 0)
       this.setData({
         goods:res.data,
         id:options.id,
         list: res.data.wineSkuList
       })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})