//deprecated
module.exports = function(application){
    "use strict";
    application.controller("IntroductionCtrl",["$scope","navigate","$routeParams",
        function($scope,navigate,$routeParams){
        "use strict";
        if (!navigate.urlIsValid($routeParams)){
            navigate.errorPage();
        }
        var data =  navigate.getDataBlock($routeParams.blockname);
        
        $scope.$emit("$dataWasLoaded");
        $scope.data = data[0];
        $scope.index = data[1]+1;
        $scope.dataLength = navigate.getDataLength();
        $scope.$on("ifsScrollTo",function(e,args){
            var title = args[0];
            var elem = angular.element(document.getElementById(title));
            var container = angular.element(document.getElementById("mainContent"));
            
            container.scrollToElement(elem,50,120);
        });
        
        
        
    }]);
};
