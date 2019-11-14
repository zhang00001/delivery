// components/details/details.js
const api=require("../../request/api.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
initdata:{}
  },

  /**
   * 组件的方法列表
   */
  methods: { 
    init(){
     
     
      
    }
  },

  ready  () {
   console.log(this.properties)
   
    
   
    this.setData({
      datas: this.properties.datas
    })
    console.log(this.data.initdata)
  },
})
