let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/server_admin',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }
)

const db = mongoose.connection

db.on('error',
    ()=>{console.log('数据库连接失败')}
)
db.on('open',
    () => { console.log('服务器启动成功, 请访问: http://localhost:4000') }
)