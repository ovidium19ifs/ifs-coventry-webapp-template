/* eslint-disable no-trailing-spaces,no-console */

//quite a mess, can be improved
module.exports = function(application){
    "use strict";
    application.controller("TestCtrl",["$scope","dataFetcher","navigate","$routeParams","$location","$timeout",
        function($scope,dataFetcher,navigate,$routeParams,$location,$timeout){
        "use strict";
        /*
            home, searchState, inContentState and adminState are used to control what tags appear on the page at any given time
         */
        $scope.home=true;
        $scope.$on("$locationChangeSuccess", function(e,newUrl){
            if ($location.path()!=="/"){
                $scope.home=false;
            }
            else{
                $scope.home=true;
            }
            if ($location.path().indexOf("search")>-1){
                $scope.searchState= true;
            }
            else{
                $scope.searchState=false;
            }
            
        });
        $scope.$watch(
            function(){
                return $routeParams.hasOwnProperty("group") && $location.path().indexOf("content")>-1;
            },
            function(newV){
                if (newV && newV!=="undefined"){
                    $scope.inContentState = true;
                    $scope.data=navigate.getData();
                    $scope.$watch(
                        function(){
                            return navigate.lowEnd();
                        },
                        function(newV,oldV){
                            $scope.lowEnd = newV;
                        });
                    $scope.$watch(
                        function(){
                            return navigate.highEnd();
                        },
                        function(newV,oldV){
                            $scope.highEnd = newV;
                        });
                }
                else $scope.inContentState = false;
            }
        );
        $scope.$watch(
            function () {
                return $location.path().indexOf("admini")>-1;
            },
            function(newV){
                $scope.adminState = newV ? true : false;
            }
        );
        $scope.$on("$dataWasLoaded",function(e,args){
            //this logic decides if the Prev and Next buttons should also be place at the bottom of content page
            //they are placed if the height of the content is bigger than the height of the window.
            if ($location.path().indexOf("content")>-1){
                $timeout(function(){
                    let windowHeight = $(window).height();
                    let contentHeight = document.getElementById("mainContent").scrollHeight;
                    if (contentHeight>windowHeight)
                        $scope.heightBiggerThanWindow = true;
                    else
                        $scope.heightBiggerThanWindow = false;
                },0);
                
            }
            $scope.$broadcast("dataWasLoaded",args);
        });
        
        //intercept emitted event from right-side menu and pass it to content page
        $scope.$on("ifsPrepareScroll",function(e,args){
            $scope.$broadcast("ifsScrollTo", args);
        });
        
        
        $scope.lowEnd = true;
        $scope.highEnd = false;
        
        $scope.goToPrevious = function(){
            navigate.goToPrevious();
            
        };
        
        $scope.goToNext = function(){
            navigate.goToNext();
            
        };
        
        
        ////////////////////////////////
        $scope.dataCopy = angular.copy($scope.data);
        
        $scope.addElem = function(){
            console.log("Called addElem in TestCtrl");
            $scope.data.push({
                "name": "Edit this block",
                "chapters": [{
                    "name": "Introduction",
                    "sections": []
                }]
            });
            console.log($scope);
        };

///////////////////////////////////////////////////////////
        $scope.submitSearch = function(q,f){
            //if search is invalid, return (less than 3 characters)
            if (f.$invalid) return;
            
            let block = navigate.getGroup();
            $location.search({query: q});
            $location.hash([]);
            $location.path("/"+block+"/search");
        };
        $scope.resetSearch =function(){
            
            $scope.searchTerm = "";
        }
        
    }]);
};
