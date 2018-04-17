module.exports = function(application){
    "use strict";
    application.directive('quizAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/quiz.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["$scope",function($scope){
                this.items = $scope.item.element["questions"];
                this.createItems = function(){
                    $scope.item.element["questions"] = [{}];
                    this.items = $scope.item.element["questions"];
                    
                };
                this.addItem = function(){
                    this.items.push({});
                };
            }]
        }
    }]);
};