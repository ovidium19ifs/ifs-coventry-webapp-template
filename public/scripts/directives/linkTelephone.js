module.exports = function(application){
    "use strict";
    application.directive("linkTelephone",function(){
        "use strict";
        return{
            restrict: "E",
            scope:{
                component: "="
            },
            template: require('../../templates/components/link/telephone.html'),
            controlller: function($scope){}
        }
    });
};

