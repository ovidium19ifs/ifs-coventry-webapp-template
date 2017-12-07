application.directive("ifsVideo",function($window,$timeout){
    "use strict";
    // noinspection JSAnnotator
    return {
        restrict: "E",
        templateUrl: "templates/components/video/single.html",
        scope: {
            element: "="
        },
        link: function(scope,elem,attr,ctrl){
            scope.setFrameParams = function(){
                $timeout(function(){
                    scope.iframe=$(elem).find("iframe");
                    console.log(scope.iframe);
                    var width = $(window).width();
                    if (width > 930){

                        scope.iframe.css("width","600px");
                        scope.iframe.css("height","320px");
                    }
                    else if (width<=930){
                        scope.iframe.css("width","350px");
                        scope.iframe.css("height","180px");
                    }


                    $(window).resize(function(e){
                        var width = $(this).width();
                        if (width > 930){

                            scope.iframe.css("width","600px");
                            scope.iframe.css("height","320px");
                        }
                        else if (width<=930){
                            scope.iframe.css("width","350px");
                            scope.iframe.css("height","180px");
                        }
                    });
                });

            };

        },
        controller: function($scope,$sce){
            $scope.link = $sce.trustAsResourceUrl($scope.element.video.src);
            $scope.videoPlaying=false;
            $scope.openVideo = function(evt){
                console.log(evt);
                $scope.videoPlaying= !$scope.videoPlaying;
                if ($scope.videoPlaying){
                    $scope.setFrameParams();
                }

            }

        }
    }
});