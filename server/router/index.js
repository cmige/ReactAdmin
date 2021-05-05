const express = require('express')
const md5 = require('blueimp-md5')

const UserModel = require('../mongoose/userModel')
const CategoryModel = require('../mongoose/categoryModel')
const ProductModel = require('../mongoose/productModel')
const RoleModel = require('../mongoose/roleModel')

const router = express.Router()
const filter = { password:0, __v:0 }

router.post('/login',(req, res)=>{
    const { username, password } = req.body
    UserModel.findOne({username, password: md5(password)},filter)
        .then(user => {
            if (user) {

                res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
                if (username === 'admin') {
                    user._doc.menus = ['all']
                    console.log(user)
                    res.send({ status: 0, data: user })
                }
                if (user.role_id) {
                    RoleModel.findOne({_id:user.role_id})
                        .then(role => {
                            user._doc.menus = role.menus
                            user._doc.role = role.role_id
                            res.send({ status: 0, data: user })
                        })
                }else {
                    user._doc.menus = []
                    res.send({ status: 0, data: user })
                }
            } else {// 登陆失败
                res.send({ status: 1, msg: '用户名或密码不正确!' })
            }
        })
        .catch(error => {
            res.send({status: 1, msg: '登陆异常, 请重新尝试'})
        })
})

router.get('/user',(req, res)=>{
    const userId = req.cookies.userid
    if (!userId) return res.send({ status: 1, msg: '请先登陆' })
    UserModel.findOne({ _id:userId },filter)
        .then(user =>{
            if (!user){
                return res.send({ status: 1, msg: '请先登陆' })
            }
            return res.send({ status: 1, data: user })
        }).catch(e=>{
            res.send({ status: 1, msg: '服务器异常, 请重新尝试' })
        })
})

router.get('/category/list',(req, res)=>{
    const parentId = req.query
    CategoryModel.find(parentId,filter)
        .then(categorys => {
            res.send({ status: 0, data: categorys })
        })
        .catch(error => {
            console.error('获取分类列表异常', error)
            res.send({ status: 1, msg: '获取分类列表异常, 请重新尝试' })
        })
})

router.post('/category/add',(req, res)=>{
    const { parentId,name } = req.body
    CategoryModel.create({ parentId:parentId, name:name })
        .then(categorys => {
            res.send({ status: 0, data: categorys })
        })
        .catch(error => {
            res.send({ status: 1, msg: '添加分类异常, 请重新尝试' })
        })
})

router.post('/category/update',(req, res)=>{
    const { categoryId, name } = req.body
    CategoryModel.findOneAndUpdate({ _id:categoryId },{ name },{ new:true }
    ).then(
        category=> res.send({ status: 0, data: category })
    ).catch(error =>{
        res.send({ status: 1, msg: '更新分类名称异常, 请重新尝试' })
    })
})

// 获取指定分页的产品列表
router.get('/product/list',(req, res)=>{
    const { pageNum,pageSize } = req.query
    ProductModel.find({})
        .then(products=>{
            res.send({status: 0, data: pageFilter(products,pageNum,pageSize) })
        })
        .catch(e=>{
            res.send({status: 1, msg: '获取商品分页列表异常, 请重新尝试'})
        })
})
// 获取指定搜索词的产品列表
router.get('/product/search',(req, res)=>{
    const { pageNum, pageSize, searchName, searchType } = req.query

    let content = { [searchType]: new RegExp(`^.*${searchName}.*$`) }
    ProductModel.find(content).then(
        products =>  res.send({ status:0, data:pageFilter(products,pageNum,pageSize) })
    ).catch(error => {
        res.send({ status: 1, msg: '搜索商品列表异常, 请重新尝试' })
    })
})

router.get('/category/info',async (req, res)=>{
    const categoryId = req.query.categoryId
    const pCategoryId = req.query.pCategoryId
    if (pCategoryId !== '0') {
        try {
            const result =await Promise.all([
                CategoryModel.findOne({ _id:pCategoryId }),
                CategoryModel.findOne({ _id:categoryId })
            ])
            res.send({ status:0, data:{ pCategory: result[0], category: result[1] } })
        }catch (e) {
            res.send({status: 1, msg: '获取分类信息异常, 请重新尝试'})
        }
    }else {
        CategoryModel.findOne({ _id:categoryId })
            .then( category => {
                res.send({ status:0, data:{category:category} })
            })
            .catch(error => {
                res.send({status: 1, msg: '获取分类信息异常, 请重新尝试'})
            })
    }
})

router.post('/product/updateStatus',(req, res)=>{
    let { status, productId } = req.body
    if (typeof status === 'string')
        status = status * 1
    status = status === 0? 1: 0
    ProductModel.findOneAndUpdate({ _id: productId },{ status },{ new:true })
        .then( product => {
            res.send({ status: 0, data: product })
        })
        .catch(e => {
            res.send({ status: 1, msg: '更新商品状态异常, 请重新尝试' })
        })

})

router.post('/product/add',(req,res)=>{
    const product= req.body
    console.log(product)
    ProductModel.create(product)
        .then(
            product=> res.send({status: 0, data: product})
        )
        .catch(error => {
            console.error('添加产品异常', error)
            res.send({ status: 1, msg: '添加产品异常, 请重新尝试' })
        })
})

router.post('/product/update', (req, res) => {
    const product = req.body
    ProductModel.findOneAndUpdate({_id: product._id}, product,{new:true})
        .then(product => {
            res.send({status: 0, data: product })
        })
        .catch(error => {
            console.error('更新商品异常', error)
            res.send({ status: 1, msg: '更新商品名称异常, 请重新尝试' })
        })
})

router.get('/role/list',(req,res)=>{
    RoleModel.find()
        .then(roles => {
            res.send({ status: 0, data: roles })
        })
        .catch(error => {
            console.error('获取角色列表异常', error)
            res.send({ status: 1, msg: '获取角色列表异常, 请重新尝试' })
        })
})

router.post('/role/add',(req,res)=>{
    const { roleName } = req.body
    RoleModel.find({name:roleName},filter,(role)=>{
        if (role) {
            res.send({ status:1, msg:'角色名称已存在' })
        }
        RoleModel.create({ name:roleName })
            .then(
                doc => res.send({ status:0, data:doc })
            )
            .catch(e=>res.send({ status:1, msg:'添加角色异常, 请重新尝试' }))
    })
        
})

router.post('/role/update',(req,res)=>{
    
    const role = req.body
    role.auth_time = Date.now()
    RoleModel.findOneAndUpdate({ _id:role._id },role,{new:true})
        .then(newRole=>{
            res.send({ status: 0, data: newRole })
        })
        .catch(error => {
            console.error('更新角色异常', error)
            res.send({ status: 1, msg: '更新角色异常, 请重新尝试' })
        })
})

router.get('/user/list',(req,res)=>{
    UserModel.find({username: {'$ne': 'admin'}})
        .then(users => {
            RoleModel.find().then(roles => {
                res.send({status: 0, data: {users, roles}})
            })
        })
        .catch(error => {
            console.error('获取用户列表异常', error)
            res.send({ status: 1, msg: '获取用户列表异常, 请重新尝试' })
        })
})

router.post('/user/delete',(req,res)=>{
    const { userId } = req.body
    UserModel.findByIdAndDelete({_id:userId})
        .then((doc) => {
            res.send({ status: 0,data:doc })
        })

})
router.post('/user/add',(req,res)=>{
    const user = req.body
    const { username,password } = user
    UserModel.find({username})
        .then(user=>{
            if (user.length) return res.send({ status: 1, msg: '此用户已存在' })
            UserModel.create({ ...req.body, password:md5(password || 123456) })
                .then(doc =>  res.send({ status:0, data:doc }))
        })
        .catch(e=>{
            res.send({ status: 1, msg: '添加用户异常, 请重新尝试' })
        })
})

router.post('/user/update',(req,res)=>{
    const user = req.body
    UserModel.findOneAndUpdate({_id:user._id},user,{new:true})
        .then(user=>res.send({ status:0, data: user }))
        .catch(e=>{
            res.send({ status: 1, msg: '更新用户异常, 请重新尝试' })
        })
})


require('./file-upload')(router)

pageFilter = (productArr,pageNum,pageSize)=> {
    pageNum = pageNum * 1
    pageSize = pageSize * 1
    const total = productArr.length
    const list = []
    const pages = Math.floor((total + pageSize - 1 )/ pageSize)
    const start = pageSize * (pageNum - 1)
    const end = (start + pageSize) >= total? total : (start + pageSize)
    for (i = start; i < end; i++) {
        list.push(productArr[i])
    }
    return {
        pageNum,
        pageSize,
        total,
        list,
        pages
    }
}

module.exports =  router