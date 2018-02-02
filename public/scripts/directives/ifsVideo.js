application.directive("ifsVideo",function($window,$timeout){
    "use strict";
    // noinspection JSAnnotator
    return {
        restrict: "E",
        templateUrl: "templates/components/video/single.html",
        scope: {
            element: "=",
            start: "="
        },
        link: function(scope,elem,attr,ctrl){

            scope.$on("stopVideo",function(e,v){
                e.preventDefault();
                if (scope.videoPlaying){
                    var src = $(scope.iframe).attr("src");
                    $(scope.iframe).attr("src",src);
                    scope.$apply(function(){
                        scope.videoPlaying = false;
                    });
                }
            });
            scope.setFrameParams = function(){
                $timeout(function(){
                    scope.iframe=$(elem).find("iframe");
                    console.log(scope.iframe);
                    var width = $(window).width();
                    if (width > 930){
                        scope.iframe.css("width","600px");
                        scope.iframe.css("height","335px");
                    }
                    else if (width<=930){
                        scope.iframe.css("width","390px");
                        scope.iframe.css("height","218px");
                    }

                    $(window).resize(function(e){
                        var width = $(this).width();
                        if (width > 930){

                            scope.iframe.css("width","600px");
                            scope.iframe.css("height","335px");
                        }
                        else if (width<=930){
                            scope.iframe.css("width","390px");
                            scope.iframe.css("height","218px");
                        }
                    });
                });

            };

        },
        controller: function($scope,$sce){
            $scope.link = $sce.trustAsResourceUrl($scope.element.video.src);
            $scope.videoPlaying=false;
            $scope.openVideo = function(evt){
                $scope.videoPlaying= !$scope.videoPlaying;
                if ($scope.videoPlaying){
                    $scope.setFrameParams();
                }
            };
            if ($scope.start){
                $timeout(function(){
                    $scope.openVideo();
                },0);
            }
        }
    }
});