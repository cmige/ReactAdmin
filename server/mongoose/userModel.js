const mongoose = require('mongoose')
const Schema = mongoose.Schema
const md5 = require('blueimp-md5')

const userSchema = new Schema({
    username:{ type:String, required: true },
    password: {type: String, required: true}, 
    phone: String,
    email: String,
    create_time:{ type: Number, default: Date.now },
    role_id: String
})

const UserModel = mongoose.model('users',userSchema)

const userList = [
    {
        username:'test1',
        password:'123456',
        phone:12345678911,
        email:'test1@qq.com',
        role_id:'5ca9eab0b49ef916541160d4'
    },
    {
        username:'test2',
        password:'123456',
        phone:12345678900,
        email:'test2@qq.com',
        role_id:'5ca9eaa1b49ef916541160d3'
    },
]

UserModel.findOne( { username:'admin' } ).then(
    user =>{
        if (!user){
            UserModel.create({ username:'admin',password:md5('admin') })
                .then( user =>{
                    console.log('初始化用户: 用户名: admin 密码为: admin')
                } )
        } 
    }
)

UserModel.findOne( { username:'test1' } ).then(
    user =>{
        if (!user){
            userList.forEach(user => {
                user.password = md5(user.password)
                new UserModel(user).save().then(
                    user => console.log('初始化用户数据成功')

                )
            })
        }
    }
)

module.exports = UserModel