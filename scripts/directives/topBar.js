application.directive("topBar",function(){
    "use strict";
    return{
        restrict: "E",
        scope: {

        },
        templateUrl: "templates/topBar.html",
        link: function(scope,elem,attrs,ctrl){

        },
        controller: function($scope,$location,$routeParams){
            var re = /content\/([a-zA-Z]+)/g;
            $scope.$watch(
                function(){
                    return $location.path();
                },
                function(newV){
                    console.log(newV);
                    if (newV && newV!=="undefined"){
                        var results = re.exec(newV);
                        console.log(results);
                    }
                }
            )
        }
    }
});