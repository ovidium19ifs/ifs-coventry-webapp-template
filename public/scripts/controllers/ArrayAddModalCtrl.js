module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArrayAddModalCtrl",["$scope","$uibModalInstance","item",
        function($scope,$uibModalInstance,item){
            "use strict";
            if (item.message === 'Block'){
                $scope.newElement = item.newSection;
            }
            else{
                $scope.newElement = item.newChapter;
                $scope.sectionName = item.sectionName;
            }
            $scope.message = item.message;
            $scope.closeModal = function(form){
                console.log(form);
                if (!form.$valid){
                    console.log("form not valid");
                    return;
                }
                $uibModalInstance.close({val: true});
            };
            $scope.dismissModal = function(){
                $uibModalInstance.dismiss("Modal dismissed");
            }
        }]);
};