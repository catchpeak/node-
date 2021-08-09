const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const http = 'https://www.doutula.com/article/list/?page=1'
//将延迟函数封装成promise对象
function lcwait(milliseconds){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			resolve('成功执行延迟函数，延迟：'+ milliseconds)
		},milliseconds)
	})
}


//获取页面总数
async function getNum(){
	let res = await axios.get(http)
	let $ = cheerio.load(res.data)
	let btnlength = $('.pagination li').length
	let allnum = $('.pagination li').eq(btnlength-2).find('a').text()
	console.log(allnum)
	return allnum
}

async function spider(){
	let allnum = await getNum()
	//let allnum = 2
	for(let i = 1; i <= allnum; i++){
		await lcwait(3000*i)
		getlistpage(i)
	}
}

async function getlistpage(pageNum){
	let httpurl = 'https://www.doutula.com/article/list/?page='+pageNum
	let res = await axios.get(httpurl)
	let data = res.data
	//console.log(data)
	let $ = cheerio.load(data)
	
	//获取当前页面的所有表情链接
	$('#home .col-sm-9>a').each(async (i,ele)=>{
		let pageurl = $(ele).attr('href')
		//console.log(pageurl)
		let title = $(ele).find('.random_title').text()
		let reg = /(.*?)\d/igs;
		title = reg.exec(title)[1];
		//截取4个字
		title = title.slice(0,4)
		//console.log(title)
		fs.mkdir('./img/'+title,(err)=>{
			if(err){
				console.log(err)
			}else{
				console.log('成功创建')
			}
		})
		await lcwait(50*i)
		parsepage(pageurl,title)
		
	})
}

//axios.get(http).then((res)=>{
//	let data = res.data
//	//console.log(data)
//	let $ = cheerio.load(data)
//	
//	//获取当前页面的所有表情链接
//	$('#home .col-sm-9>a').each((i,ele)=>{
//		let pageurl = $(ele).attr('href')
//		let title = $(ele).find('.random_title').text()
//		let reg = /(.*?)\d/igs;
//		title = reg.exec(title)[1];
//		fs.mkdir('./img/'+title,(err)=>{
//			if(err){
//				//console.log(err)
//			}else{
//				console.log('成功创建')
//			}
//		})
//		//onsole.log(pageurl)
//		//console.log(title)
//		parsepage(pageurl,title)
//		
//	})
//})

async function parsepage(url,title){
	let res = await axios.get(url)
	let $ = cheerio.load(res.data)
	$('.pic-content img').each((i,ele)=>{
		let imgurl = $(ele).attr('src')
		//console.log(imgurl)
		
		let extName = path.extname(imgurl)
		let imgpath = `./img/${title}/${title}-${i}${extName}`
		let ws = fs.createWriteStream(imgpath)
		axios.get(imgurl,{responseType: 'stream'}).then((res)=>{
			res.data.pipe(ws)
			console.log('图片加载完成：'+imgpath)
			
			//关闭写入
			res.data.on('close',()=>{
				ws.close()
			})
		})
	})
}

spider()