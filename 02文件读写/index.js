const fs = require('fs');
//读写文件，同步和异步接口


//同步
//var fd = fs.openSync('hello.txt','r')
////var content = fs.readSync(fd,buf,0,20,0)
//var content = fs.readFileSync('hello.txt',{flag: 'r',encoding: 'utf-8'})
//console.log(content)


//异步
fs.readFile('hello.txt',{flag: 'r',encoding: 'utf-8'},function(err,data){
	if(err){
		console.log(err)
	}else{
		console.log(data)
	}
})

function fsRead(path){
	return new Promise(function(resolve,reject){
		fs.readFile(path,{flag: 'r',encoding: 'utf-8'},function(err,data){
			if(err){
				reject(err)
			}else{
				resolve(data)
			}
		})
	})
}
var w1 = fsRead('hei.txt')
w1.then((res)=>{
	console.log(res)
})
