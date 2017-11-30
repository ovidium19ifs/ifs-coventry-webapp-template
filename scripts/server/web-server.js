var express= require('express');
var path = require('path');
var parts=require('./partsController');
var app = express();
var bodyParser = require('body-parser');
var rootPath = path.normalize(__dirname+"/../../");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(rootPath));
app.get("/data/:source",parts.get);
app.get("*",function(req,res){
    console.log("Requested index");
    res.sendFile(rootPath+"/index.html");
});
app.listen(process.env.PORT || 8080);
console.log("Listening on port 8080....lsitening");
