module.exports = function(application){
    "use strict";
    application.directive("linkTelephoneForm",function() {
        "use strict";
        return {
            restrict: "E",
            scope: {
                component: "=",
                compindex: "=",
            },
            template: require('../../../templates/forms/linkTelephone.html'),
            link: function (scope, elem, attrs, ctrl) {
            
            },
            controller: function ($scope) {
            }
        }
    });
};
