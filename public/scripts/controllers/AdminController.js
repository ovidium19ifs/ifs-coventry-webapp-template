application.controller("AdminController",function($scope,dataBlock,$location,navigate,$timeout){
    "use strict";
    $scope.selected = "";
    $scope.step=0;
    $scope.chapter = null;

    function capitalize(str){
        return str.slice(0,1).toUpperCase() + str.slice(1);
    }
    if (dataBlock){
        var data = dataBlock;
        $scope.data = angular.copy(data);
        $scope.group = capitalize(navigate.getGroup());

    }
    $scope.selectGroup = function(grp){
        $location.path("/admin/"+grp);
    };
    $scope.editBlock = function(name){
        if ($scope.selected!==name)
            $scope.selected = name;
        else $scope.selected= "";
    };
    $scope.editChapter = function(ch_index,bl_index){

        if (ch_index==0)
            $scope.chapter = $scope.data[bl_index].introcontent;
        else{
            $scope.chapter = $scope.data[bl_index].chapters[ch_index-1];
        }
        $scope.step=1;
        $scope.$broadcast("prepareFields");

    };
    $scope.goBack = function(){
        $scope.chapter=null;
        $scope.data = angular.copy(data);
        $scope.step=0;
        $timeout(function(){
            scrollTo("adminEditor");
        },50);

    };
    $scope.submit = function(){
        data = $scope.data ;
        $scope.data = angular.copy(data);
        $scope.goBack();
    }
    var scrollTo = function(idi){
        var elem = angular.element(document.getElementById(idi));
        var container = angular.element(document.getElementById("mainContent"));
        container.scrollToElement(elem,80,50);
    }
});