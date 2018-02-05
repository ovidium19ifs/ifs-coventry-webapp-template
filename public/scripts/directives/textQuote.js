application.directive("textQuote",function(){
    "use strict";
    return{
        restrict: "E",
        scope:{
            component: "="
        },
        templateUrl: "templates/components/text/quote.html",
        controller: function($scope){}
    }
});