module.exports = function(application){
    "use strict";
    application.directive("linkReference",["$timeout",function($timeout) {
        "use strict";
        return {
            restrict: "E",
            scope: {
                component: "=",
                compindex: "=",
            },
            template: require('../../../templates/forms/linkReference.html'),
            link: function (scope, elem, attrs, ctrl) {
            
            },
            controller: function ($scope,$filter) {
                function getKeysAndTypes(obj){
                    var k=[];
                    for (var key in obj){
                        if (obj.propertyIsEnumerable(key) && key!=="subtitle" && key!=="type" && key!=="space_after" && key!=="$$hashKey"){
                            k.push({
                                "key": key,
                                "type": (typeof obj[key])
                            });
                            if (typeof obj[key]=="object"){
                                var template = [];
                                for (var secKey in obj[key][0]){
                                    console.log(secKey);
                                    if (obj[key][0].propertyIsEnumerable(secKey) && secKey!=="$$hashKey"){
                                        template.push({
                                            "key": secKey,
                                            "type": typeof obj[key][0][secKey]
                                        })
                                    }
                                }
                                $scope.templates[key] = template;
                            }
                        }
                    }
                    return k;
                }
                var defaultReference = {
                    "title": "Enter title here",
                    "authors": [
                        {
                            "name": ""
                        }
                    ],
                    "year": "",
                    "publisher": "",
                    "volume": "",
                    "pages": "",
                    "link": ""
                };
                $scope.templates = {};
                var defaultKeys = getKeysAndTypes(defaultReference);
                $scope.keys = getKeysAndTypes($scope.component);
                if ($scope.keys.length<1){
                    $scope.keys = defaultKeys;
                }
                $scope.fix = function(name){
                    return $filter('capitalize')($filter('singular')(name));
                };
                
                
                $scope.addElem = function(i,k){
                    if (!$scope.component.hasOwnProperty(k)){
                        console.log("here");
                        $scope.component[k]  = [{}];
                    }
                    else{
                        $scope.component[k].splice(i+1,0,{});
                        $timeout(function(){
                            console.log($scope.compindex+'field'+k.toString()+(i+1));
                            var elem = angular.element(document.getElementById($scope.compindex+'field'+k.toString()+(i+1)));
                            var container = angular.element(document.getElementById("mainContent"));
                            container.scrollToElement(elem,120,300);
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
    }]);
};
