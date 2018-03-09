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
    //only 1 file -- data.json
    try{
        var results = fs.readFileSync(fullPath+"/data.json");
    }
    catch (e){
        res.end();
        throw e;
    }
    res.setHeader("Content-Type","application/json");
    res.send(results);
    res.end();
};
module.exports.put = function(req,res){
    "use strict";
    var path = "data/resourcesfor"+toLowerCase(req.params.source)+"/data.json";
    try{
        fs.writeFileSync(path,JSON.stringify(req.body,null,4));
    }
    catch (e){
        throw e;
    }
    res.setHeader("Content-Type","application/json");
    res.send({'response':"200"});
    res.end();
};