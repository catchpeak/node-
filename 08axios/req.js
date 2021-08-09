//解决乱码可以用npm install iconv-lite 

const axios = require('axios');//const request = require('request')
const fs = require('fs')

let http  ='http://www.imomoe.ai/list/2.html'
//let http  ='http://js.xiaomingming.org/style.css'

//获取起始页面的所有分类
function getclassurl(){
	
}
//获取分类里的电影链接
//根据链接获取详细内容

axios.get(http).then(function(res){
	//console.log(res)
	let data = res.data
	let reg = /<a href="(\/view.*\.html)">/img;
	let result;
	let arrclass = []
	while(result = reg.exec(data)){
		arrclass.push(result[1])
	}
	
//	let obj = {
//		classname:
//		url:
//	}
	console.log(arrclass)
	
	fs.writeFile('text.html',data,{flag: 'w', encoding: 'utf-8'},function(err){
		if(err){
			console.log(err)
		}else{
			console.log('写入成功')
		}
		
	})
})

