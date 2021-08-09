const puppeteer = require('puppeteer')
const axios = require('axios')
const url = require('url')
const fs = require('fs')
const {fsRead,fsWrite} = require('./lcfs.js')

function lcwait(milliseconds){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			resolve('成功执行延迟函数，延迟：'+ milliseconds)
		},milliseconds)
	})
}

async function test(){
	let debugoptions = {
		defaultViewport:{
				width: 1400,
				height: 800
		},
		headless:false
		//slowMo: 250,timeout:0
	}
	let options={headless:true}
	let browser = await puppeteer.launch(debugoptions)
	
	async function parsetxt(){
		//读取文本内容
		let textcontent = await fsRead('./book.txt')
		//正则匹配字符串对象
		let reg = /(\{.*?\})\n/igs;
		let tempres;
		let bookarr = []
		while(tempres = reg.exec(textcontent)){
			let jsonstr = tempres[1]
			let jsonobj = JSON.parse(jsonstr)
			//let bookhref = jsonobj.href;
			bookarr.push(jsonobj)
		}
		return bookarr
	}
	let bookarr = await parsetxt()
	let index = 0;
	
	
	async function downloadbook(){
		if(index == bookarr.length){
			return '完成'
		}
		let bookobj = bookarr[index];
		index++;
		//打开下载页面
		let page = await browser.newPage()
		await page.goto(bookobj.href)
		
		//获取a链接，页面为ajax前端渲染的需要等待
		await page.waitForSelector('#table_files tbody a',{visible:true})
		let eleAhref = await page.$eval('#table_files tbody a',(ele)=>{
			return ele.getAttribute('href')
		})
		booklinkpage(eleAhref,bookobj.title)
		//点击立即下载

	}
	async function booklinkpage(linkurl,title){
		let page = await browser.newPage()
		
		//截获地址
		await page.setRequestInterception(true);
		page.on('request', interceptedRequest => {
			let urlobj = url.parse(interceptedRequest.url())
			//ch1-ctc-aa.tv002.com
			//14804066.ch1.ctc.data.tv002.com
	    if (urlobj.hostname =='ch1-ctc-aa.tv002.com'){
	    	console.log('截获地址'+ urlobj.href)
	      interceptedRequest.abort();
	      let ws = fs.createWriteStream('./book/'+title+'.zip')
	      axios.get(urlobj.href,{responseType:'stream'})
	      	.then(function(res){
	      		res.data.pipe(ws)
	      		ws.on('close',()=>{
	      			console.log('下载已完成：'+title)
	      			//开始下载下一本书
	      			downloadbook()
	      			page.close()
	      		})
	      	})
	      
	    }else{
	    	interceptedRequest.continue();
	    }
	      
	  });
		
		await page.goto('https://306t.com'+ linkurl)
		
		await page.waitForSelector('.btn.btn-outline-secondary.fs--1')
		let btn = await page.$('.btn.btn-outline-secondary.fs--1')
		await btn.click()
		
		
		
		
//		page.on('requestfinished',(req)=>{
//			console.log('下载已完成：'+req.url())
//		})
	}
	
	downloadbook()
}

test()
