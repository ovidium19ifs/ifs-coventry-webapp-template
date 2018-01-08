application.directive("textQuote",function($timeout) {
    "use strict";
    return {
        restrict: "E",
        scope: {
            component: "=",
            compindex: "=",
        },
        templateUrl: "templates/forms/textquote.html",
        link: function (scope, elem, attrs, ctrl) {

        },
        controller: function ($scope) {
        }
    }
});