module.exports = function(application){
    "use strict";
    application.directive("editElement",["$parse","$uibModal",function($uibModal){
        return{
            restrict: 'E',
            template: require('../../../templates/admin/edit-element.html'),
            link: function(scope,elem,attrs){
                var element = scope[attrs['component']];
                $(elem).click(function(e){
                    console.log(element);
                });
            },
            controller: ["$scope",function($scope){
            
            }]
        }
    }]);
};