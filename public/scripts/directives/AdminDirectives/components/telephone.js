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
              this.phones = $scope.item.element.phones;
              this.createPhones = function(){
                $scope.item.element.phones = [{}];
                this.phones = $scope.item.element.phones;
              };
              this.addPhone = function(){
                this.phones.push({});
              };
            }]
        }
    }]);
};