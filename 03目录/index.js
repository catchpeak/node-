const fs = require('fs');
const {fsRead,fsWrite} = require('./lcfs.js');

const txtPath = 'all.txt'
fs.readdir('../02文件读写',function(err,files){
	if(err){
		console.log(err)
	}else{
		console.log(files)
		files.forEach(async function(item,index){
			let content = await fsRead('../02文件读写/' + item)
			await fsWrite(txtPath,content)
		})
	}
})
