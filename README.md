## 前言

临近毕业，秋招准备找工作，由于缺少项目经验，又去找一些Vue项目实战教程学习。于是根据coderwhy老师的项目，仿写了一个类似蘑菇街的商城项目。后端接口数据由老师提供，在此致谢！（原本想仿网易云音乐，奈何音乐版权问题直教人落泪。以后看情况吧，我个人还是很喜欢网易云的。）

## 项目简介

使用Vue全家桶开发的一个移动端商城项目demo，拥有首页，分类，商品详情，购物车，个人五个页面。后端接口数据来自coderwhy搭建的服务器。

## 技术栈

* vue2 用于构建用户界面的渐进式框架  
* vue-router Vue.js 官方的路由管理器  
* vuex 专为 Vue.js 应用程序开发的状态管理模式  
* webpack 静态模块打包工具  
* es6/eslint 采用es6语法，并使用eslint检测语法  
* axios 尤雨溪推荐使用axios来完成ajax请求  
* better-scroll 为移动端（已支持 PC）各种滚动场景提供丝滑的滚动效果  

## 项目构建运行  

```
// clone项目到本地  
git clone git@github.com:5-seasons/supermall.git

// 进入项目根路径
cd supermall

// 安装相关依赖  
npm install (或yarn)

// 修改`src/network/request.js` 文件中的数据接口baseURL  
const instance = axios.create({
  baseURL: "修改为你的数据接口",
  timeout: 5000
})

// 本地预览  
npm run serve

// 打包文件
npm run build

```

## 目标功能  

- [x] tabControl的吸顶效果
- [x] 高亮显示选中tabControl
- [x] 根据tabControl动态展示不同类型商品
- [x] 回顶部按钮
- [x] 路由懒加载
- [x] 下拉加载更多
- [ ] tabControl的左右滑动切换效果
- [ ] 添加商品到购物车
- [ ] 登录注册
- [ ] 支付
- [ ] 其他

## 致谢：  

>coderwhy提供项目。