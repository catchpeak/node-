const fs = require('fs');


//创建写入流
let ws = fs.createWriteStream('hello.txt',{flag: 'w',encoding: 'utf-8'})
//console.log(ws)

ws.on('open',function(){
	console.log('文件打开了')
})

ws.on('ready',function(){
	console.log('文件写入已准备状态')
})

ws.on('close',function(){
	console.log('文件写入完成，关闭')
})

ws.write('hello world!',(err)=>console.log('内容流入完成'))
ws.write('\nnihao',(err)=>console.log('内容流2入完成'))
ws.end(function(){
	console.log('文件写入关闭')
})
