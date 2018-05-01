module.exports = function(application){
  "use strict";
  application.directive('quoteMainAdmin',[function(){
    return{
      restrict : 'E',
      template: require('../../../../templates/admin/components/quoteMain.html'),
      link: function(scope,elem,attrs,ctrl){
      
      },
      controllerAs: 'ctrl',
      controller: ["$scope",function($scope){
        
        this.items = $scope.item.element["list_elements"];
        this.createItems = function(){
          $scope.item.element["list_elements"] = [{}];
          this.items = $scope.item.element["list_elements"];
          
        };
        this.addItem = function(){
          this.items.push({});
        }
      }]
    }
  }]);
};