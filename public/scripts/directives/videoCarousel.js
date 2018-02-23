module.exports = function(application){
    "use strict";
    application.directive("videoCarousel",function(){
        "use strict";
        return{
            restrict: "E",
            scope: {
                component: "=",
                compkey: "="
            },
            template: require('../../templates/components/video/carousel.html'),
            link:{
                pre:  function(scope,elem){
                    scope.carousel = $(elem).find('.carousel').carousel({
                        interval : false
                    });
                    scope.$emit("initialized");
                }
            },
            
            controller: function($scope){
                $scope.selected=0;
                $scope.vSelected=0;
                $scope.$on("initialized",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    $($scope.carousel).on("slide.bs.carousel",function(e){
                        $scope.$apply(function(){
                            $scope.vSelected=e.to; //had to separate the selected variables, because changing "selected" here caused the carousel to briefly dissappear.
                        });
                    });
                    $($scope.carousel).on('slid.bs.carousel',function(e){
                        $scope.$broadcast("stopVideo");
                        $scope.$apply(function(){
                            $scope.selected=e.to;
                        });
                        
                        
                    });
                });
                
                
                
            }
        }
    });
};
