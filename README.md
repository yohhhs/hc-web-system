# 宥马运动APP所需h5页面
***
## 页面类型
*分享页面、内嵌页面、活动页面、其他h5页面*
***
## 项目布局
```
.
├── build                                       // gulp配置文件
├── src                                         // 源码目录
│   ├── sass                              		// sass存放目录
│   │   ├── base                              	// 基础sass
│   │   │   ├── px2rem.scss                    	// px转换rem
│   │   │   └── reset.scss                      // css reset
│   ├── js                                  	// js存放目录
│   │   └── hotcss.js                           // hotcss.js
│   ├── assets                                  // 静态资源目录
│   ├── img										// 图片目录
│   └── css                       	
├── build                                       // 项目打包后的存放目录
.
 
```
## 技术栈
> gulp + sass + jquery + hotcss
***
## 操作步骤
> 拉取代码到本地
```
git clone [仓库地址]
```
> 安装依赖
```
npm install
```
> 运行开发环境
```
npm run dev
```
> 打包生产代码
```
npm run build
```