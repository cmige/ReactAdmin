import ajax from './ajax'

const BASE_URL = '/api'

//登录
export const reqLogin = (username,password) => ajax(BASE_URL + '/login',{ username, password },'POST')
// 获取用户信息 -> 自动登录
export const reqGetUser = () => ajax(BASE_URL+'/user')
// 获取天气
export const reqWeather = (cityCode) => ajax(`https://restapi.amap.com/v3/weather/weatherInfo?key=1f75fdfa7e63f915b3513059921e7170&city=${ cityCode }`)
// 获取商品分类列表
export const reqGetCategoryList = (parentId) => ajax(BASE_URL+'/category/list',{ parentId })
//添加商品分类
export const reqCategoryAdd = (parentId,name) => ajax(BASE_URL+'/category/add',{ parentId, name },'POST' )
//修改分类
export const reqCategoryUpdate = (categoryId,name) => ajax(BASE_URL+'/category/update',{ categoryId, name },'POST' )
//获取商品分页列表
export const reqProductList = ( pageNum,pageSize ) => ajax(BASE_URL+ '/product/list',{ pageNum, pageSize })
//获取指定搜索词的商品列表
export const reqProductSearch = ( { pageNum, pageSize, searchName, searchType } ) => ajax(BASE_URL+'/product/search',
    { pageNum, pageSize, searchName, searchType })
// 获取商品的分类名称
export const reqGetCategoryName = (categoryId,pCategoryId) => ajax(BASE_URL+'/category/info',{ categoryId, pCategoryId })
// 更新商品状态
export const reqUpdateStatus = (status, productId) => ajax(BASE_URL+ '/product/updateStatus',{ status, productId }, 'POST' )
//上传图片
export const reqUploadPicture = (pictureFile,config) => ajax(BASE_URL+'/manage/img/upload',pictureFile ,"PST", config)
//删除图片
export const reqDeletePicture = (name) => ajax(BASE_URL+'/manage/img/delete',{ name },'POST')
//添加/更新产品
export const reqaddOrUpdate = (product) => ajax(BASE_URL+'/product'+ (product._id?'/update':'/add'),product,'POST' )
//获取权限管理列表
export const reqGetRoleList = () => ajax(BASE_URL + '/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax(BASE_URL+'/role/add',{roleName},"POST")
// 更新角色权限
export const reqUpdateRole = (role) => ajax(BASE_URL+'/role/update',role,'POST')
//获取用户列表
export const reqGetUserList = () => ajax(BASE_URL + '/user/list')
//添加用户
export const reqAddUser = (user) => ajax(BASE_URL+'/user/add',user,"POST")
//删除用户
export const reqDeleteUser = (userId) => ajax(BASE_URL+'/user/delete',{userId},"POST")
//更新用户
export const reqUpdateUser = (user) => ajax(BASE_URL+'/user/update',user,"POST")
