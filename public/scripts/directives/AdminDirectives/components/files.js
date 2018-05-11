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
                $scope.exists = [];
                $scope.uploadFile = function(i){
                    $('#fileElem'+i).click();
                };
                $scope.$on("move",function(e,args){
                    console.log("caught move event in files.js");
                    console.log(args);
                    let changer = args.direction === 'up' ? -1 : 1;
                    [$scope.exists[args.index],$scope.exists[args.index+changer]] = [$scope.exists[args.index+changer],$scope.exists[args.index]];
                    
                });
                $scope.$on("receiveFile",function(e,args){
                    e.stopPropagation();
                    if (args[2]){
                        $scope.exists[args[0]]={
                            res: true,
                            link: args[3]
                        };
                        console.log("File exists");
                    }
                    else{
                      $scope.exists[args[0]]={};
                      console.log("File doesnt exist");
                    }
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