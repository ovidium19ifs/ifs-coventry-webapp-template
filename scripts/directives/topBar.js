application.directive("topBar",function(){
    "use strict";
    return{
        restrict: "E",
        scope: {

        },
        templateUrl: "templates/topBar.html",
        link: function(scope,elem,attrs,ctrl){

        },
        controller: function($scope,$location,$routeParams){
            var re = /content\/([a-zA-Z]+)/g;
            var arr = $location.path().split("/");
            var index = arr.indexOf("content");
            if (index>-1){
                $scope.source = arr[index+1].charAt(0).toUpperCase() + arr[index+1].slice(1);
            }
            $scope.$on("$locationChangeSuccess",function(e,newUrl){
                var res = re.exec(newUrl);
                if (res && res.length>1){
                    if (res[1]!==$scope.source){
                        $scope.source=res[1].charAt(0).toUpperCase()+res[1].slice(1);
                    }
                }
                else{
                    if (!newUrl.includes("content")){
                        $scope.source="";
                    }
                }
            })
        }
    }
});