module.exports = function(application){
    "use strict";
    application.directive('textQuoteAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/textQuote.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["links","$scope",function(links,$scope){
            
            }]
        }
    }]);
};