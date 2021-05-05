# 项目启动

## 在 react-admin 目录下
### `npm install`
### `npm start`
## 启动本地 mongod，在 server 目录下
### `npm install`
### `npm start`

----------

## 以下是整个项目做完后记录的笔记
 ## React 后台管理项目
 
 ## 1、项目描述
 
 * 这是一个基于 react 的，依赖 `redux` 进行数据状态管理的 后台管理项目；
 * 主要运用的技术有：
   * `react`、`react-router-dom`、`redux`、`antd` 、`axios` 、`es6` 、`wrbpack` ；
   * `node`、`express`、`mongodb` ；
   * 运用`redux-persist` 对 `redux` 进行数据的持久化保存、运用 `react-draft-wysiwyg` 、 `bizcharts` 和 `echarts` 进行富文本编辑和图形图表的展示；
 * 项目主要实现的功能：
   * 用户的登录退出功能；
   * 分类模块的 **添加分类、修改分类** 的功能；
   * 产品模块的 **添加产品、修改产品信息 和 产品数据展示** 的功能；
   * 用户模块的 **添加、删除 和 修改用户** 的功能；
   * 权限模块的 权限角色的创建 和 权限的 **添加、修改** 功能；
   * 图表模块的 **图表展现** 功能；
 * 项目有待改进之处：
   * 整个项目运用 `redux` 进行数据状态的管理，导致项目初始完成时会产生很多不必要的渲染；
   * 项目使用 `lazy` 和 `Suspense` 进行路由懒加载，但并没有编写好一个好的 `loading` 界面；
   * 项目的鉴权功能依赖于 `redux-persist` 对 `redux` 的数据化持久保存，并没有实现具体的路由守卫，可能会产生意外的副作用；
   * 后台对应用数据的关联性并没有处理的特别好；
   * 没有接触 `redux-saga`, 用了 `react-redux` ，定义了太多的 `action-type` ,代码显得臃肿;
 
 ## 2、环境准备
 
 ```javascript
 // 创建项目
 npm i -g create-react-app
 npx create-react-app react-damin
 // antd 的按需加载
 // 路由，redux，redux 开发者工具，类型检查，axios
 npm i react-router-dom --save
 npm i react-redux redux redux-thunk redux-persist --save
 npm i redux-devtools-extension --save-dev
 npm i prop-types --save
 npm i axios --save
 // 图形图表
 npm i echarts echarts-for-react --save
 npm i bizcharts --save
 // 富文本编辑
 npm i react-draft-wysiwyg draft-js draftjs-to-html --save
 npm i  html-to-draftjs --save
 // 解决跨域
 npm i  http-proxy-middleware --save
 // 时间显示
 npm i  moment --save
 ```
 
 ## 3、路由分析
 
 * **`Login.jsx`**
 * **`Admin.jsx`**
   * **`home.jsx`**
   * **` product.jsx`** 
     * **`category.jsx`**
     * **`product.jsx`**
   * **`user.jsx`**
   * **`role.jsx`**
   * **`charts.jsx`**
     * **`line.jsx`**
     * **`bar.jsx`**
     * **`pie.jsx`**
 
 
 
 ## 4、各组件的  State  和  Prop  以及功能分析
 
 ``` javascript
 //	login.jsx  -->  1、登录功能  2、在用户登录后能够跳转到主页；
 //	admin.jsx  -->  1、实现鉴权功能 2、实现路由懒加载 ；
 //  category.jsx:
 //		state: category对象, 包含 分类信息的数组 -- categoryList；
 //		1、组件加载请求获取分类列表；(使用前台分页功能，categoryList中有所有的分类信息)；
 //		2、添加分类功能(add-form)；props --> category{}(Select)、addFn；
 //		3、修改分类功能(update-form)：props --> 选中的 categoryItem、updateFn；
 //  product-home.jsx：
 //		state: product对象，包含 所有产品信息的 对象；
 //		1、组件加载请求获取分页产品列表；(使用后台分页功能，productList中只有分页产品信息和产品总数)；
 //		2、产品搜索功能(product-title.jsx)； 能根据 商品名称 和 商品描述进行搜索； props --> searchFn；
 //		3、商品详情展示功能(product-detail); state --> 指定的 productItem{} --> 保存到 redunx 中的 child{}；
 //			1）、可以通过使用 history.push()方法将 productItem{} 传到 detail 组件，但是当页面刷新会丢失产品数据；
 //			2）、将 productItem{} 使用 redux 进行状态管理，并且使用 redux-persist 进行数据持久化保存；
 //		4、产品 添加 和 更新功能(add-update.jsx):
 //			产品分类显示功能：
 //				产品添加：使用 Cascader组件 的动态加载功能，组件加载时只需获取一级分类信息； 
 //					state --> cascaderOptions[]; props --> getCascaderNameFn;
 //				更新功能：根据 state 中的 child{} 的 categoryId 和 pCategoryId, 判断是否需要请求二级分类列表; 
 //					state --> cascaderOptions[]; props --> getCascaderNameFn;
 //			添加功能：props --> addOrUpdareFn；
 //			更新功能：state --> 指定的 productItem{} --> 保存到 redunx 中的 child{}；props --> addOrUpdareFn；
 //			注：upload 组件 和 rich-editor 组件 都是通过 ref 的方式获取数据进行保存的，由于 upload 使用了高阶组件，
 //				在使用ref的时候会报 关于forwardRef 的错误，取了个折中的方法，把 upload 组件的 this 传到父组件中保存；
 //	role.jsx：
 //		state： role{}
 //		1、组件加载请求获取角色列表；(前台分页)
 //		2、添加角色(add-role.jsx): props --> addRoleFn
 //		3、更新角色权限(update-role.jsx): props --> updateRoleFn、updateItem
 //	user.jsx:
 //		state: user{} --> 所有的用户信息
 //		1、组件加载请求获取用户列表；(前台分页)
 //		2、添加和更新用户(userForm)：
 //			更新用户： props --> userItem(选中的用户信息)、role(用于Select组件)、authName(当前登录的用户)、updateUserFn
 //			添加用户： props --> addUserFn
 ```
 
 
 
 
 ## 5、自定义 Ajax 函数
 
 ```javascript
 axios.get('/user?ID=123'})
 axios.get('/user',{	
     params:{
         ID:123
     }
 })
 
 function ajax(url, data={}, type='GET') {
     return new Promise((resolve, reject) => {
         let promise
         if(type === 'GET'){
             promise = axios.get(url,{params:data})
         }else {
             promise = axios.post(url,data)
         }
 
         promise.then(
 			response =>{
                 resolve(response.data)
         	}).catch(error => {
                 message.error('请求出错了:'+ error.toJSON)
         	})
     	})
 }
 ```
 
 
 
 ## 6、解决跨域问题
 
 ```javascript
 // npm i http-proxy-middleware -S
 // src 目录下创建文件 setupProxy.js
 
 const { createProxyMiddleware } = require("http-proxy-middleware");
 module.exports = function (app) {
   app.use(
     createProxyMiddleware("/api", {
       target: "http://localhost:5000",
       changeOrigin: true,
       // pathRewrite: {
       //   "^/api": ""
       // }
     })
   )
 ｝
 ```
 
 
 
 ## 笔记
 
 ### git 版本控制
 
 * ![image-20210325133934294](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210325133934294.png)
 
 ```
 git init
 git add .
 git commit -m "init app"
 git remote add origin git@github.com:cmige/reactAdmin.git
 git push origin master
 
 git checkout -b dev
 git push origin dev
 ```
 
 
 
 ### antd
 
 ```javascript
 npm i antd --save
 npm i react-app-rewired@2.0.2-next.0 
 babel-plugin-import 
 customize-cra
 --save
 
 需要指定less的版本号
 在 package.json 中
 "scripts": {
     "start": "react-app-rewired start",
     "build": "react-app-rewired build",
     "test": "react-app-rewired test",
     "eject": "react-app-rewired eject"
 }
 
 在根目录创建 config-overrides.js
 const {
 		override,
 		fixBabelImports,
 		addLessLoader
 } = require('customize-cra');
 
 module.exports = override(
 		// 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
 		fixBabelImports('import',{
 				libraryName:'antd',
 				libraryDirectory:'es',
 				style:true,//自动打包相关的样式 默认为 style:'css'
 		}),
 		// 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
 		addLessLoader({
 				javascriptEnabled: true,
 				// 将默认的主题色修改为绿色，其余的颜色变量可前往antd官网查询
 				modifyVars:{'@primary-color':'#1DA57A'},
 		}),
 )
 
 ```
 
 
 
 ### 节流和防抖
 
 * **防抖函数** :  事件响应函数在一定时间内才执行，如果在这段时间内再次调用，则重新计算
 
 ```javascript
 function debounce(func, wait, immediate) {
     var timeout;
     var context = this
     return function(...args) {
         var later = function() {
             timeout = null;
             if (!immediate) func.apply(context, args);
         };
         var callNow = immediate && !timeout;
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
         if (callNow) func.apply(this, ...args);
     };
 };
 //完整版
 function debounce(fn,wait=1000,immediate) {
     let timeout,result
     let debounced = (...args)=>{
         if (timeout) clearTimeout(timeout)
         if (immediate) {
             var callNow = !timeout
             timeout = setTimeout(()=>{
                 timeout = null
             },wait)
             if (callNow) result = fn.apply(this,...args)
         }else {
             timeout = setTimeout(()=>{
                 result = fn.apply(this,...args)
             },wait)
         }
         return result
     }
     debounced.cancel = function () {
         clearTimeout(timeout)
         timeout = null
     }
     return debounced
 }
 ```
 
 * **节流函数** : 如果持续触发时间，每隔一段时间，只会触发一次时间
 
   * 有头无尾
 
   ```javascript
   function throttle(fn,delay=1000,option) {
       let oldTime = 0
       return function (...args) {
           let currentTime = Date.now()
           if (currentTime - oldTime > delay) {
               fn.apply(this,...args)
               oldTime = currentTime
           }
       }
   }
   ```
 
   * 无头有尾
 
   ```javascript
   throttle = (func,delay=1000) => {
       var timer ;
       return function(...args){
           if (!timer) {
               timer = setTimeout(function () {
                   func.apply(this, ...args);
                   timer = null;
               }, delay);
           }
       }
    }
   ```
 
   * 自定义	throttle
   
   ```javascript
   throttle = (func, delay=1000, options = {
       leading:true,
       tailing:true
   }) => {
       let timer  ;
       let startTime = 0
       return function(...args){
           let currentTime = Date.now()
   
           if (options.leading === false && !timer) {
               startTime = currentTime
           }
           if (currentTime - startTime >= delay) {
               if (timer){
                   clearTimeout(timer)
                   timer = null
               }
               func.apply(this,args);
               startTime = currentTime
           } else if (!timer && options.tailing === true ) {
               timer = setTimeout(function () {
                   startTime = Date.now()
                   func.apply(this, args);
               }, delay);
           }
       }
   }
   ```
 
 ```javascript
 节流函数：
 	1、当触发时间大于延时时间时，或者首次调用，利用时间戳实现立即调用函数 startTime=0 / currentTime = Date.now()
 	timer 用来保存定时器，初始值为 0 ，
 	
 	if (currentTime - startTime >= delay) {
         if (timer){
             clearTimeout(timer)
             timer = null
         }
         //立即调用函数
         func.apply(this,args);
         startTime = currentTime
 	｝
 	2、当触发时间小于延时时间时候，利用定时器实现延时调用函数
     
     else if (!timer) {
         timer = setTimeout(function () {
             startTime = Date.now()
             func.apply(this, args);
         }, delay);
 	｝
 ```
 
 
 
 ### LeftNav
 
 ```javascript
 props: user --> {username,role_id,menus} //user.menus['/user']
 menuList: ---> [
     { path:'/home',isPublic:true },
     { path:'/products',children:[{ path:'/category'},{ path:'/product'}] },
     { path:'/user' },
     { path:'/role' },
     { path:'/charts',children:[{ path:'//charts/bar'},{ path:'/charts/line'},{ path:'/charts/pie'}] }
 ]
 渲染 menu菜单：
 constructor(props){
     super(props)
     this.state = {
         menuList: this.getMenuList(menuList,props.user)
     }
 }
  // 一级菜单
 <Menu.Item key={ item.path } icon={ item.icon }>
     <Link to={ item.path }/>
         { item.title }
 </Menu.Item>
 //二级菜单
 <SubMenu key={ item.path } icon={ item.icon } title={ item.title }>
     {
     	this.getMenuNode(item.children)
 	}
 </SubMenu>
 getMenuList = (menuList,user) => {
    //user.menus=['/user']
    // 遍历 menuList
 	menuList.map(item=>{
         if(this.auth(item)){
             
         }
     })
 }
 
 auth = (item,user) => {
     // user.username = 'admin' --> 菜单的所有权限
     // 如果没有任何权限 --> 显示公开菜单
     // user.menus 只有一级菜单 --> 显示 公开菜单 + menus 中的菜单
     // user.menus 有二级菜单 --> 找到对应的菜单 --> 显示
     if(user.username === 'admin') return true
     if(item.isPubluc) return true
     if(user.menus.find(menu => menu === item.path)) return true
     if(item.children){
         if(item.children.find(child => user.menus.indexOf(child.path) !== -1)) return true                         
     }
     return false
 }
 ```
 
