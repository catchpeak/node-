const LcApp = require('./server.js');

let app = new LcApp()
app.on('/',(req,res)=>{
	res.setHeader('Content-Type','text/html; charset=UTF-8')
	res.end('这是首页')
})

app.on('/gnxw',(req,res)=>{
	res.setHeader('Content-Type','text/html; charset=UTF-8')
	if(req.pathobj.base == 'index'){
		res.end('这是国内新闻shouye')
	}else{
		res.end('国内新闻')
	}
	
})

app.run(80,()=>{
	console.log('服务启动http://10.5.154.55:80')
})
