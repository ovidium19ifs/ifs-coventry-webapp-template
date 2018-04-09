module.exports = function(application){
    "use strict";
    application.directive('videoCarouselAdmin',[function(){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/videoCarousel.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["$scope",function($scope){
                let ctrl = this;
                this.items = $scope.item.element["videos"];
                this.createItems = function(){
                    $scope.item.element["videos"] = [{}];
                    this.items = $scope.item.element["videos"];
                    
                };
                this.addItem = function(){
                    this.items.push({
                        subtitle: "",
                        type: "video-single",
                        video: {}
                    });
                };
                $scope.$on("$destroy",function(){
                    console.log(ctrl.items);
                })
            }]
        }
    }]);
};