//All controllers and directives are written as CommonJS modules to integrate them with webpack.
//they export a function that gets called with the application parameter in the entry point.
module.exports  = function(application){
    "use strict";
    //For minifying purposes, we encapsulate the injected services in an array and pass them along with the constructor function
    application.controller("AdminController",["$scope","$location",
        function($scope,$location){
        "use strict";
        
        $scope.selectGroup = function(grp){
            $location.path("/admini/"+grp);
        };
       
    }]);
};
