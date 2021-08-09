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
		headless:false
	}
	let browser = await puppeteer.launch(options)
	
	//打开一个新页面
	let page = await browser.newPage()
	//访问页面
	await page.goto('http://www.dytt8.net/index.htm')
//	await page.screenshot({path:'screenshot.png'})
	
	//获取页面内容
	//$$eval使回调函数运行在浏览器中，控制台输出
	let elements = await page.$$eval('#menu li a',(ele)=>{
		//地址和内容
		let eles = []
		ele.forEach((item,index)=>{
			//console.log(item.innerText)
			if(item.getAttribute('href') !='#'){
					var eleobj = {
					href: item.getAttribute('href'),
					text: item.innerText
				}
				eles.push(eleobj)
			}
			
			console.log(eleobj)
		})
		return eles
	})
	
	//监听控制台输出
//	page.on('console',(eventmsg)=>{
//		console.log(eventmsg.text())
//	})
	//打开国内页面
	let gnpage = await await browser.newPage()
	await gnpage.goto(elements[2].href)
	//console.log(elements)
}

test()