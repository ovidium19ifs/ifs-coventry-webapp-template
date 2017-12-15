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
                console.log("received message that data was loaded");
                var data = navigate.getDataBlock()[0];
                console.log(data);
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
                console.log("We are going to scroll to " + target);
                $scope.$emit("ifsPrepareScroll",[target]);
            }
        }
    }
});