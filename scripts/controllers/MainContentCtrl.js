application.controller("MainContentCtrl",function($scope,$routeParams,navigate){
    "use strict";
    $scope.data={};
    if (!navigate.urlIsValid($routeParams)){
        navigate.errorPage();
    }
    var data = navigate.getDataBlock();
    $scope.data = data[0];
    $scope.index = data[1];
    $scope.blockLength = navigate.getBlockLength();

});