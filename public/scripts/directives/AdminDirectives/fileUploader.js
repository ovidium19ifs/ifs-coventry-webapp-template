module.exports = function(application){
    "use strict";
    application.directive('fileUploader',["$parse","fileService",function($parse,fileService){
        return{
            restrict : 'E',
            transclude:true,
            scope:{
                index: "=",
                form: "=",
                context: "="
            },
            template: require('../../../templates/admin/file-uploader.html'),
            link: function(scope,elem,attrs,ctrl){
                $(elem).find('.fileSelector').on("click",function(e){
                   $(elem).find('.fileUpload').click();
                });
                $(elem).find('.fileUpload').change(function(){
                    ctrl.handleChange(this);
                });
            },
            controllerAs: 'fup',
            controller: ["$scope",function($scope){
                let prev;
                let fup = this;
                
                this.handleChange = function(elem){
                    this.file = elem.files[0];
                    if (prev){
                        fileService.remove($scope.context,prev);
                    }
                    prev = this.file.name;
                    $scope.$apply(function(){
                        $scope.$emit("receiveFile",[$scope.index,fup.file]);
                    });
                    
                }
            }]
        }
    }]);
};