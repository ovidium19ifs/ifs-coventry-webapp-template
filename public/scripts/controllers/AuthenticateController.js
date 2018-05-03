module.exports = function(app){
  app.controller("AuthenticateController",["$scope","github","$location","$timeout","loginLocal","loginGithub",function($scope,github,$location,$timeout,loginLocal,loginGithub){
    const query = $location.search();
    console.log(query);
    console.log("Blah blashsdasodpka");
    console.log(loginLocal);
    console.log(loginGithub);
    
    if (!loginLocal){
      github.authenticated = true;
      $location.url('/admin').replace();
    }
    if (query.hasOwnProperty('auth') && query.auth){
      github.authenticated = true;
      $location.url('/admin').replace();
    }
    if (query.hasOwnProperty('user') && query.user){
      $scope.errorMessage="Wrong github account. Please login with the original github account";
    }
    $scope.validateAndSend = function(f){
      console.log(f);
      let formData = {
        username: f.username.$viewValue,
        password: f.password.$viewValue
      };
      github.authLocal(formData).$promise.then(resp => {
        console.log(resp);
        /*
        //simlpified login
        github.authenticated = true;
        $location.url('/admin').replace();
        return;
        //-------------------
        */
        /*
        if (!loginGithub){
          github.authenticated = true;
          $location.url('/admin').replace();
        }
        */
        if (!loginGithub){
          github.authenticated = true;
          $location.url('/admin').replace();
          return;
        }
        else{
          github.get(true).$promise.then(resp => {
            console.log(resp);
            if (resp.redirect){
              window.location.replace(resp.url);
            }
            else{
              $scope.errorMessage = "This username is not valid";
            }
          })
            .catch(err =>{
              $scope.errorMessage = "This username is not valid";
            })
        }
       
        
      })
        .catch(err => {
          $scope.errorMessage = "This username is not valid";
          $timeout(() => {
            $scope.errorMessage = "";
          },3000)
        })
    }
  }]);
};