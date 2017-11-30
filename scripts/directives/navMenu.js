application.directive("navMenu",function(){
    "use strict";
    return{
        restrict:'E',
        templateUrl:'/templates/nav-menu.html',
        scope:{
            data:"=",

        },
        link: function(scope,element,attrs,controller){
            /*
            scope.servicePromise.then(function(data){
                var listItems = element.find(".rs-sidebar");
                $(listItems).on("click",function(e){
                    console.log("caught event");
                    console.log(e);
                });
            })
            */
        },
        controller: function($scope,navigate,$location){
            $scope.select = function(bl_index,evt){
                evt.stopPropagation();
                evt.preventDefault();
                var bl = navigate.getBlockByIndex(bl_index);
                if ($scope.selected===bl.name) $scope.selected=null;
                else $scope.selected=bl.name;
                if ($location.path()!==("/blocks/"+bl.name))
                    navigate.goTo(bl.name);


            };
            $scope.selectChapter = function(bl_index,index,evt){
                evt.stopPropagation();
                evt.preventDefault();
                var bl = navigate.getBlockByIndex(bl_index,index);
                var bl_name = bl.name;
                var name = bl.chapters[index].name;
                $scope.chSelected = bl_name+ "-" + name ;
                navigate.goTo(bl_name,name);
            }
        }
    }
});