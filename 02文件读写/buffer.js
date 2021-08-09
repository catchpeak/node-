//1.数组不能进行二进制数据操作
//2.数字不像java,python效率高
//3。buffer在内存空间开票出固定大小的内容

var str = 'helloworld'
let buf = Buffer.from(str)
console.log(buf)

//输出内容
console.log(buf.toString())

//开辟一个空的
let buf1 = Buffer.alloc(10)
buf1[0] = 10
console.log(buf1)

let buf2 = Buffer.allocUnsafe(10)
console.log(buf2)