module.exports = function(application){
    "use strict";
    application.directive("ifsEditable",["$timeout","$parse","$compile",
        function($timeout,$parse,$compile) {
        "use strict";
        return {
            restrict: "A",
            link: function (scope, elem, attrs, ctrl, transcludeFn) {
                var content = angular.element(`<div class="btn-group btn-group-sm " role="group">
  <button type="button " class="btn btn-info small py-0 px-1" ng-hide="$first" ng-click="sendUpMessage()" ><span class="fa fa-arrow-up"></span></button>
  <button type="button " class="btn btn-info small py-0 px-1" ng-hide="$last" ng-click="sendDownMessage()"><span class="fa fa-arrow-down"></span></button>
  <button type="button " class="btn btn-danger small py-0 px-1" ng-click="sendDeleteMessage()"><span class="fa fa-trash"></span></button>
</div>`);
                content.css({
                    position: "absolute",
                    top: "0.4rem",
                    right:"0",
                    "z-index": "100",
                    "opacity": "0.3",
                    "font-size": "5px"
                });
                content.hover(function(){
                        content.css("opacity","0.95");
                    },
                    function(){
                        content.css("opacity","0.3");
                    });
                scope.message = attrs['ifsEditable'];
                var content = $compile(content)(scope);
                $timeout(function(){
                    
                    elem.addClass("position-relative");
                    elem.append(content);
                },0);
            },
            controller: function($scope){
                function getSubtitle(i,j){
                    if (isNaN(j))
                            return $scope.data[i].name;
                    return $scope.data[j].chapters[i].name;
                }
                $scope.sendUpMessage = function(){
                    $scope.$emit("move",{
                        message: $scope.message,
                        index: $scope.$index,
                        subtitle: getSubtitle($scope.$index,$scope.$parent.$index),
                        parentIndex: $scope.$parent.$index,
                        direction: "up"
                    });
                };
                $scope.sendDownMessage = function(){
                    $scope.$emit("move",{
                        message: $scope.message,
                        index: $scope.$index,
                        subtitle: getSubtitle($scope.$index,$scope.$parent.$index),
                        parentIndex: $scope.$parent.$index,
                        direction: "down"
                    });
                };
                $scope.sendDeleteMessage = function(){
                    $scope.$emit("deleteFromArray",{
                        message: $scope.message,
                        index: $scope.$index,
                        subtitle: getSubtitle($scope.$index,$scope.$parent.$index),
                        parentIndex: $scope.$parent.$index
                    });
                }
            }
            
        }
    }]);
};
