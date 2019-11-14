// pages/orderHistory/orderHistory.js
const api = require('../../request/api.js')
const http = require('../../request/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsBl: true,
    feastBl: true,
    expendBl: true,
    endBL: true,
    initdata:{}
  },
  // 下拉显示函数
  pullDownShowDetails() {
    this.setData({
      detailsBl: !this.data.detailsBl
    })
  },
  pullDownShowFeast() {
    this.setData({
      feastBl: !this.data.feastBl
    })
  },
  pullDownShowExpend() {
    this.setData({
      expendBl: !this.data.expendBl
    })
  },
  pullDownShowEnd() {
    this.setData({
      endBL: !this.data.endBL
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    http.post('/deliveryMan/completeOrderDetail',{
      id:"1578822387147"//options.id
      }).then(res => {
      console.log(res)
        res.data.orderDetailsRes.hostingTime = api.formatDate(res.data.orderDetailsRes.hostingTime - 0)
        res.data.surplusDetailsRes.imgUrls = res.data.surplusDetailsRes.imgUrls.split(",")
      this.setData({
        initdata:res.data
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