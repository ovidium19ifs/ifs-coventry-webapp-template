application.directive("navMenu",function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: '/templates/nav-menu.html',
        scope: {
            data: "=",

        },
        link: function (scope, element, attrs, controller) {

        },
        controller: function ($scope, navigate, $location, $routeParams) {


            $scope.select = function (bl_index, evt, dataBlock) {

                evt.preventDefault();
                evt.stopPropagation();
                console.log("clicked");
                var bl_name = $(evt.target).text();
                //$scope.selected = $scope.selected === bl_name ? "" : bl_name;
                //$scope.chSelected = bl_name+"-";
                if ($location.path() !== ("/blocks/" + bl_name))
                    navigate.goTo(bl_name);
                /*
                console.log(bl_index);
                var bl = navigate.getBlockByIndex(bl_index);
                if ($scope.selected===bl.name) $scope.selected=null;
                else $scope.selected=bl.name;
                if ($location.path()!==("/blocks/"+bl.name))
                    navigate.goTo(bl.name);
                };
                */
            };

            $scope.selectChapter = function (bl_index, index, evt) {
                evt.preventDefault();
                evt.stopPropagation();
                //console.log(evt);
                var ch_name = $(evt.target).text();
                console.log($scope.chSelected);
                var hyphen=$scope.chSelected.lastIndexOf("-");
                if (hyphen===$scope.chSelected.length-1){
                    //$scope.chSelected = $scope.chSelected+ch_name;
                    $location.path("/blocks/"+$scope.selected+"/chapter/"+ch_name);
                }

                else if ($scope.chSelected.indexOf(ch_name) <= 0) {
                    //$scope.chSelected = $scope.chSelected.slice(0, $scope.chSelected.indexOf("-")) + ch_name;
                    var base = $location.path().slice(0, $location.path().lastIndexOf("/") + 1);
                    $location.path(base + ch_name);
                }

            };
            $scope.$watch(
                function(){
                    return $location.path()
                },
                function(newVal){
                    var location = newVal.slice($location.path().indexOf("/blocks"));

                    var locParams = location.split("/");
                    var bl = locParams.indexOf("blocks");
                    var ch = locParams.indexOf("chapter");
                    if (bl>-1){
                        $scope.selected = locParams[bl+1];
                        $scope.chSelected = $scope.selected + "-";
                        if (ch>-1){
                            $scope.chSelected += locParams[ch+1];
                        }
                    }
                    else{
                        $scope.selected = "";
                        $scope.chSelected = "";
                    }
                });

                console.log("selected: "+$scope.selected);
                console.log("chapter selected: "+$scope.chSelected);

        }
    }
});