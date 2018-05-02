module.exports = function(application){
    "use strict";
    application.directive("mediaDescription",function(){
        "use strict";
        return {
            restrict: "E",
            scope: {
                component: "="
            },
            template: require('../../templates/components/media/description.html'),
            controller: function($scope){
            
            }
        }
    });
};