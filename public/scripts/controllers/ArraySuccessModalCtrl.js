module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArraySuccessModalCtrl",["$scope","$uibModalInstance","$location","$window",
        function($scope,$uibModalInstance,$location,$window){
            "use strict";
           $scope.downloaded = false;
            $scope.closeModal = function(){
                $uibModalInstance.close({val: true});
            };
            $scope.dismissModal = function(){
                $uibModalInstance.dismiss("Modal dismissed");
            };
          $scope.downloadData = function () {
            let download_url = $location.absUrl().replace($location.url(),"/download");
            $window.open(download_url+"?auth=true");
            $scope.downloaded=true;
          };
        }]);
};