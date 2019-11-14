// pages/orderIndex/orderIndex.js
// import http from  '../../request/http'
const app=getApp()
const http = require('../../request/http.js')
const api = require("../../request/api.js") 
// const http = require('../../request/http.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    //选择栏目
    currentIdx: "0",
    left: 235,
    //获取列表
    hasAcceptList: true,
    hasCompleteList: true,
    acceptList: [], //订单公海列表
    completeList: [], //完成订单列表
    //是否展示占位图片
    hasList: true,
    showUser: false,
    //控制用户中心
    userLeft: -600,
    //是否弹窗
    isShowAlert: false,
    //是否显示特派任务
    isShowDistribute: false,
    isShowNext: false,
    //获取拒绝任务的原因
    cancelReason: '',
    //抢单列表
    GrabSingleList:[],
    pagenum:1
  },

  // 自写
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDataAcceptList()
    this.getDataCompleteList()
    this.getGrabSingleList()
    let _this=this
  wx.getUserInfo({
    success(res) {
      console.log(JSON.parse(res.rawData))
      _this.setData({
        user: JSON.parse(res.rawData)
      })
    }
  })
   
  },
  outlogin(){
    wx.clearStorage('token')
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  //订单公海列表请求数据
  getDataAcceptList() {
    wx.showLoading({
      title: '加载中',
    })
    http.get("/deliveryMan/getBanquetList", { pageNum: this.data.pagenum, pageSize: 10 }).then(res => {
      if (res.code == 200) {
        let arr =[] 
        for(let i in res.data.list){
          arr.push(res.data.list[i])
        }
        console.log(res.data.list)
        console.log(this.data.acceptList)
        this.setData({
          acceptList: arr,
          total: res.data.total
        })
console.log(this.data.acceptList)




      }
    })



  },
  //完成订单列表
  getDataCompleteList() {
    wx.showLoading({
      title: '加载中',
    })
    //分配订单列表
    http.get("/deliveryMan/distributionOrder").then(res => {

    })
    http.post('/deliveryMan/getCompleteOrder', { pageNum: 1, pageSize: 10 }).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.success){
        for (let i of res.data.list) {
          i.returnTime = api.formatDate(i.returnTime - 0)
        }
        this.setData({
          completeList: res.data.list
        })
      }
    
    })
  },
  //抢单列表
  getGrabSingleList() {
    wx.showLoading({
      title: '加载中',
    })
    http.post('/deliveryMan/getGrabSingleList', { pageNum: 1, pageSize: 10 }).then(res => {
      wx.hideLoading()
      for(let i of res.data.list){ 
        i.activityStartTime = api.formatDate(i.activityStartTime)
      }
      this.setData({
        GrabSingleList: res.data.list,
        total: res.data.total
      })

    })
      .catch(err => {
        console.log(err)
        wx.hideLoading()
      })
  },

  // 自写
  // 跳转详情页面

  skipDetails(e) {
 
    if (this.data.currentIdx == '0') {
      wx.navigateTo({
        url: '/pages/orderDetails/orderDatails?id=' + e.currentTarget.dataset.id,
      })
    }
    if (this.data.currentIdx == '1') {
      wx.navigateTo({
        url: '/pages/orderHistory/orderHistory?id=' + e.currentTarget.dataset.id,
      })

    }
  },
  // 跳转帮助页面
  jumpHelp() {
    wx.navigateTo({
      url: '/pages/help/help',
      event: {

      }
    })
  },
  //跳转订单准备页详情
  jumpToPrepare(e) {
    console.log(e.currentTarget.dataset.index) 
    console.log(e.currentTarget.dataset.status)
    if (e.currentTarget.dataset.status==4){
      wx.navigateTo({
        url: '/pages/prepare/prepare?id=' + e.currentTarget.dataset.index,
      })
    }
    if (e.currentTarget.dataset.status == 5) {
      this.jumpToPickGoods(e.currentTarget.dataset.index)
      
    }
    if (e.currentTarget.dataset.status == 6) {
      this.jumpToOrderUnderWay(e.currentTarget.dataset.index)
    }
    // if (e.currentTarget.dataset.status == 7) {
    //   this.jumpToPickGoods(e.currentTarget.dataset.index)
    // }
    if (e.currentTarget.dataset.status == 61 || e.currentTarget.dataset.status == 7) {
     
      this.jumpToOutstandingOrder(e.currentTarget.dataset.index)
    }
   

  },
  //跳转提货确认单
  jumpToPickGoods(e) {
    wx.navigateTo({
      url: '/pages/pickGoods/pickGoods?id='+e
    })

  },
  //进行中订单
  jumpToOrderUnderWay(e) {
    wx.navigateTo({
      url: '/pages/orderUnderway/orderUnderway?id='+e
    })
  },
  //带结订单
  jumpToOutstandingOrder(e) {
    wx.navigateTo({
      url: '/pages/outstandingOrder/outstandingOrder?id='+e
    })
  },

  //取消派送任务 进入下一步填写原因或返回
  goNextCancel() {
    this.setData({
      isShowNext: !this.data.isShowNext
    })
  },
  //填写拒绝任务的原因
  goFillReason(e) {
    let value = e.detail.value
    console.log(value)
    this.setData({
      cancelReason: value
    })
  },
  //确定拒绝任务
  goCancelDistribute() {
    let reason = this.data.cancelReason
    if (!reason) {
      wx.showModal({
        content: '请填写取消原因',
        showCancel: false
      })
      return
    }
    this.setData({
      isShowDistribute: false
    })
  },
  //接受任务
  goAcceptDistribute() {
    this.setData({
      isShowDistribute: false
    })
    //请求接口  确定接受任务
  },

  //修改底部弹出框的位置
  goShowAlert() {
    this.setData({
      isShowAlert: !this.data.isShowAlert
    })
  },
  // 显示隐藏用户中心
  goHideShow() {
    this.setData({
      showUser: !this.data.showUser,
    })
    let showUser = this.data.showUser
    if (showUser) {
      wx.nextTick(() => {
        this.setData({
          userLeft: 0
        })
      })
    } else {
      wx.nextTick(() => {
        this.setData({
          userLeft: -600
        })
      })
    }
  },
  // 选择订单公海或完成订单
  selectOption(e) {
    let value = e.currentTarget.dataset.index;
    if (value == "0") {
      this.setData({
        currentIdx: value,
        left: '230'
      });

    } else {
      this.setData({
        currentIdx: value,
        left: '535'
      });

    }
    console.log(this.data.currentIdx)
  },
  fn() {
    console.log(this.data.pagenum)
    if (this.data.pagenum>=this.data.total){
      return false
    }
    this.setData({
      pagenum: this.data.pagenum++
    })
    this.getDataAcceptList()
console.log(1)
  },
})