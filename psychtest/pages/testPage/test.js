const titleData = require('../../utils/jsdata.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerArray:[],
    previousMargin: '20',
    nextMargin: '20',
    current:0,   // 当前滑到的滑块
    checkNum:'', // 当前单选的值
    dataLen: 0,  // 请求数据的长度
    isDisabled: true, //标记提交按钮是否可点
    isLoading: false //提交按钮的加载动画
  },
  bindcChange : function(event){
    this.setData({
      current: event.detail.current
    });

  },
  // 单选选择
  handleCheckChange(e){
    var that = this;
    var currentNumber = that.data.current +1;
    var len = that.data.dataLen;
    if (currentNumber < len+1){
      this.setData({
        current: currentNumber
      });
    } else if (currentNumber = len +1) {
      this.setData({
        isDisabled: false
      })
    }
  },
  // 点击上一题
  handlePrevClick(){
    var that = this;
    var currentNumber = that.data.current -1;
    var len = that.data.dataLen;
    if (currentNumber >= 0) {
      this.setData({
        current: currentNumber
      })
    }
  },
  // 提交
  handleSubmitClick(){
    this.setData({
      isLoading: true
    })
  },
  // 禁止用户滑动
  stopSwiper(){
    return false;
  },
  onItemClick(e){
    // console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      answerArray: titleData.data,
      dataLen: titleData.data.length-1
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