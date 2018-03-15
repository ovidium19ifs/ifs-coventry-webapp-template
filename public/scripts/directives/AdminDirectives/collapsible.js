module.exports = function(app){
    "use strict";
    app.directive("collapsibleElem",["$compile","$timeout",function($compile,$timeout){
        return{
            restrict: 'A',
            link: function(scope,elem,attrs){
                scope.elem = attrs['collapsibleElem'];
                scope.collapsed = false;
                let content = angular.element(`<button class="btn btn-sm py-0" ng-click="toggleCollapse()"> <span class="fa fa-minus-square mr-2"></span> <span class="button-text">Collapse</span></button>`);
                content.css({
                    position: "absolute",
                    top: "-1.2rem",
                    right: scope.elem==='Section' ? '25%' : '37%',
                    "z-index": "100"
                });
                content.addClass(scope.elem==='Section' ? 'btn-info w-50' : 'btn-danger w-25');
                var compiled = $compile(content)(scope);
                $timeout(function(){
        
                    elem.addClass("position-relative");
                    elem.append(compiled);
                },0);
                scope.toggleCollapse = function(){
                    $(elem).find('.collapsible').first().toggleClass('collapse');
                    scope.collapsed = !scope.collapsed;
                    if (scope.collapsed){
                        content.find('.button-text').text('Show');
                    }
                    else{
                        content.find('.button-text').text('Collapse');
                    }
                }
                
            },
            controller: ["$scope",function($scope){
            }]
        }
    }]);
};