// pages/orderUnderway/orderUnderway.js

const http = require("../../request/http.js")
const api=require("../../request/api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tab栏切换变量
    tabBl: false,
    // 订单详情显示隐藏变量
    detailsBl: true,
    // 资料填写详情显示隐藏变量
    dataBl: true,
    // 订单详情数据
    obj: {},
    id:"",
    code:"",
    imgurl:'',
    peopleNum:'',
    tableNum:"",
    imglist: [],
    remark:"",
    initdata:{},
    wineSkuList:[],
 imgids:[],
    // 弹框变量
    showModalBl: false,
  },



  // tab栏切换函数
  switcherFn(e) {
    let {
      index
    } = e.currentTarget.dataset
    console.log(index)
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
  // 下拉显示函数 订单
  pullDownShowDetails() {
    this.setData({
      detailsBl: !this.data.detailsBl
    })
  },
  // 下拉显示函数 资料
  pullDownShowFeast() {
    this.setData({
      dataBl: !this.data.dataBl
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
        url: http.baseURL+'/productPhotos/fileUpload',//
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
 


  remimg(e){ 
    let i = e.target.dataset.index
    this.data.imglist.splice(i,1)
    this.data.imgids.splice(i, 1)
    this.setData({
      imglist:this.data.imglist,
      imgids: this.data.imgids
    })
  },

  // 信息填写完成 显示弹框
  alertShow() {
    console.log(this.data.peopleNum)
    this.setData({
      showModalBl: true
    })

  },

  setpeopleNum(e){
    console.log(e)
this.setData({
  peopleNum: e.detail.value
})
  },
  settableNum(e){
    this.setData({
      tableNum: e.detail.value
    })
  },
  setremark(e){
    this.setData({
      remark: e.detail.value
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
      activityId: this.data.id,
      peopleNum: this.data.peopleNum,
      photoList: this.data.imgids,
      remark: this.data.remark,
      tableNum: this.data.tableNum,
    }
    http.post("/deliveryMan/OrderInProgress",data).then(res=>{
      console.log(res)
      if (res.success) {
        this.setData({
          showModalBl: false
        })
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
   

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initdata(options.id)

  },
  /**
   * 初始化信息获取
   */
  initdata(id) {
    http.get('/deliveryMan/getDeliveryConfirmation', { id: id }).then(res => {
      console.log(res)
      res.data.wineSkuList = res.data.wineSkuList.split(",")

      res.data.hostingTime = api.formatDate(res.data.hostingTime - 0)
      this.setData({
        initdata: res.data,
        id:id,
        wineSkuList: res.data.wineSkuList,
        imgurl: http.baseURL + "/deliveryMan/getCode?token=" + "Bearer_eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3d3cuZ3l0eC5jb20iLCJleHAiOjE1NzM0NjE1MTMsInVzZXJOYW1lIjoibGVzc29u6Ieq5p2l5a6i5YiG5L2j5YiG5YWs5Y-4IiwidXNlcklkIjoiMiIsImNvbXBhbnlJZCI6IjIiLCJhdWQiOiJneXR4IGFwcCIsImlhdCI6MTU3MjU5NzUxM30.OhQhduf-HyyBNyQX8K-EEjfLts_-M7SHFBlRVl6CIkJ0Nny04hc4NKW0Qgl1pSd9fIiV51xbPcvFp_bM9Vp1oA"
      })
      console.log(this.data.initdata)
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