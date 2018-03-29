module.exports = function(application){
    "use strict";
    application.directive('textAlertAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/textAlert.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["links","$scope",function(links,$scope){
            
            }]
        }
    }]);
};