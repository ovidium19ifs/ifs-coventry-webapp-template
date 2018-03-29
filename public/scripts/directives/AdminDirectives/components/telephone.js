module.exports = function(application){
    "use strict";
    application.directive('telephoneAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/telephone.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["$scope",function($scope){
            
            }]
        }
    }]);
};