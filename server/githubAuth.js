const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:githubAuth');
const axios = require('axios');
const btoa =require('base64url');

const rootPath = path.normalize(__dirname+"/../");
function readUser(){
    let userPath = path.join(rootPath,'user.json');
    if (!fs.existsSync(userPath)){
        userPath = path.join(rootPath,'user.txt');
        if (!fs.existsSync(userPath)){
            res.status(400).send("user.json or user.txt doesn't exist. Create the file first");
            res.end();
            return;
        }
    }
  return JSON.parse(fs.readFileSync(userPath, 'utf8'));
}

function exchangeCode(req,res){
  //this function creates on OAuth authorization link and sends it back to the controller
  //to redirect to it via $location
  if (req.query.connection){
    let url = '';
    let client_id = process.env.GITHUB_CLIENT_ID.trim();
    let scope = "repo";
    let redirect_uri = "http://localhost:8000/github/auth/";
    let base = "https://github.com/login/oauth/authorize";
    url = `${base}?scope=${scope}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    res.send({
      url,
      redirect:true
    });
    res.end();
    return;
  }
}
function revokeToken(token){
  //this function takes a token and creates a Github API url to revoke the token
  //this happens every time you successfully enter the correct username and password
  //to enforce proper github authentication as well
  const url = `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID.trim()}/tokens/${token}`;
  const username = process.env.GITHUB_CLIENT_ID.trim();
  const password = process.env.GITHUB_CLIENT_SECRET.trim();
  const params = `${username}:${password}`;
  return axios({
    method: 'DELETE',
    url,
    headers:{
      "Authorization": "Basic " +  btoa.encode(params)
    },
    params: {
      username,
      password
    },
    withCredentials: true
  });
}

module.exports.get = function(req,res){
  //this happens after local authentication has succeded
  //it revokes the current token and then requests another one
  //by calling exchangeCode
  const user = readUser(req,res);
  
  if (user.token){
    revokeToken(user.token)
      .then(response => {
        exchangeCode(req,res);
      })
      .catch(err => {
        debug(err);
        exchangeCode(req,res);
      })
  }
  else{
      exchangeCode(req,res);
  }
};
module.exports.localAuth = function(req,res){
  //localAuth is responsible for checking if the correct username and password have been sent to the server
    let userPath = path.join(rootPath,'user.json');
    if (!fs.existsSync(userPath)){
        
        userPath = path.join(rootPath,'user.txt');
        if (!fs.existsSync(userPath)){
          
          res.status(400).send("user.json or user.txt doesn't exist. Create the file first");
          res.end();
          return;
        }
    }
  
  fs.readFile(userPath, 'utf8',(err, data) => {
    if (err){
      res.send({response:false});
      res.end();
    }
    else{
      let formUser = req.body;
      let user = JSON.parse(data);
      if (user.username === formUser.username && user.password === formUser.password){
        //if users match, request github authentication
        res.redirect("/github?connection=true");
        res.end();
        return;
      }
      else{
        //else send information that the user is incorrect
        res.status(400).send('Bad Request');
        res.end();
        return;
      }
    }
  });
};
module.exports.getAuth = function(req,res){
  //this function handles the exchange from code to OAuth for GitHub (See docs)
  //uses axios for http calls to Github API
  let code = req.query.code;
  if (code){
    //exchange code for token
    axios({
      method: 'POST',
      url: 'https://github.com/login/oauth/access_token',
      data:{
        code,
        client_id: process.env.GITHUB_CLIENT_ID.trim(),
        client_secret: process.env.GITHUB_CLIENT_SECRET.trim(),
        redirect_uri: 'http://localhost:8000/github/auth',
      },
      headers: {'Accept': 'application/json'}
    })
      .then(function(response){
        //we got token from code, must save
        //we get token here, have to save token to file. After it is saved, we can redirect to /admin, which will check the
        //file for an active token. Will then use that token to grant access to the page
        const token = response.data.access_token;
        //get user login
        axios({
          method: 'GET',
          url: 'https://api.github.com/user?access_token='+response.data.access_token,
        })
          .then(function(response){
            //save user login and user token to the user file
            const login = response.data.login;
            //read file
            let userPath = path.join(rootPath,'user.json');
            if (!fs.existsSync(userPath)){
                userPath = path.join(rootPath,'user.txt');
                if (!fs.existsSync(userPath)){
                    debug("user.txt also doesn't exist,returning with error");
                    res.status(400).send("user.json or user.txt doesn't exist. Create the file first");
                    res.end();
                    return;
                }
            }
            fs.readFile(userPath,'utf8',(err,data) =>{
              if (err){
                res.send({response: "No user file"});
              }
              else{
                const user = JSON.parse(data);
                
                user.token = token;
                if (!user.login){
                  //if first time requesting github auth, all good
                 
                  user.login = login;
                }
                else {
                    if (user.login !== login) {
                       
                        //if the github auth has another login, revoke its token and return to browser with error
                        //require the original github auth to successfully login
                        revokeToken(user.token)
                            .then(response => {
                                res.redirect("/authenticate?user=false");
                            })
                            .catch(err => {
                                debug(err);
                                res.redirect("/authenticate?user=false")
                            })
                    }
                }
                //write login and token to file.
                fs.writeFile(userPath,JSON.stringify(user),(err) => {
                  if (err){
                    debug(err);
                  }
                  res.redirect("/authenticate?auth=true");
                })
              }
            });
            
            return;
          })
          .catch((err) => {
            debug(err);
            return;
          })
      })
      .catch(function(err){
        debug(err);
        res.end();
        return;
      })
  }
  else{
    //we have our token
    /*
    axios({
      method: 'DELETE',
      url: `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/tokens/:access_token`
    })*/
  }
 
};
