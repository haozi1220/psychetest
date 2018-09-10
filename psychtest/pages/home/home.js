//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 点击测试
  startTest(){
    wx.navigateTo({
      url: '../testPage/test'
    })
  }
})
