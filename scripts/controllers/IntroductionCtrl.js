application.controller("IntroductionCtrl",function($scope,navigate,$routeParams,dataBlock){
    "use strict";
    if (!navigate.urlIsValid($routeParams)){
        navigate.errorPage();
    }
    var data =  navigate.getDataBlock($routeParams.blockname);
    console.log(data);
    $scope.data = data[0];
    $scope.index = data[1]+1;
    $scope.dataLength = navigate.getDataLength();



});