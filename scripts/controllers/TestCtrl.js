application.controller("TestCtrl",function($scope,dataFetcher,navigate){
    "use strict";
    $scope.message="Hello Angular";
    $scope.dataHasLoaded=false;
    $scope.servicePromise =  dataFetcher.get().$promise;


    $scope.servicePromise.then(function(res){
            $scope.data = res;
            navigate.setData($scope.data);
            $scope.lowEnd = true;
            $scope.highEnd = false;
            $scope.$watch(
                function(){
                    return navigate.lowEnd();
                },
                function(newV,oldV){
                    $scope.lowEnd = newV;
                }
            );
            $scope.$watch(
                function(){
                    return navigate.highEnd();
                },
                function(newV,oldV){
                    $scope.highEnd = newV;
                }
            );
        }
    ,function(reason){
    });


    $scope.goToPrevious = function(){
        navigate.goToPrevious();

    };

    $scope.goToNext = function(){
        navigate.goToNext();

    }
});