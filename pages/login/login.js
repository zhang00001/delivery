// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //验证码操作数据
    sendText: '获取验证码',
    timer: null,
    countdown: 10,
    canClick: true,

    //获取输入框内容
    phone: '',
    code: ''
  },

  //自写函数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  //自写函数
  sendCode() {
    console.log('倒计时函数')
    this.setData({
      canClick: false //点击后隐藏按钮
    })
    let timer = setInterval(() => {
      console.log(this.data.countdown)
      let countdown = this.data.countdown
        --countdown;
      console.log(countdown)
      this.setData({
        countdown: countdown
      })
      if (!countdown) { //倒计时为零
        clearInterval(this.data.timer)
        this.setData({
          countdown: 10,
          canClick: true,
          timer: null,
          sendText: '再次获取'
        })
      }
    }, 1000)
    this.setData({
      timer: timer
    })
  },
  getPhone(e) {
    let value = e.detail.value
    this.setData({
      phone: value
    })
  },
  getCode(e) {
    let value = e.detail.value
    this.setData({
      code: value
    })
  },
  showToast() {
    wx.showToast({
      title: '请完善信息',
      icon: 'none',
      duration: 1000
    })
  },
  confirm() {
    let code = this.data.code,
      phone = this.data.phone;
    var reg = /^(((1[3-9]{1}))+\d{9})$/; //验证规则，
    var flag = reg.test(phone);
    if (!flag) {
      wx.showModal({
        content: '请填写正确的账号',
        showCancel: false
      })
      return
    }
    if (!code) {
      wx.showModal({
        content: '请输入验证码',
        showCancel: false
      })
      return
    }
  },
})