module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArrayQuizModalCtrl",["$scope","$uibModalInstance","questions",
        function($scope,$uibModalInstance,questions){
            "use strict";
            $scope.questions = questions;
            $scope.closeModal = function(){
                $uibModalInstance.close({val: true});
            };
            $scope.dismissModal = function(){
                $uibModalInstance.dismiss("Modal dismissed");
            }
        }]);
};