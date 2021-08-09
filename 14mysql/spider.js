const mysql = require('mysql')
const axios = require('axios')
const cheerio = require('cheerio')


let page = 1;
let count = 1;
let options = {
	host: 'localhost',
	user:'root',
	password:'123456',
	database:'book'
}
let con = mysql.createConnection(options)
con.connect((err)=>{
	if(err){
		console.log(err)
	}else{
		console.log('数据库连接成功')
	}	
})


//获取第一个页面所有书籍的连接
async function getpageurl(num){
	let httpurl = 'https://sobooks.cc/xiaoshuowenxue/page/'+num;
	let res = await axios.get(httpurl)
	//console.log(res.data)
	
	let $ = cheerio.load(res.data);
	$('.card-item .thumb-img>a').each((index,ele)=>{
		let href = $(ele).attr('href')
		console.log(href)
	})
}
//getpageurl(page)


async function getbookinfo(href){
	let res = await axios.get(href)
	let $ = cheerio.load(res.data);
	//书籍图片
	let bookimg = $('.article-content .bookpic img').attr('src')
	//书籍名称
	let bookname = $('.article-content .bookinfo li:nth-child(1)').text().substr(3)
	//书籍作者
	let author = $('.article-content .bookinfo li:nth-child(2)').text().substr(3)
	
	let type =  $('.article-content .bookinfo li:nth-child(3)').text().substr(3)
	
	let tag =  $('.article-content .bookinfo li:nth-child(4)').text().substr(3)
	
	let pubtime =  $('.article-content .bookinfo li:nth-child(5)').text().substr(3)
	
	let score =  $('.article-content .bookinfo li:nth-child(6) b').attr('class')
	score = score[score.length-1]
	
	let isbn = $('.article-content .bookinfo li:nth-child(7)').text().substr(5)
	
	let category = $('.meta #mute-category a').text().trim()
	
	let abrief = $('body > section > div.content-wrap > div > article > p:nth-child(5)').text()
	let bbrief = $('body > section > div.content-wrap > div > article > p:nth-child(3)').text()
	let bookurl = href
	let download = ''
	let arr = [bookname,author,type,tag,pubtime,score,isbn,bookimg,category,abrief,bbrief,bookurl,download]
	console.log(arr,arr.length)
	//插入数据库
	let str = 'insert into book (bookname,author,type,tag,pubtime,score,isbn,bookimg,category,abrief,bbrief,bookurl,download) values (?,?,?,?,?,?,?,?,?,?,?,?,?)'
	con.query(str,arr,(err,result)=>{
		console.log(result)
	})
}
getbookinfo('https://sobooks.cc/books/17205.html')
