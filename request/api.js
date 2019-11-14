// const baseUrl = 'https://test.leesonwine.com/leeson'
//test.leesonwine.com
// https://www.leesonwine.com/leeson/WeChatLogin/getUserInfo
const baseUrl = 'http://22b5778l37.51mypc.cn'
// const baseUrl = 'http://120.79.38.107:8088/leeson'
var exceptionAddrArr = [

]
const http = (params) => {

  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'token',
      success: function (res) {
        params.header ? params.header : {}
        console.log(params.header)
        var obj = {
          'x-access-token': res.data
        }
        if (params.header) {
          obj = {
            'x-access-token': res.data,
            'content-type': params.header,
          }
        }
        wx.request({
          url: baseUrl + params.url,
          data: params.data,
          header: obj,
          method: params.method,
          success(res) {
            resolve(res.data.data);

          },
          fail(e) {
            reject('网络出错')
          }
        })
      },
      fail: res => {
        wx.request({
          url: baseUrl + params.url,
          data: params.data,
          header: params.header,
          method: params.method,
          success(res) {
            resolve(res.data.data);

          },
          fail(e) {
            reject('网络出错')
          }
        })
      }
    })


  })
}

// function CreateHeader(url, complete) {
//   var header = {}
//   if (exceptionAddrArr.indexOf(url) == -1) { //排除请求的地址不需要token的地址

//     wx.getStorage({
//       key: 'token',
//       success: function(res) {
//         header.Authorization = res.data;
//       },
//       fail: function(error) {
//         console.log(error);
//       },
//       complete: function() {
//         complete && typeof complete === 'Function' ? complete(header) : null;
//       }
//     });
//   } else {
//     complete && typeof complete === 'Function' ? complete(header) : null;
//   }
// }
const imgup = (params) => {

  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.uploadFile({
          url: baseUrl + params.url, //调用后台接口的路径
          method: 'POST',
          filePath: params.showImage_url,
          name: 'file', //此处注意要与后台保持一致
          header: {
            'content-type': "multipart/form-data",
            'x-access-token': res.data
          },
          formData: null,
          success: function (res) {
            resolve(res);
          },
          fail(e) {
            reject('网络出错')
          }
        })
      },
    })

  })
}

function formatDate(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}


module.exports = {
  formatDate,
  http,
  imgup
}