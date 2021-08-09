const http = require('http')

//创建server对象
let server = http.createServer()
//监听请求
server.on('request',function(req,res){
	console.log(req)
	res.setHeader('Content-Type','text/html; charset=UTF-8')
	//根据路径信息，显示不同页面内容
	if(req.url == '/'){
		res.end('首页')
	}else if(req.url == '/gnxw'){
		res.end('国内新闻')
	}else if(req.url == '/hello'){
		res.end('helloworld')
	}else{
		res.end('404找不到')
	}
	
	
})

server.listen(3000,function(){
	console.log('服务器启动成功！')
})
