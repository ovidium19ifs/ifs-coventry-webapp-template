var express= require('express');
var path = require('path');
var parts=require('./partsController');
var lessMiddleware = require('less-middleware');
var app = express();
var bodyParser = require('body-parser');
var rootPath = path.normalize(__dirname+"/../");


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(lessMiddleware(path.join(rootPath,"public"),{force:true}));
app.use(express.static(path.join(rootPath+"public")));
app.use("/pdf",express.static(path.join(rootPath,"public","pdfs")));
app.get("/data/:source",parts.get);
app.post("/data/:source",parts.put);
app.get("/assets/js/bundle.js",function(req,res){
    res.sendFile(rootPath+"dist/js/bundle.js");
});
app.get("*",function(req,res){
    res.sendFile(rootPath+"/index.html");
});
app.listen(process.env.PORT || 8000);
console.log("Listening on port " + process.env.PORT + "...");
