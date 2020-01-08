//引入mongodb模块
var db = require("mongodb");
var Db = db.Db;
//var connect = require("mongodb").Connection;
var Server = db.Server;
//引入外部JavaScript文件
var set = require("./setting");

//暴露实例接口
var server = new Server(set.host,set.port,{ auto_reconnect: true });
module.exports = new Db(set.db,server,{safe: true});;