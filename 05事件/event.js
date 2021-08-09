const events = require('events');
const fs = require('fs');

let ee = new events.EventEmitter()
ee.on('hellosuccess',function(msg){
	console.log('1吃饭')
	console.log(msg)
})
ee.on('hellosuccess',function(){
	console.log('2烫头')
})
ee.on('hellosuccess',function(){
	console.log('3睡觉')
})

fs.readFile('hello.txt',{flag: 'r',encoding: 'utf-8'},function(err,data){
	if(err){
		console.log(err)
	}else{
		console.log(data)
		ee.emit('hellosuccess',data)
	}
})

//异步
function zwxReadFile(path){
	return new Promise(function(resolve,reject){
		fs.readFile(path,{flag: 'r',encoding: 'utf-8'},function(err,data){
			if(err){
				//console.log(err)
				reject(err)
			}else{
				//console.log(data)
				resolve(data)
				//ee.emit('hellosuccess',data)
			}
		})
	})
}
zwxReadFile('hello.txt').then((data)=>{
	ee.emit('hellosuccess',data)
	return
})
async function test(){
	let data = await zwxReadFile('hello.txt')
	ee.emit('hellosuccess',data)
}
test()
