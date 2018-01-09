application.directive("linkReference",function($timeout) {
    "use strict";
    return {
        restrict: "E",
        scope: {
            component: "=",
            compindex: "=",
        },
        templateUrl: "templates/forms/linkReference.html",
        link: function (scope, elem, attrs, ctrl) {

        },
        controller: function ($scope,$filter) {
            $scope.fix = function(name){
                return $filter('capitalize')($filter('singular')(name));
            };
            $scope.templates = {};
            $scope.keys = (function() {
                var k=[];
                for (var key in $scope.component){
                    if ($scope.component.propertyIsEnumerable(key) && key!=="subtitle" && key!=="type" && key!=="space_after" && key!=="$$hashKey"){
                        k.push({
                            "key": key,
                            "type": (typeof $scope.component[key])
                        });
                        if (typeof $scope.component[key]=="object"){
                            var template = [];
                            for (var secKey in $scope.component[key][0]){
                                console.log(secKey);
                                if ($scope.component[key][0].propertyIsEnumerable(secKey) && secKey!=="$$hashKey"){
                                    template.push({
                                        "key": secKey,
                                        "type": typeof $scope.component[key][0][secKey]
                                    })
                                }
                            }
                            $scope.templates[key] = template;

                        }
                    }


                }
                return k;
            })();
            $scope.addElem = function(i,k){
                if (!$scope.component.hasOwnProperty(k)){
                    console.log("here");
                    $scope.component[k]  = [{}];
                }
                else{
                    $scope.component[k].splice(i+1,0,{});
                    $timeout(function(){
                        console.log($scope.compindex+'field'+(k+i+1));
                        var elem = angular.element(document.getElementById($scope.compindex+'field'+(k+(i+1))));

                        var container = angular.element(document.getElementById("mainContent"));
                        container.scrollToElement(elem,80,70);
                    },100);
                }
            };
            $scope.removeElem = function(i,k){
                $scope.component[k].splice(i,1);
                if ($scope.component[k].length==0){
                    delete $scope.component[k];
                }
            }
        }
    }
});