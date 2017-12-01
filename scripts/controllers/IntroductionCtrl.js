application.controller("IntroductionCtrl",function($scope,navigate,$routeParams){
    "use strict";
    if (!navigate.urlIsValid($routeParams)){
        navigate.errorPage();
    }
    $scope.data = navigate.getDataBlock($routeParams.blockname);


});