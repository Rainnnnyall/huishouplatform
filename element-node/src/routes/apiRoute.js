'use strict'

const express = require('express')

let route = express.Router()

const apiCtrl = require('../controllers/animitation.js')

//0.0请求首页轮播图数据
route.get('/api/getAnimi', apiCtrl.getanimi)



route.post('/api/post',(req,res)=>{
	var obj = {message:'post 请求 ok'};
	res.end(JSON.stringify(obj));
});

route.all('/api/jsonp',(req,res)=>{

	var callbackFn =  req.query.callback;

	var obj = {message:'jsonp 请求 ok'};
	var jsonStr = JSON.stringify(obj);


	res.end(`${callbackFn}('${jsonStr}')`);

});

module.exports = route

