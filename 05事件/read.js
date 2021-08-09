const fs = require('fs');

fs.readFile('hello.txt',{flag: 'r',encoding: 'utf-8'},function(err,data){
	if(err){
		console.log(err)
	}else{
		console.log(data)
		lcEvent.emit('filesuccess',data)
	}
})
//发布订阅
let lcEvent = {
	event:{
		//filesuccess:[fn,fn,fn]
	},
	on:function(eventName,eventfn){
		if(this.event[eventName]){
			this.event[eventName].push(eventfn)
		}else{
			this.event[eventName] = []
			this.event[eventName].push(eventfn)
		}
	},
	
	emit:function(eventName,msg){
		if(this.event[eventName]){
			this.event[eventName].forEach(itemfn =>{
				itemfn(msg)
			})
		}
	}
}

lcEvent.on('filesuccess',function(msg){
	console.log('1.数据库查看所有的详细信息')
})
lcEvent.on('filesuccess',function(msg){
	console.log('2.统计年龄比例')
})
lcEvent.on('filesuccess',function(msg){
	console.log('3.查看用户学习信息')
})