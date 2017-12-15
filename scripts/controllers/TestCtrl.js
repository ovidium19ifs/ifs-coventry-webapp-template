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
    */
    $scope.home=true;
    $scope.$on("$locationChangeSuccess", function(e,newUrl){
       if ($location.path()=="/"){
           console.log("We are home");
           $scope.home=true;
       }
       else{
           $scope.home=false;
       }
    });
    $scope.$watch(
        function(){
            return $routeParams.hasOwnProperty("group");
        },
        function(newV){
            if (newV && newV!=="undefined"){
                $scope.inContentState = true;

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
    $scope.$on("$dataWasLoaded",function(e,args){
        console.log("received");
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



});