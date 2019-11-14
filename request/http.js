// const baseUrl = 'https://www.leesonwine.com/leeson'
// const http = (params) => {

//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: baseUrl + params.url,
//       data: params.data,
//       header: params.header,
//       method: params.method,
//       success(res) {
//           resolve(res.data.data);

//       },
//       fail(e) {
//         reject('网络出错')
//       }
//     })
//   })
// }
// module.exports = {
//   http
// }
// const http=(url, method, params)=> {
//   let token = 'token' // 获取token，自行获取token和签名，token和签名表示每个接口都要发送的数据
//   let sign = 'sign' // 获取签名
//   let data = {

//   }
//   // if (params.data) { // 在这里判断一下data是否存在，params表示前端需要传递的数据，params是一个对象，有三组键值对，data：表示请求要发送的数据，success：成功的回调，fail：失败的回调，这三个字段可缺可无，其余字段会忽略
//   //   for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
//   //     if (params.data[key] == null || params.data[key] == 'null') {
//   //       delete params.data[key]
//   //     }
//   //   }
//   //   data = { ...data, ...params.data }

//   // }

//   data ={...data, ...params}

//   let api = 'https://www.leesonwine.com/leeson'

//   let lianjie
//   if (url.includes('./images')) {
//     lianjie = url
//   } else if (!url.includes('http://') && !url.includes('https://')) {
//     lianjie = api + url
//   }
//   wx.request({
//     url: lianjie, // 就是拼接上前缀,此接口域名是开放接口，可访问
//     method: method == 'post' ? 'post' : 'get', // 判断请求类型，除了值等于'post'外，其余值均视作get
//     data,
//     header: {
//       'content-type': 'application/json',
//       'Authorization': ""
//     },
//     success(res) {
//       params.success && params.success(res.data)
//     },
//     fail(err) {
//       params.fail && params.fail(err)
//     }
//   })
// }
// var get=(url, params)=>{
//         { return   http(url, 'get',  params) }
// }

// var post=(url, params)=> {
//   return new Promise(res => { http(url, 'post', params) })
// }
// module.exports = {

//   get, post


// }
// const baseURL = 'https://www.leesonwine.com/leeson';
const baseURL = 'https://admin.leesonwine.com/leeson';
const http = ({ url = '', params = {}, ...other } = {}) => {
  wx.showLoading({
    title: '加载中...'
  })

  let time = Date.now()
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: params,
      header: getHeader(),
      ...other,
      complete: (res) => {
        wx.hideLoading()
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // 401 为鉴权失败 很大可能是token过期
          // 重新登录 并且重复请求
          login().then(res => {
            http({ url, params, ...other }).then(res => {
              resolve(res)
            })
          })
        } else {
          reject(res)
        }

      }
    })
  })
}

const getUserInfo = (res) => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success(res) {
        console.log(res)
        wx.login({
          success(value) {
            
            if (value.code) {
              http({
                url: '/WeChatLogin/getUserInfo',
                data: {
                  code: value.code,
                  appletType: 2,
                  gender: res.userInfo.gender,
                  nickname: res.userInfo.nickName,
                }
              }).then(res => {
                if (res.data) {
                  // 存入token
                  wx.setStorageSync("token", res.data)
                  // 判断用户是否已经用手机号注册
                  http({
                    url: '/activity/time/isMobile',
                    method: 'POST'
                  }).then(res => {
                    // 未注册过直接去自定义定登录页
                    if (data.code == '101005') {
                      wx.reLaunch({
                        url: "/pages/login/login"
                      })
                    }
                  })
                } else {
                  console.log('重新登录')
                }
              })
            }
          }
        })
      },
      fail(err) { // 未授权去授权页
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
    })
  })
}

const getUrl = url => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}
const getHeader = () => {
  try {
    var token = wx.getStorageSync('token')
    if (token) {
      return { 'x-access-token': token, 'x-data-token': token, "Content-Type": "application/x-www-form-urlencoded" }
    } else {
      wx.redirectTo({
        url: '/pages/index/index'
      })
      return {}
    }
    return {}
  } catch (e) {
    return {}
  }
}
module.exports = {
  baseURL,
  get(url, params = {}) {
    return http({
      url,
      params
    })
  },
  post(url, params = {}, header) { 
    if (!header) {
      return http({
        url,
        params,
        method: 'post'
      })
    } else {
      return http({
        url,
        params,
        method: 'post',
        header,
      })
    }

  },
  put(url, params = {}) {
    return http({
      url,
      params,
      method: 'put'
    })
  },

  // 这里不能使用 delete, delete为关键字段
  myDelete(url, params = {}) {
    return http({
      url,
      params,
      method: 'delete'
    })
  }
}