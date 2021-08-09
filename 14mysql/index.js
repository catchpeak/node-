const mysql = require('mysql')
let options = {
	host: 'localhost',
	//port: "3306",默认，可选
	user:'root',
	password:'123456',
	database:'mall'
	//database:'laochen'
}
//创建与数据库的连接
let con = mysql.createConnection(options)
//建立连接
con.connect((err)=>{
	if(err){
		console.log(err)
	}else{
		console.log('数据库连接成功')
	}	
})

//执行数据库语句
//执行查询语句
//let strsql = 'select * from xueshengbiao'
//con.query(strsql,(err,result,fields)=>{
//	if(err){
//		console.log(err)
//	}else{
//		console.log(result,fields)
//	}
//})
//
////删除表
//let strsql2 =  'drop table xueshengbiao'
////删除库
////let strsql3 =  'drop database laochen'
//con.query(strsql2,(err,result)=>{
//	if(err){
//		console.log(err)
//	}else{
//		console.log(result)
//	}
//})

//创建库
//let strsql4 =  'create database mall'
//con.query(strsql4,(err,result)=>{
//	if(err){
//		console.log(err)
//	}else{
//		console.log(result)
//	}
//})

//创建表
//let str5 = 'CREATE TABLE `user` (`id`  int NOT NULL ,`username`  varchar(255) NULL ,`password`  varchar(255) NULL ,`email`  varchar(255) NULL ,PRIMARY KEY (`id`));'
//con.query(str5,(err,result)=>{
//	if(err){
//		console.log(err)
//	}else{
//		console.log(result)
//	}
//})

//插入数据
//let str6 = 'insert into user (id,username,password) values (1,"laochen","123456")'
//con.query(str6,(err,result)=>{
//	if(err){
//		console.log(err)
//	}else{
//		console.log(result)
//	}
//})

let str7 = 'insert into user (id,username,password,email) values (?,?,?,?)'
con.query(str7,['2','zwx','1234','120@.com'],(err,result)=>{
	if(err){
		console.log(err)
	}else{
		console.log(result)
	}
})