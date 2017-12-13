application.controller("MainMenuController",function($scope,$location){
    "use strict";
    $scope.selectGroup = function(group){
        $location.path("/content/"+group+"/");
    }

});