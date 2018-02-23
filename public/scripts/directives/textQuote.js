module.exports = function(application){
    "use strict";
    application.directive("textQuote",function(){
        "use strict";
        return{
            restrict: "E",
            scope:{
                component: "="
            },
            template: require('../../templates/components/text/quote.html'),
            controller: function($scope){}
        }
    });
};
