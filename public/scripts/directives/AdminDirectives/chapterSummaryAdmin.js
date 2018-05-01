module.exports = function(application){
    "use strict";
    application.directive("chapterSummaryAdmin",function(){
        "use strict";
        return{
            restrict: "E",
            scope:{
                "adminMode": "="
            },
            template: require('../../../templates/chapterSummary.html'),
            link: function(scope,elem,attrs,ctrl){
                /*
                Trying to implement scroll into view, but too many bugs in there
                
                
                var container = angular.element(document.getElementById('mainContent2'));
                var scrolledOver = undefined;
                console.log(container[0].scrollHeight);
                function isInViewport(subtitle){
                    let target = subtitle.replace(/\s/g,"").toLowerCase();
                    let targetDom = $(`#${target}`);
                    let elemTop = targetDom.offset().top;
                    let elemBottom = elemTop + targetDom.height();
                    let viewportTop = container[0].scrollTop;
                    let viewportBottom = viewportTop + container.height();
                    return elemBottom > viewportTop && elemTop < viewportBottom;
                }
                container.scroll(function(e){
                    for (let title of scope.titles){
                        if (isInViewport(title)){
                            let targetDom = $(elem).find(`li:contains('${title}')`)
                            if (!targetDom.hasClass('scrolled')){
                                if (!scrolledOver){
                                    targetDom.addClass('scrolled');
                                    scrolledOver = targetDom;
                                }
                                else{
                                    scrolledOver.removeClass('scrolled');
                                    targetDom.addClass('scrolled');
                                    scrolledOver=targetDom;
                                }
                            }
                            return;
                        }
            
                    }
                });
                */
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
                };
                $scope.sendAddSectionMessage = function(){
                    $scope.$emit("addSection");
                }
            }
        }
    });
};
