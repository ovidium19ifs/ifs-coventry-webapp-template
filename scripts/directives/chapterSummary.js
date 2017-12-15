application.directive("chapterSummary",function(){
    "use strict";
    return{
        restrict: "E",
        scope:{

        },
        templateUrl: "../../templates/chapterSummary.html",
        link: function(scope,elem,attrs,ctrl){

        },
        controller: function($scope,navigate,$location,$timeout) {
            $scope.titles=[];
            $scope.$on("dataWasLoaded",function(e,args){
                var data = navigate.getDataBlock()[0];
                $scope.titles=[];
                if (data.hasOwnProperty("introcontent")){
                    for (let obj of data.introcontent){
                        $scope.titles.push(obj.title);
                    }
                }
                else{
                    for (let obj of data.sections){
                        $scope.titles.push(obj.subtitle);
                    }
                }

            });
            $scope.scrollTo = function (subtitle) {
                var target = subtitle.replace(/\s/g,"").toLowerCase();
                $scope.$emit("ifsPrepareScroll",[target]);
            }
        }
    }
});