const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    categoryId: { type: String, required: true },
    pCategoryId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String },
    status: { type: Number, default: 1 },
    imgs: { type: Array, default: [] },
    detail: { type: String }
})

const ProductModel = mongoose.model('products',productSchema)

const data = [
    {
        _id:"6083f792a1e6e62a7ceaf1ef",
        categoryId:'6083f792a1e6e62a7ceaf1ef',
        pCategoryId:"5f23dec449ba3a2af4bd24c4",
        name: '惠普',
        price: 32,
        desc: '暗影精灵6暗影精灵6暗影精灵6暗影精灵6暗影精灵6暗影精灵6',
        status:1,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1f0",
        categoryId:"6083f792a1e6e62a7ceaf1f0",
        pCategoryId:"5f23dec449ba3a2af4bd24c4",
        name: 'ThinkPad',
        price: 42,
        desc: 'ThinkPad X1 Fold ThinkPad X1 Fold ThinkPad X1 Fold ThinkPad X1 Fold ThinkPad X1 Fold ',
        status:1,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1f1",
        categoryId:"6083f792a1e6e62a7ceaf1f1",
        pCategoryId:"5f23dec449ba3a2af4bd24c4",
        name: '联想',
        price: 52,
        desc: ' 拯救者 Y7000 拯救者 Y7000 拯救者 Y7000 拯救者 Y7000 拯救者 Y7000',
        status:1,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1f2",
        categoryId:"6083f792a1e6e62a7ceaf1f2",
        pCategoryId:"5f23dec449ba3a2af4bd24c4",
        name: '华硕',
        price: 72,
        desc: '飞行堡垒8 Y飞行堡垒8 Y飞行堡垒8 Y飞行堡垒8 Y',
        status:1,
    },
    {
        _id:"5f23dec449ba3a2af4bd24c5",
        categoryId:"5f23dec449ba3a2af4bd24c5",
        pCategoryId:"0",
        name: '手机',
        price: 82,
        desc: '手机',
        status:0,
    },
    {
        _id:"5f23dec449ba3a2af4bd24ff",
        categoryId:"5f23dec449ba3a2af4bd24ff",
        pCategoryId:"5f23dec449ba3a2af4bd24c5",
        name: '小米',
        price: 92,
        desc: '小米11小米11小米11小米11小米11',
        status:0,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1f5",
        categoryId:"6083f792a1e6e62a7ceaf1f5",
        pCategoryId:"5f23dec449ba3a2af4bd24c5",
        name: '华为',
        price: 102,
        desc: 'mate40 mate40 mate40 mate40 mate40 ',
        status:0,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1f6",
        categoryId:"6083f792a1e6e62a7ceaf1f6",
        pCategoryId:"5f23dec449ba3a2af4bd24c5",
        name: 'iphone 11',
        price: 112,
        desc: 'iphone 11 iphone 11 iphone 11 iphone 11 iphone 11 ',
        status:0,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1f7",
        categoryId:"6083f792a1e6e62a7ceaf1f7",
        pCategoryId:"5f23dec449ba3a2af4bd24c5",
        name: 'vivo X60 ',
        price: 112,
        desc: 'vivo X60 vivo X60 vivo X60 vivo X60 vivo X60 vivo X60  ',
        status:0,
    },


    {
        _id:"6083f792a1e6e62a7ceaf1f9",
        categoryId:"6083f792a1e6e62a7ceaf1f9",
        pCategoryId:"5f23dec449ba3a2af4bd24c6",
        name: 'iPad Pro',
        price: 122,
        desc: 'iPad ProiPad ProiPad ProiPad ProiPad ProiPad Pro',
        status:0,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1fa",
        categoryId:"6083f792a1e6e62a7ceaf1fa",
        pCategoryId:"5f23dec449ba3a2af4bd24c6",
        name: 'iPad Air',
        price: 132,
        desc: 'iPad AiriPad AiriPad AiriPad AiriPad AiriPad Air',
        status:0,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1fb",
        categoryId:"6083f792a1e6e62a7ceaf1fb",
        pCategoryId:"5f23dec449ba3a2af4bd24c6",
        name: 'iPad mini',
        price: 142,
        desc: 'iPad miniiPad miniiPad miniiPad miniiPad miniiPad mini',
        status:0,
    },
    {
        _id:"6083f792a1e6e62a7ceaf1fc",
        categoryId:"6083f792a1e6e62a7ceaf1fc",
        pCategoryId:"5f23dec449ba3a2af4bd24c6",
        name: 'Pad',
        price: 152,
        desc: 'PadPadPadPadPadPadPad',
        status:0,
    },
]
ProductModel.find({name:'惠普'}).then(
    docdata => {
       if (!docdata[0]) {
           data.forEach(
               item => {
                   new ProductModel(item).save().then(
                       ()=>console.log('初始化产品数据成功')
                   )
               }

           )
       }
    }
)


module.exports = ProductModel