application.directive("thoughtBubble",function(){
    "use strict";
    return{
        restrict: "E",
        scope: {
            component: "=",
        },
        templateUrl: "templates/components/text/thought.html",
        controller: function($scope){
        
        }
    }
});