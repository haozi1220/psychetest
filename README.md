# psychetest
## 生成图片保存步骤
##### 1.在页面load时调用画布canvas渲染画布。代码如下：
```
    // 生成图片函数
  createImg(){
    let that = this;
    // 顶部图片资源
    let topImgSource = '../../images/1.jpg';
    let usrAvatarSource = '../../images/avatar.png';
    let text = '你还算是个充满活力的现代人，虽然偶尔会遗失点东西，夸夸海口，但都无伤大雅。你心智成熟，合情合理地处理矛盾、平和地看待美丑得失，对你来说都不算难事。'
    let textArr = text.split(''); //把字符串切割成数组
    let textTemp = '';
    let rowArr = [];
    const ctx = wx.createCanvasContext('shareImage', this);
    // 白色背景
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 295, 500);
    ctx.setFillStyle('white');
    ctx.fill();
    ctx.draw();
    // 绘制顶部图片
    ctx.drawImage(topImgSource, 0, 0, 295, 150);
    ctx.draw(true);
    // 描绘头像背景
    ctx.save();
    ctx.beginPath();
    ctx.arc(20, 175, 10, 0, 10);
    ctx.setFillStyle('gray');
    ctx.fill();
    ctx.draw(true);
    // 绘制姓名
    ctx.setFillStyle('#a09999');
    ctx.setTextAlign('center');
    ctx.setFontSize(20);
    ctx.fillText('梁', 45, 183);
    ctx.draw(true);
    // 绘制结果内容
    ctx.setFillStyle('#333');
    ctx.setTextAlign('left');
    ctx.font = 'normal bold 18px STKaiti';
    ctx.fillText('测试结果：C.30-39岁', 10, 215);
    ctx.draw(true);
    // 绘制大块内容
    ctx.setFillStyle('#cac8c8');
    ctx.setTextAlign('left');
    ctx.font = 'normal normal 14px STKaiti';
    for (let a = 0; a < textArr.length; a++) {
      if (ctx.measureText(textTemp).width < 266) {
        textTemp += textArr[a];
      } else {
        a--;
        rowArr.push(textTemp);
        textTemp = ''
      }
    }
    rowArr.push(textTemp);
    if (rowArr.length != 0) {
      for (let b = 0; b < rowArr.length; b++) {
        ctx.fillText(rowArr[b], 10, 245 + b * 20, 300)
      }
    }
    ctx.draw(true);
    // 绘制底部感谢
    ctx.beginPath();
    ctx.rect(0, 450, 295, 50);
    ctx.setFillStyle('#ff9900');
    ctx.fill();
    ctx.draw(true);

    ctx.setFillStyle('#333');
    ctx.setTextAlign('left');
    ctx.font = 'normal bold 16px STKaiti';
    ctx.fillText('感谢您的使用！', 91, 480);
    ctx.draw(true);
  }
  <!-- 生成图片 -->
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createImg();
  }
```
##### 2.点击结果页的“保存结果图按钮”显示生成的图片，调用wx.canvasToTempFilePath()生成图片地址
```
    <!-- wxml代码 -->
    <view class='shadowTast' hidden="{{isShadow}}"></view>
    <view class='saveImageWrap' hidden="{{isShadow}}">
        <view class='previewImg'>
          <image src='{{imgPath}}' mode='widthFix' style='width:100%;'></image>
        </view>
        <view class='saveImageBtn'>
          <button bindtap='saveImage'>点击保存结果图</button>
        </view>
        <view class='closeWrap' bindtap='closeShadow'><i-icon type="close" size='28' color='#fff'/></view>
    </view>
    <!-- js代码 -->
    // 保存结果图
      showResultImag(){
        let that = this;
        wx.canvasToTempFilePath({
          canvasId: 'shareImage',
          x: 0,
          y: 0,
          width: 295,
          height: 500,
          destWidth: 295,
          destHeight: 500,
          success: function (res) {
            that.setData({
              imgPath: res.tempFilePath,
              isShadow: false
            })
          }
        }, this)
      }
```
##### 3.点击保存按钮调用wx.saveImageToPhotosAlbum(OBJECT)方法，将生成的图片保存
```
    //  报存结果图
  saveImage(){
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imgPath,
      success(res) {
      }
    })
  }
```