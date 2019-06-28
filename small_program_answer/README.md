## 学习用的微信小程序，顺便试试做一个答题的微信小程序

### 总结

1. 通常使用 display:flex 弹性布局进行小程序的布局，flex-direction:row 是默认列排列。 2018/5/4
2. 针对弹性布局中，一行里面有多个元素，要使得几个元素靠左，几个元素靠右时，在父盒子中使用 display:flex ，~~在子元素中使用 margin-left:auto 来使得各个子元素自动分布，再针对每个元素设置不同的 margin-left 值，实现效果；~~ 在子元素中，为要靠右显示的元素设置 margin-left:auto 值，再设置一个 margin-right 的值，就可以实现，例如 *我的-我的积分* 页
3. 弹性布局使用的时候，在父元素中使用了 display:flex 后，有时也需要在子元素中设置 display:flex 属性。
4. 需要子元素在父元素中 *垂直居中对齐* 时，在子元素中使用 align-items:center 。而需要 *水平居中对齐* 时，在子元素中使用 justify-content:center 。

#### 文件夹名字说明
1. index 首页
2. mine  我的
3. mine-answer 答题记录
4. mine-signin 签到记录
5. mine-integeral 当前积分


## *bug*
1. 由于微信更新了新的开发工具，现在存在使用web-view插件打开跳转网页，打不开的情况
2. 微信小程序发布了新的版本，wx.getUserInfo 接口在未来会不可使用，需要使用新的替代方式