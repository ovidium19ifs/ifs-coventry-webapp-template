module.exports = function(application){
    "use strict";
    application.directive('emailAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/email.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["$scope",function($scope){
                this.mails = $scope.item.element.links;
                this.createMails = function(){
                    $scope.item.element.links = [{}];
                    this.mails = $scope.item.element.links;
                };
                this.addMail = function(){
                    this.mails.push({});
                };
            }]
        }
    }]);
};