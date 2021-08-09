const request = require('request')
const iconv = require('iconv-lite')

let http  ='http://www.imomoe.ai/list/2.html'

//获取起始页面的所有分类
function getclassurl(){
	
}
//获取分类里的电影链接
//根据链接获取详细内容
request(http,function(error,res,body){
	if (!error && res.statusCode == 200) {
		let result = iconv.decode(body, 'gb2312').toString()
    console.log(result);
  }
})


//axios.get(http).then(function(res){
//	//console.log(res)
//	let str = iconv.decode(Buffer.from(res.data), 'gb2312');
//console.log(str)
//	let data = str.data
//	let reg = /<a href="(\/view.*\.html)">/img;
//	let result;
//	let arrclass = []
//	while(result = reg.exec(data)){
//		arrclass.push(result[1])
//	}
//	
////	let obj = {
////		classname:
////		url:
////	}
//	console.log(arrclass)
//	console.log(data)

//})

