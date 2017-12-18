application.controller("MainContentCtrl",function($scope,$routeParams,navigate,dataBlock,$location, $document){
    "use strict";
    $scope.data={};
    console.log("Reloaded the Controller");
    var elem = angular.element(document.getElementById("mainContent"));
    elem.scrollTop(0,0);
    if (!navigate.urlIsValid($routeParams)){
        navigate.errorPage();
    }
    var data = navigate.getDataBlock();
    $scope.$emit("$dataWasLoaded");
    $scope.data = data[0];
    $scope.index = data[1];
    $scope.blockLength = navigate.getBlockLength();
    $scope.$on("ifsScrollTo",function(e,args){
        var title = args[0];
        var elem = angular.element(document.getElementById(title));
        var container = angular.element(document.getElementById("mainContent"));

        container.scrollToElement(elem,50,120);
    });

});