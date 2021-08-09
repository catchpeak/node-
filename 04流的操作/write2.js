const fs = require('fs');


//创建读取流
let rs = fs.createReadStream('hello.txt',{flag: 'r',encoding:'utf-8'})
let ws = fs.createWriteStream('hello2.txt',{flag: 'w',encoding: 'utf-8'})
rs.on('open',function(){
	console.log('读取的文件打开')
})
rs.on('close',function(){
	console.log('读取流结束')
})
//每一批数据流入完成
rs.pipe(ws)
