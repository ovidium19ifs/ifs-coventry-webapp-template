application.directive("linkTelephone",function($timeout) {
    "use strict";
    return {
        restrict: "E",
        scope: {
            component: "=",
            compindex: "=",
        },
        templateUrl: "templates/forms/linkTelephone.html",
        link: function (scope, elem, attrs, ctrl) {

        },
        controller: function ($scope) {
        }
    }
});