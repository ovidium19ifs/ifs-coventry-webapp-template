var path = require('path');
var fs = require('fs');
var debug = require('debug')('app:exists');
var rootPath = path.normalize(__dirname+"/../");
module.exports.get = function(req,res){
  var pathToFile = path.join(rootPath,"public",req.params.type,req.params.filename);
  debug(pathToFile);
  if (fs.existsSync(pathToFile)){
    debug("File found");
    res.status(200).send({response:true}).end();
  }
  else{
    debug("File not found");
    res.status(200).send({response:false}).end();
  }
};