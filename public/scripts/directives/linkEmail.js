module.exports = function(application){
    "use strict";
    application.directive("linkEmail",function(){
        "use strict";
        return {
            restrict: "E",
            scope: {
                component: "="
            },
            template: require('../../templates/components/link/email.html'),
            controller: function($scope){
            
            }
        }
    });
};
