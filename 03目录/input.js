const readline = require('readline');

//创建接口
var r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
//console.log(readline.createInterface)
//设置r1.question提问事件
r1.question('今晚吃什么？',function(answer){
	console.log('答复：',answer);
	r1.close()
})
r1.on('close',function(){
	process.exit(0)
})





