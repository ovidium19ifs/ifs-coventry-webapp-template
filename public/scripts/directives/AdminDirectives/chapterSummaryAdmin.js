module.exports = function(application){
    "use strict";
    application.directive("chapterSummaryAdmin",function(){
        "use strict";
        return{
            restrict: "E",
            scope:{
            
            },
            template: require('../../../templates/chapterSummary.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controller: function($scope,navigate,$location,$timeout) {
                $scope.titles=[];
                $scope.$on("dataWasLoaded",function(e,sections){
                    if (!sections){
                        $scope.titles = [];
                        return;
                    }
                    $scope.titles=[];
                    for (var i=0;i<sections.length;i++){
                        $scope.titles.push(sections[i].subtitle);
                    }
                });
                
                $scope.scrollTo = function (subtitle,e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var target = subtitle.replace(/\s/g,"").toLowerCase();
                    $scope.$emit("ifsPrepareScroll",[target]);
                }
            }
        }
    });
};
