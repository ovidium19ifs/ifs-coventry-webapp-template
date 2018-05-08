//All controllers and directives are written as CommonJS modules to integrate them with webpack.
//they export a function that gets called with the application parameter in the entry point.
module.exports  = function(application){
    "use strict";
    //For minifying purposes, we encapsulate the injected services in an array and pass them along with the constructor function
    application.controller("AdminController",["$scope","$location","github","$window",
        function($scope,$location,github,$window) {
          "use strict";
  
          $scope.selectGroup = function (grp) {
            $location.path("/admini/" + grp);
          };
          $scope.download = function () {
              let download_url = $location.absUrl().replace($location.url(),"/download");
              $window.open(download_url+"?auth=true");
          };
        }])
};
