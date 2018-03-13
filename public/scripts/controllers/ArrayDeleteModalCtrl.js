module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArrayDeleteModalCtrl",["$scope","$uibModalInstance","item",
        function($scope,$uibModalInstance,item){
        "use strict";
        $scope.item = item;
        $scope.closeModal = function(){
            $uibModalInstance.close({val: true});
        };
        $scope.dismissModal = function(){
            $uibModalInstance.dismiss("Modal dismissed");
        }
    }]);
};
