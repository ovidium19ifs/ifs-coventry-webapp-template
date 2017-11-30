application.controller("MainContentCtrl",function($scope,$routeParams,navigate){
    "use strict";
    $scope.data={};
    if (!navigate.urlIsValid($routeParams)){
        navigate.errorPage();
    }
    $scope.data.blockname = $routeParams.blockname;
    $scope.data.name = $routeParams.chaptername;

});