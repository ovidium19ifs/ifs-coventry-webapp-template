module.exports = function(application){
    "use strict";
    application.controller("ArrayDeleteModalCtrl",["$scope","$uibModalInstance","item",
        function($scope,$uibModalInstance,item){
        "use strict";
        console.log(item);
        $scope.item = item;
        $scope.closeModal = function(){
            $uibModalInstance.close({val: true});
        };
        $scope.dismissModal = function(){
            $uibModalInstance.dismiss("Modal dismissed");
        }
    }]);
};
