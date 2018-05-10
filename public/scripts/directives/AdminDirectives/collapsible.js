module.exports = function(app){
    "use strict";
    app.directive("collapsibleElem",["$compile","$timeout",function($compile,$timeout){
        return{
            restrict: 'A',
            link: function(scope,elem,attrs){
                var type = attrs['collapsibleElem'];
                scope.collapsed = false;
                let content = angular.element(`<button class="btn btn-sm py-0" ng-click="toggleCollapse()"> <span class="fa fa-minus-square mr-2"></span> <span class="button-text">Collapse</span></button>`);
                content.css({
                    position: "absolute",
                    top: "-1.2rem",
                    right: type==='Section' ? '25%' : '37%',
                    "z-index": "100"
                });
                let collapseMessage = angular.element('<p ng-show="collapsed">Collapsed</p>');
                if (type==='Section'){
                  collapseMessage.css({
                    position: "absolute",
                    top:  "35%",
                    right:"35%",
                    fontSize: "3.5rem",
                    color: "blue",
                    transform:"rotate(-20deg)",
                    zIndex: 9999
                  });
                }
                else{
                  collapseMessage.css({
                    position: "absolute",
                    top:  "10%",
                    right:"35%",
                    fontSize: "3rem",
                    color: "red",
                    zIndex: 9999
                  });
                }
                
                collapseMessage.addClass('font-weight-bold');
                content.addClass(type==='Section' ? 'btn-info w-50' : 'btn-danger w-25');
                var compiled = $compile(content)(scope);
                var messageCompiled = $compile(collapseMessage)(scope);
                $timeout(function(){
        
                    elem.addClass("position-relative");
                    elem.append(compiled);
                    elem.append(messageCompiled);
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