module.exports = function(application){
    "use strict";
    application.directive("textMythfactForm",["$timeout",function($timeout){
        "use strict";
        return {
            restrict: "E",
            scope:{
                component: "=",
                compindex: "=",
            },
            template: require('../../../templates/forms/textmythfact.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controller: function($scope){
                $scope.addMyth = function(i){
                    if (!$scope.component.myths){
                        $scope.component.myths  = [{}];
                        
                    }
                    else{
                        $scope.component.myths.splice(i+1,0,{});
                        $timeout(function(){
                            var elem = angular.element(document.getElementById($scope.compindex+"mythField"+(i+1)));
                            var container = angular.element(document.getElementById("mainContent"));
                            container.scrollToElement(elem,80,70);
                        },100);
                    }
                    
                    
                    
                    
                };
                $scope.removeMyth = function(i){
                    $scope.component.myths.splice(i,1);
                }
            }
        }
    }]);
};
