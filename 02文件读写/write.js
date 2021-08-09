const fs = require("fs");
//fs.writeFile('test.txt','晚饭吃什么',{flag: 'a', encoding: 'utf-8'},function(err){
//	if(err){
//		console.log(err)
//	}else{
//		console.log('写入成功')
//	}
//})

function writefs(path,content){
	return new Promise(function(resolve,reject){
		fs.writeFile(path,content,{flag: 'a', encoding: 'utf-8'},function(err){
			if(err){
				reject(err)
			}else{
				resolve(err)
			}
		})
	})
}
async function writelist(){
	await writefs('test.txt','吃吧\n')
	await writefs('test.txt','吃什么\n')
	await writefs('test.txt','吃肉\n')
}
writelist()
