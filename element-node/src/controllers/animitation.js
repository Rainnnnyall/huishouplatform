//control层用来处理逻辑

/*---------------------查询新闻列表--------------------------------*/ 
function getanimi(req,res){
    // 连接数据库，来获取数据
    var sql="select * from administration;"
    req.db.driver.execQuery(sql,(err,datas)=>{
        console.log(datas);
        res.send(datas);
    })
    
}
/*---------------------------------------------------------------*/


// 导出处理函数
exports.getanimi=getanimi;

