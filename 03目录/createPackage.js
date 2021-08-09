const readline = require('readline');
const {fsRead,fsWrite} = require('./lcfs.js');
const fs = require('fs');

//创建接口
var r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})




function lcQuestion(title){
	return new Promise(function(resolve,reject){
		r1.question(title,function(answer){
			resolve(answer)
		})
	})
}

async function createPackage(){
	let name = await lcQuestion('您的包名叫什么？')
	let description = await lcQuestion('您的包名如何描述？')
	let main = await lcQuestion('您的包主程序入口文件时什么？')
	let author = await lcQuestion('您的包的作者是谁？')
	
		
	let content = `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "${description}",
  "main": "${main}",
  "scripts": {
    "test": "echo \'Error: no test specified\' && exit 1"
  },
  "author": "${author}",
  "license": "MIT"
}
`
await	fsWrite('package.json',content)
	r1.close()
}
createPackage()

r1.on('close',function(){
	process.exit(0)
})