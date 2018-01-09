application.directive("linkWebsite",function($timeout) {
    "use strict";
    return {
        restrict: "E",
        scope: {
            component: "=",
            compindex: "=",
        },
        templateUrl: "templates/forms/linkWebsite.html",
        link: function (scope, elem, attrs, ctrl) {

        },
        controller: function ($scope) {
            $scope.addLink = function(i){
                if (!$scope.component.hasOwnProperty("links")){
                    $scope.component.links  = [{}];

                }
                else{
                    $scope.component.links.splice(i+1,0,{});
                    $timeout(function(){
                        var elem = angular.element(document.getElementById($scope.compindex+'linkField'+(i+1)));
                        var container = angular.element(document.getElementById("mainContent"));
                        container.scrollToElement(elem,80,70);
                    },100);
                }




            };
            $scope.removeLink = function(i){
                $scope.component.links.splice(i,1);
            }
        }
    }
});