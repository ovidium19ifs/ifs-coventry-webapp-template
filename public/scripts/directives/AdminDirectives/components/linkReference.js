module.exports = function(application){
    "use strict";
    application.directive('referenceAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/reference.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["links","$scope","authors",function(links,$scope,authors){
                this.authors = $scope.item.element.authors.reduce((acc,curr) => acc.concat(`${curr.name}\n`),'');
                let watcher = $scope.$watch(function(){return $scope.ctrl.authors},function(newV,oldV){authors.authors = newV});
                $scope.$on("destroy",function(e){
                   watcher();
                });
            }]
        }
    }]);
};