// module.exports = {
//   userLogin:'',
//   getBanquetList:'/deliveryMan/getBanquetList',//订单公海列表
//   queryBanquetById:'/deliveryMan/queryBanquetById',//获取公海订单详情
//   grabSingle:'/deliveryMan/grabSingle',//确认抢单

//   getCompleteOrder:'/deliveryMan/getCompleteOrder',//完成订单列表
//   completeOrderDetail:'/deliveryMan/completeOrderDetail',//完成订单详情

//   distributionOrder:'/deliveryMan/distributionOrder',//分配订单列表
//   cancelOrder:'/deliveryMan/cancelOrder',//取消订单

//   getGrabSingleList:'/deliveryMan/getGrabSingleList',//抢单列表
//   orderInProgress:'/deliveryMan/OrderInProgress',//进行中订单填写
//   getOrderDetail:'/deliveryMan/getOrderDetail',//准备中订单详情
//   getDeliveryConfirmation:'/deliveryMan/getDeliveryConfirmation',//获取提货详情
//   confirmDelivery:'/deliveryMan/confirmDelivery',//确认 提货
//   confirmStatement:'/deliveryMan/confirmStatement',//确定结束订单

//   bindingMobile:'/activity/time/bindingMobile',//绑定手机号
//   isMobile:'/activity/time/isMobile',//是否绑定手机号
//   sendMobile:'/activity/time/sendMobile',//发送验证码
// }
import { http } from './../request/http'; // 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项

function getBanquetList(data) { // 请求随机古诗词接口
 return http('/deliveryMan/getBanquetList', 'get', {params:data})  // 接口请求的路由地址以及请求方法在此处传递
}

// 每一个接口定义一个函数，然后暴露出去，供逻辑代码调用

function getCompleteOrder(data) { // 小说推荐接口
  return http('/deliveryMan/getCompleteOrder', 'get', {params:data})
}



export default { // 暴露接口
  getBanquetList,
  getCompleteOrder
}

