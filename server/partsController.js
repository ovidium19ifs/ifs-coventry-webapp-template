var fs = require('fs');
function toLowerCase(str){
    "use strict";
    return str[0].toLowerCase()+str.slice(1);
}
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
module.exports.put = function(req,res){
    "use strict";
    var path = "data/resourcesfor"+toLowerCase(req.params.source)+"/";
    var prefix;
    var fileName;
    for (var i=0;i<=req.body.length-1;i++){
        prefix = i<9 ? "0"+(i+1) : i+1;
        fileName = path+prefix+"_"+req.body[i].name.replace(/\s/g,"_")+".json";

        try{
            console.log("Writing to " + fileName);
            fs.writeFileSync(fileName,JSON.stringify(req.body[i],null,4));
        }
        catch(e){

            res.end();
        }
    }
    res.setHeader("Content-Type","application/json");
    res.send({'response':"200"});
    res.end();
};