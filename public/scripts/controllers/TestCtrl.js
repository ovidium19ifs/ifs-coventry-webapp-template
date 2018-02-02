/* eslint-disable no-trailing-spaces,no-console */
application.controller("TestCtrl",function($scope,dataFetcher,navigate,$routeParams,$location){
    "use strict";
    /*
    $scope.$watch(function(){
        return $routeParams.group;
    },
        function(newV,oldV){
            console.log(newV);
            if (newV && newV!="undefined"){
                console.log("Requesting server for files with value: "+ newV);
                $scope.servicePromise =  dataFetcher.get($routeParams.group).$promise;
                $scope.servicePromise.then(function(res){
                        $scope.data = res;
                        navigate.setData($scope.data,$routeParams.group);

                    }
                    ,function(reason){
                    });
            }
        });

    $scope.$watchCollection("path",function(newV,oldV){
        console.log("Collection changed");
    });
    */
    var body = angular.element(document.getElementById("mainContent"));
    $scope.home=true;
    $scope.$on("$locationChangeSuccess", function(e,newUrl){
        console.log(newUrl);
       if ($location.path()=="/"){
           console.log("We are home");
           $scope.home=true;
           body.css({
               background: "radial-gradient(circle, #e8ecf2 40%,#669999 200%)"
           });
       }
       else{
           $scope.home=false;
           body.css("background","white");
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
        $scope.$broadcast("dataWasLoaded");
    });
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
    }



});