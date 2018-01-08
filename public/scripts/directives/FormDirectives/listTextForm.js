application.directive("listTextForm",function(){
    "use strict";
    return{
        restrict: "E",
        scope:{
            component: "=",
            compindex: "="
        },
        templateUrl: "templates/forms/listText.html",
        link: function(scope,elem){

        },
        controller: function($scope){

        }
    }
});