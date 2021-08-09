const path = require('path')
const fs = require('fs')

//console.log(path)

let str = 'https://www.bilibili.com/video/BV1i7411G7kW?p=8'
//获取路径信息的扩展名
let info = path.extname(str)
console.log(info)

let arr=['/sxt','qianduan','zhongji']
let info1 = path.resolve(...arr)
console.log(info1)

//获取当前执行目录的完整路径
console.log(__dirname)
let info2 = path.join(__dirname,'qianduan','zhongji')
console.log(info2)

//
let newstr = 'https://www.sxt.com/xinwen/guonei.html'

let arr2 = newstr.split('/')
arr2 = arr2.slice(arr2.length-2)
console.log(arr2)

let filepath = path.join(__dirname,...arr2)
console.log(filepath)
fs.readFile(filepath,{encoding:'utf-8'},function(err,data){
	if(err){
		console.log(err)
	}else{
		console.log(data)
	}
})
