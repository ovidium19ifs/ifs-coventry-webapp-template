module.exports = function(application){
    "use strict";
    application.directive("quizModalStart",[function(){
        "use strict";
        return {
            restrict: "E",
            scope: {
                component: "="
            },
            template: require('../../templates/components/quiz/quizModalStart.html'),
            controller: ["$scope","$uibModal",function($scope,$uibModal){
                $scope.startModal = function(){
                    let modalInstance = $uibModal.open({
                        template   : require('../../templates/modal/arrayQuizModal.html'),
                        controller : "ArrayQuizModalCtrl",
                        animation  : false,
                        windowClass: "my-modal modal-quiz",
                        backdrop   : 'static',
                        resolve:{
                            questions: function(){
                                return $scope.component.questions
                            }
                        }
                    });
                    modalInstance.result.then(function(res){
                    
                    });
                }
            }]
        }
    }]);
};