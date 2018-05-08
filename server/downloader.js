var fs = require('fs');
var archiver = require('archiver');
var debug = require('debug')('app:downloader');
var path = require('path');
var rootPath = path.normalize(__dirname+"/../");
var dataPath = path.join(rootPath,'data.zip');

module.exports.get = function(req,res){
  debug(dataPath);
  let auth = req.query.auth;
  if (!auth){
    debug("Not authenticated");
    res.redirect("/");
    res.send("not authenticated").status(404).end();
  }
  if (fs.existsSync(path.join(rootPath,'data.zip'))){
    debug("deleting data.zip");
    fs.unlinkSync(dataPath);
  }
  
  let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  //let output = fs.createWriteStream(dataPath);
  res.attachment('data.zip');

  res.on('close', function() {
    debug(archive.pointer() + ' total bytes');
    debug('archiver has been finalized and the output file descriptor has closed.');
    return res.status(200).send('OK').end();
  });
 
  
  res.on('end',function() {
    debug("End event has been called");
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      debug(err);
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(res);

  // append files from a sub-directory and naming it `new-subdir` within the archive
  archive.directory(path.join(rootPath,'data/'), 'data');

  // finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();
  

};