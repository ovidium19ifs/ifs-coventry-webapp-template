module.exports = function(application){
    "use strict";
    application.directive("thoughtBubble",function(){
        "use strict";
        return{
            restrict: "E",
            scope: {
                component: "=",
            },
            template: require('../../templates/components/text/thought.html'),
            controller: function($scope){
            
            }
        }
    });
};
