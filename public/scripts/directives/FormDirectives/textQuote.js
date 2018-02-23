module.exports = function(application){
    "use strict";
    application.directive("textQuoteForm",function() {
        "use strict";
        return {
            restrict: "E",
            scope: {
                component: "=",
                compindex: "=",
            },
            template: require('../../../templates/forms/textquote.html'),
            link: function (scope, elem, attrs, ctrl) {
            
            },
            controller: function ($scope) {
            }
        }
    });
};
