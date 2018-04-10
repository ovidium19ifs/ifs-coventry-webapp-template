module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArraySuccessModalCtrl",["$scope","$uibModalInstance",
        function($scope,$uibModalInstance){
            "use strict";
           
            $scope.closeModal = function(){
                $uibModalInstance.close({val: true});
            };
            $scope.dismissModal = function(){
                $uibModalInstance.dismiss("Modal dismissed");
            }
        }]);
};