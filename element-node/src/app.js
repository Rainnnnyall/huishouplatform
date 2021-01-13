'use strict'
const express = require('express');

let app = express();

//app.use(express.static('public'));

//1.0 初始化orm
const orm=require("orm")
app.use(orm.express('mysql://root:@127.0.0.1:3306/element',{
	define:function(db,models,next){
		next();
	}
}));

//2.0 将所有api的请求响应content-type设置为application/json

app.all('/api/*',(req,res,next)=>{
	//设置允许跨域响应报文头
		//设置跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","*");
	res.setHeader('Content-Type','application/json;charset=utf-8');
	next();
});



//2.0 设置路由规则
const apiRoute = require('./routes/apiRoute.js');
app.use('/',apiRoute);

//可以通过localhost和ip地址来访问
app.listen(8000,'0.0.0.0',()=>{
	console.log(`api服务已启动,8000`);
});