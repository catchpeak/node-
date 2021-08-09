const puppeteer = require('puppeteer')
const axios = require('axios')
const url = require('url')
const fs = require('fs')


function lcwait(milliseconds){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			resolve('成功执行延迟函数，延迟：'+ milliseconds)
		},milliseconds)
	})
}
//目标：获取网站所有电子书链接和书名
async function test(){
	let debugoptions = {
		defaultViewport:{
				width: 1400,
				height: 800
		},
		headless:false
		//slowMo: 250,timeout:0
	}
	let options={headless:false}
	let httpurl = 'https://sobooks.cc/'
	let browser = await puppeteer.launch(options)
	
	//获取总页数
	async function getallnum(){
		let page = await browser.newPage()
		
		//截取谷歌请求
		await page.setRequestInterception(true);
		page.on('request', interceptedRequest => {
			let urlobj = url.parse(interceptedRequest.url())
	    if (urlobj.hostname =='gogleads.g.dobleclick.net')
	      interceptedRequest.abort();
	    else
	      interceptedRequest.continue();
	  });
		
		await page.goto(httpurl)
		
		let pagenum = await page.$eval('.content .pagination li:last-child span',(ele)=>{
			let text = ele.innerHTML
			let num = text.substr(1,text.length-2).trim()
			return num
		})
		page.close()
		return pagenum
	}
	let pagenum = await getallnum()
	console.log(pagenum)
	
	//获取列表页的所有链接
	async function pagelist(num){
		let pagelistulr = 'https://sobooks.cc/page/'+ num;
		let page = await browser.newPage();
		
		//截取谷歌请求
		await page.setRequestInterception(true);
		page.on('request', interceptedRequest => {
			let urlobj = url.parse(interceptedRequest.url())
	    if (urlobj.hostname =='gogleads.g.dobleclick.net')
	      interceptedRequest.abort();
	    else
	      interceptedRequest.continue();
	  });
	  
		await page.goto(pagelistulr)
		let arrpage = await page.$$eval('.card-item .thumb-img>a',(ele)=>{
			let arr = []
			ele.forEach((item,index)=>{
				let obj = {
					href: item.getAttribute('href'),
					title: item.getAttribute('title')
				}
				arr.push(obj)
			})
			return arr
		})
		page.close()
		//console.log(arrpage)
		//这里可以改为用await吧
		arrpage.forEach(async (pageobj,i)=>{
			await lcwait(5000*i)
			getpageinfo(pageobj)
		})
		//getpageinfo(arrpage[1])
	}
	
	pagelist(1)
	
	//获取网盘信息
	async function getpageinfo(pageobj){
		let page = await browser.newPage();
		
		//截取谷歌请求
		await page.setRequestInterception(true);
		page.on('request', interceptedRequest => {
			let urlobj = url.parse(interceptedRequest.url())
	    if (urlobj.hostname =='gogleads.g.dobleclick.net')
	      interceptedRequest.abort();
	    else
	      interceptedRequest.continue();
	  });
		
		await page.goto(pageobj.href)
		//填写验证码881122
		let inputele = await page.$('.euc-y-i')
		await inputele.focus()
		await page.keyboard.type('881122')
		let btnele = await page.$('.euc-y-s')
		await btnele.click()	
		await page.waitForNavigation();//等待跳转
		
		
		//获取真正的url
//		let eleA = await page.$('.e-secret b a:last-child')
//		//console.log(eleA)
//		let ahref = await eleA.getProperty('href')
//		console.log(ahref)

				//这里爬的是第一个链接
		let ahref = await page.$eval('.e-secret b a:first-child',(ele)=>{
			return ele.getAttribute('href')
		})
		//console.log(ahref)
		ahref = ahref.split('?url=')[1]
		
		//数据存到book.txt文档
		let content = `{"title":"${pageobj.title}","href":"${ahref}"}\n`
		fs.writeFile('book.txt',content,{flag:'a'},function(){
			console.log('书籍下载路径写入：'+ pageobj.title)
			page.close()
		})
		
	}
}

test()







