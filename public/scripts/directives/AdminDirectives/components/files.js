module.exports = function(application){
    "use strict";
    application.directive('filesAdmin',["fileService",function(fileService){
        return{
            restrict : 'E',
            template: require('../../../../templates/admin/components/files.html'),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controllerAs: 'ctrl',
            controller: ["$scope",function($scope){
                let ctrl = this;
                $scope.uploadFile = function(i){
                    $('#fileElem'+i).click();
                };
                $scope.$on("receiveFile",function(e,args){
                    e.stopPropagation();
                    let i = args[0];
                    args[0] = ctrl.files[i];
                    $scope.item.element.links[i].link = args[1].name;
                    if ($scope.item.element.links[i].text === '' || !$scope.item.element.links[i].text){
                        $scope.item.element.links[i].text = args[1].name;
                    }
                    console.log(args);
                    fileService.addFile(args);
                    fileService.createUrls(args);
                });
                
                this.files = $scope.item.element.links;
                this.createFiles = function(){
                    $scope.item.element.links = [{}];
                    this.files = $scope.item.element.links;
                };
                this.addFile = function(e){
                    console.log(e);
                    this.files.push({});
                };
            }]
        }
    }]);
};