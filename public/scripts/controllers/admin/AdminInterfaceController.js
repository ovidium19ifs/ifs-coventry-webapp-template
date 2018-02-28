module.exports = function(application){
    "use strict";
    application.controller("AdminInterfaceController",["$scope","dataBlock","$timeout",function($scope,dataBlock,$timeout){
        "use strict";
        $scope.data = dataBlock;
        
        $scope.selBlock = dataBlock[0];
        $scope.selChapter = dataBlock[0].chapters[0];
        //angular.element is a jquery selector
        var container = angular.element(document.getElementById("mainContent2"));
        $timeout(function(){
            $scope.$broadcast("dataWasLoaded",$scope.selChapter.sections);
        },0);
        $scope.$on("ChangeChapter",function(e,bl_index,ch_index){
            e.preventDefault();
            e.stopPropagation();
            if (bl_index===undefined && ch_index===undefined) {
                $scope.selChapter = undefined;
                $scope.$broadcast("dataWasLoaded");
                return;
            }
            $scope.selBlock = dataBlock[bl_index];
            $scope.selChapter = dataBlock[bl_index].chapters[ch_index];
            $scope.$broadcast("dataWasLoaded",$scope.selChapter.sections);
            container[0].scrollTop = 0;
        });
        $scope.$on("ifsPrepareScroll",function(e,args){
            e.preventDefault();
            e.stopPropagation();
            var title = args[0];
            var elem = angular.element(document.getElementById(title));
            container.scrollToElement(elem,50,120);
        });
    }]);
};
