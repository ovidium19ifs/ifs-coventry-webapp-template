module.exports = function(application){
    "use strict";
    application.directive('fileUploader',["$parse","fileService",function($parse,fileService){
        return{
            restrict : 'E',
            transclude:true,
            scope:{
                index: "=",
                form: "=",
                context: "=",
                fileType: "@"
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
                    fileService.exists($scope.fileType,this.file.name).$promise.then(res => {
                        console.log(res);
                        $scope.$emit("receiveFile",[$scope.index,fup.file,res.response,`/${$scope.fileType}/${this.file.name}`]);
                     
                    })
                      .catch(err => {
                          console.log(err);
                      })
                   
                    
                }
            }]
        }
    }]);
};