module.exports = function(application){
    "use strict";
    application.directive('websiteLinksAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/websiteLinks.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["$scope",function($scope){
                this.links = $scope.item.element.links;
                this.createLinks = function(){
                    $scope.item.element.links = [{}];
                    this.links = $scope.item.element.links;
                };
                this.addLink = function(){
                    this.links.push({});
                };
            }]
        }
    }]);
};