var fs = require('fs');
module.exports.get = function(req,res){
    "use strict";
    var path = req.params.source;
    var partialPath="resourcesfor"+path+"/";
    var fullPath = "data/"+partialPath;
    try{
        var files=fs.readdirSync(fullPath);
        files.sort();
    }
    catch(e){

        res.end();
    }
    var results="[";
    for (var i=0;i<files.length;i++){
        console.log(files[i]);
        if (files[i].indexOf(".json")===files[i].length-5){

            var fileContents = fs.readFileSync(fullPath+"/"+files[i]);
            results+=fileContents+",";
        }
    }
    results = results.substr(0,results.length-1);
    results+="]";

    res.setHeader("Content-Type","application/json");

    res.send(results);
    res.end();


};