const http = require('http')
const path = require('path')
const url = require('url')

class LcApp{
	constructor(){
		this.server = http.createServer()
		this.reqEvent = {
//			'/':function(){},
//			'/static':function(){}
		}
		this.server.on('request',(req,res)=>{
			let pathobj = path.parse(req.url)
			//pathobj = path.parse(pathobj.pathname)
			//console.log(pathobj)
			
			if(pathobj.dir in this.reqEvent){
				req.pathobj = pathobj
				this.reqEvent[pathobj.dir](req,res)
			}else{
				res.setHeader('Content-Type','text/html; charset=UTF-8')
				res.end('<h1>404 页面找不到</h1>')
			}
		})
	}
	on(url,fn){
		this.reqEvent[url] = fn;
	}
	run(port,callback){
		this.server.listen(port,callback)
	}
}

module.exports = LcApp