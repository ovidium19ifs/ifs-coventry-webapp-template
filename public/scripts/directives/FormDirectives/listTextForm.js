module.exports = function(application){
    "use strict";
    application.directive("listTextForm",["$timeout",function($timeout){
        "use strict";
        return{
            restrict: "E",
            scope:{
                component: "=",
                compindex: "="
            },
            template: require('../../../templates/forms/listText.html'),
            link: function(scope,elem){
            
            },
            controller: function($scope){
                $scope.addLinkElement = function(i,j){
                    if (!$scope.component['list_elements'][j].hasOwnProperty("links")){
                        $scope.component['list_elements'][j].links  = [{}];
                    }
                    else{
                        $scope.component['list_elements'][j].links.splice(i+1,0,{});
                        $timeout(function(){
                            console.log($scope.compindex+''+$scope.$parent.$index+'linkElem'+(i+1));
                            var elem = angular.element(document.getElementById($scope.compindex+''+j+'linkElem'+(i+1)));
                            var container = angular.element(document.getElementById("mainContent"));
                            container.scrollToElement(elem,80,50);
                        },100);
                    }
                };
                
                $scope.removeLinkElement = function(i,j){
                    $scope.component['list_elements'][j].links.splice(i,1);
                }
                
                $scope.addListElement = function(i){
                    
                    if (!$scope.component.hasOwnProperty("list_elements")){
                        $scope.component["list_elements"]  = [{}];
                        
                    }
                    else{
                        $scope.component["list_elements"].splice(i+1,0,{});
                        $timeout(function(){
                            console.log($scope.compindex+"listElem"+(i+1));
                            var elem = angular.element(document.getElementById($scope.compindex+"listElem"+(i+1)));
                            var container = angular.element(document.getElementById("mainContent"));
                            container.scrollToElement(elem,80,50);
                        },100);
                    }
                };
                $scope.removeListElement = function(i){
                    $scope.component["list_elements"].splice(i,1);
                }
            }
        }
    }]);
};

