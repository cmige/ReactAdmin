const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: { type: String, required: true }, // 角色名称
    auth_name: String, // 授权人
    auth_time: Number, // 授权时间
    create_time: { type: Number, default: Date.now }, // 创建时间
    menus: Array // 所有有权限操作的菜单path的数组
})

const roleModel = mongoose.model('roles',roleSchema)

const roles = [
    {
        "menus": [
            "/role",
            "/charts/bar",
            "/home",
            "/category"
        ],
        "_id": "5ca9eaa1b49ef916541160d3",
        "name": "测试1",
        "create_time": 1554639521749,
        "__v": 0,
        "auth_time": 1558679920395,
        "auth_name": "admin"

    },
    {
        "menus": [
            "/role",
            "/charts/bar",
            "/home",
            "/charts/line",
            "/category",
            "/product",
            "/products"
        ],
        "_id": "5ca9eab0b49ef916541160d4",
        "name": "经理",
        "create_time": 1554639536419,
        "__v": 0,
        "auth_time": 1558506990798,
        "auth_name": "admin"
    },
    {
        "menus": [
            "/role",
            "/charts/bar",
            "/home",
            "/charts/line",
            "/charts/pie",
            "/user",
            "/category",
            "/product",
            "/products"

        ],
        "_id": "5ca9eab0b49ef916541160e8",
        "name": "管理员",
        "create_time": 1554639536419,
        "__v": 0,
        "auth_time": 1558506990798,
        "auth_name": "admin"
    },
]


roleModel.find({name:"管理员"}).then(
    role => {
        if (role && !role.length) {
            roles.forEach(item => {
                roleModel.create(item).then(()=>console.log("初始化用户数据成功"))
            })
        }
    }
)
module.exports =  roleModel