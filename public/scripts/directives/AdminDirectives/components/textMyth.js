module.exports = function(application){
    "use strict";
    application.directive('textMythAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/textMyth.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["links","$scope",function(links,$scope){
                this.myths = $scope.item.element.myths;
                this.createMyths = function(){
                    $scope.item.element.myths = [{}];
                    this.myths = $scope.item.element.myths;
                };
                this.addMyth = function(){
                    this.myths.push({});
                };
            }]
        }
    }]);
};