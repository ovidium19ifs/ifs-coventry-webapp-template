module.exports = function(application){
    "use strict";
    application.directive('imageAdmin',["fileService",function(fileService){
        return{
            restrict : 'E',
            scope:{
                item: "="
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