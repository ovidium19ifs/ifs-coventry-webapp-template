module.exports = function(application){
    "use strict";
    application.directive('imageAdmin',["fileService",function(fileService){
        return{
            restrict : 'E',
            scope:{
                item: "=",
                maxSize: "@?"
            },
            template: require('../../../../templates/admin/components/imageUpload.html'),
            link: function(scope,elem,attrs,ctrl){
                console.log(attrs);
              if (attrs.hasOwnProperty('formName')){
                $(elem).find('.sub-form').attr('name',attrs['formName']);
              }
            },
            controllerAs: 'ctrl',
            controller: ["$scope",function($scope){
                let ctrl = this;
                if (!$scope.maxSize){
                    console.log("No maxSize defined");
                    $scope.maxSize = 80;
                }
                ctrl.element = $scope.item;
                if (!ctrl.element.src){
                    ctrl.currentFile = "None";
                }
                else if (ctrl.element.src.startsWith('blob')){
                    ctrl.currentFile = fileService.getFileName(ctrl.element.src);
                }
                else{
                    ctrl.currentFile = ctrl.element.src.replace("image/","");
                }
                $scope.$on("receiveFile",function(e,args){
                    if (args[2]){
                        $scope.exists = {
                            res: true,
                            link: args[3]
                        }
                    }
                    else{
                        $scope.exists = {};
                    }
                    e.stopPropagation();
                    args[0] = ctrl.element;
                    ctrl.currentFile = args[1].name;
                    fileService.addFile(args);
                    fileService.createUrls(args);
                });
            }]
        }
    }]);
};