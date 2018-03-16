module.exports = function(application){
    "use strict";
    application.directive("editElement",["$parse","$uibModal",function($parse,$uibModal){
        return{
            restrict: 'E',
            template: require('../../../templates/admin/edit-element.html'),
            link: function(scope,elem,attrs){
                var element = scope[attrs['component']];
                var chapter = scope[attrs['chapter']];
                $(elem).click(function(e){
                    console.log(element);
                    for (let section of chapter.sections){
                        console.log(section.subtitle);
                    }
                });
            },
            controller: ["$scope",function($scope){
            
            }]
        }
    }]);
};