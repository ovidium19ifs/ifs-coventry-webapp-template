application.directive("linkEmail",function(){
    "use strict";
   return {
       restrict: "E",
       scope: {
           component: "="
       },
       templateUrl: "templates/components/link/email.html",
       controller: function($scope){
       
       }
   }
});