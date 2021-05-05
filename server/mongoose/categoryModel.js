const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{ type: String, require:true },
    parentId: { type:String, require:true,default:'0' }
})

const CategoryModel = mongoose.model('categorys',categorySchema)

const categorys = [
    {
        "parentId": "0",
        "_id":"5f23dec449ba3a2af4bd24c4",
        "name": "电脑",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1ef",
        "parentId": "5f23dec449ba3a2af4bd24c4",
        "name": "惠普 暗影精灵6",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1f0",
        "parentId": "5f23dec449ba3a2af4bd24c4",
        "name": "ThinkPad X1 Fold",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1f1",
        "parentId": "5f23dec449ba3a2af4bd24c4",
        "name": "联想 拯救者 Y7000",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1f2",
        "parentId": "5f23dec449ba3a2af4bd24c4",
        "name": "华硕 飞行堡垒8 ",
    },


    {

        "parentId": "0",
        "_id":"5f23dec449ba3a2af4bd24c5",
        "name": "手机",
    },
    {
        "_id":"5f23dec449ba3a2af4bd24ff",
        "parentId": "5f23dec449ba3a2af4bd24c5",
        "name": "小米11",
    },
    {
        "parentId": "5f23dec449ba3a2af4bd24c5",
        "_id":"6083f792a1e6e62a7ceaf1f5",
        "name": "华为mate40",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1f6",
        "parentId": "5f23dec449ba3a2af4bd24c5",
        "name": "iphone 11",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1f7",
        "parentId": "5f23dec449ba3a2af4bd24c5",
        "name": "vivo X60",
    },


    {
        "parentId": "0",
        "_id":"5f23dec449ba3a2af4bd24c6",
        "name": "iPad",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1f9",
        "parentId": "5f23dec449ba3a2af4bd24c6",
        "name": "iPad Pro",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1fa",
        "parentId": "5f23dec449ba3a2af4bd24c6",
        "name": "iPad Air",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1fb",
        "parentId": "5f23dec449ba3a2af4bd24c6",
        "name": "iPad mini",
    },
    {
        "_id":"6083f792a1e6e62a7ceaf1fc",
        "parentId": "5f23dec449ba3a2af4bd24c6",
        "name": "Pad",
    },


    {

        "parentId": "0",
        "_id":"5f23dec449ba3a2af4bd24c7",
        "name": "电视",
    }
]

CategoryModel.find({ parentId: "0" }).then(
    data=>{
        if (!data[0]){
            categorys.forEach(item =>{
                new CategoryModel(item).save().then(
                    category =>console.log("初始化数据成功CategoryModel")
                )
            })
        }
    }
)


module.exports = CategoryModel
