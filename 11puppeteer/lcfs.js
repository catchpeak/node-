const fs = require('fs');


function fsRead(path){
	return new Promise(function(resolve,reject){
		fs.readFile(path,{flag: 'r',encoding: 'utf-8'},function(err,data){
			if(err){
				reject(err)
			}else{
				resolve(data)
			}
		})
	})
}

function fsWrite(path,content){
	return new Promise(function(resolve,reject){
		fs.writeFile(path,content,{flag: 'a', encoding: 'utf-8'},function(err){
			if(err){
				reject(err)
			}else{
				resolve(err)
			}
		})
	})
}

function fsDir(path){
  return new Promise(function(resolve,reject){
      fs.mkdir(path,(err)=>{
          if(err){
              reject(err)
          }else{
              resolve('创建目录成功')
          }
      })
  })
}

function fsRename(oldpath,newpath){
	return new Promise(function(resolve,reject){
		fs.rename(oldpath,newpath,(err)=>{
			if(err){
        reject(err)
      }else{
        resolve('rename success')
      }
		})
	})
}

function fsReadDir(path,options){
	return new Promise(function(resolve,reject){
		fs.readdir(path,options,(err,files)=>{
			if(err){
        reject(err)
      }else{
        resolve(files)
      }
		})
	})
}

module.exports = {fsRead,fsWrite,fsDir,fsRename,fsReadDir}
