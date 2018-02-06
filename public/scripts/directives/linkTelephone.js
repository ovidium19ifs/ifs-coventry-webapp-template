application.directive("linkTelephone",function(){
    "use strict";
    return{
        restrict: "E",
        scope:{
            component: "="
        },
        templateUrl: "templates/components/link/telephone.html",
        controlller: function($scope){}
    }
});