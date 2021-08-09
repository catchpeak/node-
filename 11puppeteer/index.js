const puppeteer = require('puppeteer')


async function test(){
	//puppeteer.launch实例开启浏览器，传入个对象，配置为有无浏览器
	//无界面性能高，有界面一般用于调试
	//{headless:false}
	let options = {
		//视窗宽高
		defaultViewport:{
			width: 1400,
			height: 800
		},
		headless:false,
		//放慢步骤
		slowMo: 250
	}
	let browser = await puppeteer.launch(options)
	
	//打开一个新页面
	let page = await browser.newPage()
	//访问页面
	await page.goto('http://www.dytt8.net/index.htm')
//	await page.screenshot({path:'screenshot.png'})
		
		
		//点击页面跳转
	let elementhandle = await page.$$('#menu li a')
	elementhandle[2].click()
	
	//找到输入框
	inputele = await page.$('.searchl .formhue')
	//聚焦
	await inputele.focus()
	//输入内容
	await page.keyboard.type('蝙蝠侠')
	await page.$eval('.bd3rl>.search',(ele)=>{
		ele.addEventListener('click',function(event){
			event.cancelable = true
		})
	})
	//点击按钮
	let btnele = await page.$('.searchr input[name="Submit"]')
	await btnele.click()
}

test()