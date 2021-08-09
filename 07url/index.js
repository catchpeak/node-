const url = require('url')

console.log(url)
let http = 'https://www.bilibili.com/video/BV1i7411G7kW?p=9'
let obj = url.parse(http)
console.log(obj)

//合成
let targeturl = 'http://www.taobao.com/'
http = './zwx/qianduan/index.html'
let newurl = url.resolve(targeturl,http)
console.log(newurl)
