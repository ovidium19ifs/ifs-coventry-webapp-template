module.exports = function(application){
  "use strict";
  application.directive("listImages",[function(){
    "use strict";
    return {
      restrict: "E",
      scope: {
        component: "="
      },
      template: require('../../templates/components/list/listImages.html'),
      link: function(scope,elem,attr,ctrl){
      },
      controller: function($scope,$timeout){
      }
    }
  }]);
};
