module.exports = function(application){
    "use strict";
    application.controller("MainContentCtrl",["$scope","$routeParams","navigate","dataBlock","$location","$timeout",
        function($scope,$routeParams,navigate,dataBlock,$location,$timeout){
        "use strict";
        function scroll(e,args){
            var title = args[0];
            
            var elem = angular.element(document.getElementById(title));
            var container = angular.element(document.getElementById("mainContent"));
            
            container.scrollToElement(elem,50,120);
        }
        $scope.data={};
        var elem = angular.element(document.getElementById("mainContent"));
        if (!navigate.urlIsValid($routeParams)){
            navigate.errorPage();
        }
        var data = navigate.getDataBlock();
        $scope.$emit("$dataWasLoaded",data[0]);
        $scope.data = data[0];
        $scope.index = data[1];
        $scope.blockLength = navigate.getBlockLength();
        if (!$location.hash()){
            elem.scrollTop(0,0);
        }
        else{
            $timeout(function(){
                scroll(null,[$location.hash()]);
            },200);
        }
        $scope.$on("ifsScrollTo",scroll);
    }]);
};
