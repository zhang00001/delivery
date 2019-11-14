//index.js
//获取应用实例
const app=getApp()
const http = require("../../request/http.js") 
Page({
    data: {

        showModalBl: false,
    },
    onLoad: function() {

    },


    
  onGotUserInfo(res) {
    if (res.detail.userInfo) {

      //用户按了允许授权按钮

      var that = this;

      // 获取到用户的信息了，打印到控制台上看下

      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo
      })
      console.log(app)
      let e = res
      that.setData({
        show: false
      });
      wx.login({
        success: function (res) {
          if (res.code) {  
            http.get('/WeChatLogin/getUserInfo', {
              "code": res.code,
              'appletType': 2,
              "gender": e.detail.userInfo.gender,
              "nickname": e.detail.userInfo.nickName,

            }).then(res => { 
            console.log(res)
              if (res) {
                wx.setStorage({
                  key: "token",
                  data: res.data,
                })

                wx.navigateTo({
                  url: "/pages/orderIndex/orderIndex",
                })
              }
            })
            // http.http({
            //   url: api.getUserInfo,
            //   data: {
            //     appletType: 1,
            //     code: res.code + '',
            //     gender: 1,
            //     nickname: e.detail.userInfo.nickName + ""
            //   },
            //   method: "GET"
            // }).then(res => {
            //   console.log(res)
            //   if (res) {
            //     wx.setStorage({
            //       key: 'token',
            //       data: res,
            //     })
            //   }
            // })
          }
        }
      })
 
    } else {
      //用户按了拒绝按钮

      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }

  },

    //授权登录临时code返回openID拿到
    bindGetUserInfo() {
        let that = this;
        wx.login({
            success(res) {
                console.log(res.code)
                if (res.code) {
                    wx.getUserInfo({
                        success: function(result) {
                            let data = result

                            console.log(result.userInfo)
                            wx.setStorageSync('userInfo', data)

                            http.get('/WeChatLogin/getUserInfo', {
                                    "code": res.code,
                                    'appletType': 2,
                                    "gender": result.userInfo.gender,
                                    "nickname": result.userInfo.nickName,

                                }).then(res => {

                                    if (res) {
                                        wx.setStorage({
                                            key: "token",
                                            data: res.data,

                                        })


                                    }
                                })
                            //     wx.request({
                            //       url: 'https://www.leesonwine.com/leeson/WeChatLogin/getUserInfo',
                            //       data: {
                            //         "code": res.code,
                            //         'appletType':2,
                            //         "gender": result.userInfo.gender,
                            //         "nickname": result.userInfo.nickName,

                            //   },
                            //   header: {
                            //     'content-type': 'application/json'
                            //   },
                            //   success(ress) {
                            //     console.log(ress)

                            //   },
                            // })

                            // wx.navigateBack(-1)

                        }
                    })



                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })


    },

})