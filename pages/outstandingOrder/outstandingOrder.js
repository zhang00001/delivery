// pages/outstandingOrder/outstandingOrder.js
const http = require("../../request/http.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab栏切换变量
    tabBl: false,
    // 弹框变量
    id:'',
    showModalBl: false,
    initlist: [],
    imglist: [],
    imgids: [],
    uplist: [],
    imgurl:""
  },
  // tab栏切换函数
  switcherFn(e) {
    let { index } = e.currentTarget.dataset
    if (index == 1) {
      this.setData({
        tabBl: true
      })
    } else {
      this.setData({
        tabBl: false
      })
    }
  },

  getNvalue(e) {
    console.log(e.detail.value)
    let i = e.target.dataset.index
    console.log(this.data.uplist[i])
    this.data.uplist[i].damageWineNum = e.detail.value
    this.setData({
      uplist:this.data.uplist
    })
    console.log(this.data.uplist)
  },
  getOvalue(e) {
    let i = e.target.dataset.index
    console.log(this.data.uplist[i])
    this.data.uplist[i].wineNum = e.detail.value
    this.setData({
      uplist: this.data.uplist
    })
   },
  // 图片上传功能
  addImage() {
    var that = this;
    wx.chooseImage({
      count: 3, //选择图片数量
      sourceType: ['album', 'camera'], //图片来源
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: http.baseURL + '/productPhotos/fileUpload',//
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'x-access-token': "Bearer_eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3d3cuZ3l0eC5jb20iLCJleHAiOjE1NzM0NjE1MTMsInVzZXJOYW1lIjoibGVzc29u6Ieq5p2l5a6i5YiG5L2j5YiG5YWs5Y-4IiwidXNlcklkIjoiMiIsImNvbXBhbnlJZCI6IjIiLCJhdWQiOiJneXR4IGFwcCIsImlhdCI6MTU3MjU5NzUxM30.OhQhduf-HyyBNyQX8K-EEjfLts_-M7SHFBlRVl6CIkJ0Nny04hc4NKW0Qgl1pSd9fIiV51xbPcvFp_bM9Vp1oA",
          },
          success: function (res) {
            console.log(res) //接口返回网络路径
            var data = JSON.parse(res.data).data
            console.log(data.fileId)
            that.data.imglist.push(data.fileUrl)
            that.data.imgids.push(data.fileId)
            that.setData({
              imglist: that.data.imglist,
              imgids: that.data.imgids,
            
            })
            // console.log(that.data.picPaths)
          }
        })
      }
    })
  },
/**
 * 删除照片
 */
  remimg(e) {
    let i = e.target.dataset.index
    this.data.imglist.splice(i, 1)
    this.data.imgids.splice(i, 1)
    this.setData({
      imglist: this.data.imglist,
      imgids: this.data.imgids
    })
  },
  // 信息填写完成 显示弹框
  alertShow() {
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
  // 确认函数
  confirm() {
    let data={
      activityId:this.data.id,
      list: this.data.uplist,
      photoIds: this.data.imgids
    }
    http.post("/deliveryMan/confirmStatement", data, { 'content-type': "application/json", 'x-access-token': "Bearer_eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3d3cuZ3l0eC5jb20iLCJleHAiOjE1NzM0NjE1MTMsInVzZXJOYW1lIjoibGVzc29u6Ieq5p2l5a6i5YiG5L2j5YiG5YWs5Y-4IiwidXNlcklkIjoiMiIsImNvbXBhbnlJZCI6IjIiLCJhdWQiOiJneXR4IGFwcCIsImlhdCI6MTU3MjU5NzUxM30.OhQhduf-HyyBNyQX8K-EEjfLts_-M7SHFBlRVl6CIkJ0Nny04hc4NKW0Qgl1pSd9fIiV51xbPcvFp_bM9Vp1oA"}).then(res=>{
      console.log(res)
      this.setData({
        showModalBl: false
      })
      wx.showModal({
        title: '恭喜你',
        showCancel: false,
        content: '订单完成',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initdata(options.id)
  },
  initdata(id) {
    http.get("/deliveryMan/getPendingOrder", {
      id: "1578822387147"//id
    }).then(res => {
      console.log(res)
      for (let i in res.data) {
        console.log(i)
        this.data.uplist.push({ damageWineNum: 0, skuId: res.data[i].activityId, wineNum: 0 })
      }
      console.log(this.data.uplist)
      this.setData({
        id:id,
        initdata: res.data,
        uplist:this.data.uplist,
        imgurl: http.baseURL + "/deliveryMan/getCode?token=" + "Bearer_eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3d3cuZ3l0eC5jb20iLCJleHAiOjE1NzM0NjE1MTMsInVzZXJOYW1lIjoibGVzc29u6Ieq5p2l5a6i5YiG5L2j5YiG5YWs5Y-4IiwidXNlcklkIjoiMiIsImNvbXBhbnlJZCI6IjIiLCJhdWQiOiJneXR4IGFwcCIsImlhdCI6MTU3MjU5NzUxM30.OhQhduf-HyyBNyQX8K-EEjfLts_-M7SHFBlRVl6CIkJ0Nny04hc4NKW0Qgl1pSd9fIiV51xbPcvFp_bM9Vp1oA"
      })
      console.log(this.data.imgurl)
    })

    // http.post('/deliveryMan/getCode', { token:"Bearer_eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3d3cuZ3l0eC5jb20iLCJleHAiOjE1NzM0NjE1MTMsInVzZXJOYW1lIjoibGVzc29u6Ieq5p2l5a6i5YiG5L2j5YiG5YWs5Y-4IiwidXNlcklkIjoiMiIsImNvbXBhbnlJZCI6IjIiLCJhdWQiOiJneXR4IGFwcCIsImlhdCI6MTU3MjU5NzUxM30.OhQhduf-HyyBNyQX8K-EEjfLts_-M7SHFBlRVl6CIkJ0Nny04hc4NKW0Qgl1pSd9fIiV51xbPcvFp_bM9Vp1oA"}).then(res=>{
    //   console.log(res)
    // })
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