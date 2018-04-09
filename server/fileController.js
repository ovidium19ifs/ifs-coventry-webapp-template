let fs = require('fs');
module.exports.files = {
    images:[],
    pdfs:[]
};
module.exports.update = function(){
    let path = 'public/';
    for (let folder of ['images','pdfs']){
        fs.readdir(path+folder,function(err,files){
           if (err){
               console.log(err);
               return;
           }
           module.exports.files[folder] = files;
        });
    }
};
module.exports.get = function(req,res){
    let folder = req.params.folder;
    if (module.exports.files.hasOwnProperty(folder)){
        res.send(module.exports.files[folder]);
    }
    else{
        console.log("Not the best parameter");
        res.send({'response':'500','error':'Not the best parameter','folder':folder});

    }
    res.end();
};
function writeFilesPromise(body){
    let total = Object.keys(body).length;
    let incr = 0;
    return new Promise(function(resolve,reject){
        for (let file of Object.keys(body)){
            let path;
            if (body[file].type.startsWith('image')) path = 'public/images/';
            else path = 'public/pdfs/';
            fs.writeFile(path+file,body[file].content,'binary',function(err){
                if (err) reject(err);
                incr++;
                if (incr == total){
                    console.log("wrote " + total + " files");
                    resolve(true);
                }
            });
        };
    });

}
module.exports.put = function(req,res){
    let body = req.body;
    writeFilesPromise(body).then(function(resp){
        module.exports.update();
        res.send({'response':'200'});
        res.end();
    },function(err){
        console.log(err);
    })
};