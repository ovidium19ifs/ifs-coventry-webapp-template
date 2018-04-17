module.exports = function(application){
    "use strict";
    application.directive('interactiveTile',["$timeout",function($timeout){
        return{
            restrict: 'E',
            require:"ngModel",
            template: require("../../../templates/admin/tiles.html"),
            link: function(scope,elem,attrs,ctrl){
                /*
                
                    This directive is responsible for two-way data binding of the correct answer to the question.
                    It creates a list of elements based on the value of item.answers. It also listens to that collection in order to
                    update the list whenever changes are made.
                    
                    When the collection changes, it first checks if the value for correct answer has been changed, and if so it removes the 'correct-answer' class.
                    Then , we are re-creating the list using the new collection.
                    First we check if we still have a correct value in the list(it hasnt changed), if it did, then we set the correct answer to unselected.
                    Event Listeners are re-applied, as the user might have removed or added elements to the list.
                 */
                function applyEventListeners(){
                    $(elem).find('li').off().on("click",function(e){
                        console.log(e);
                        let elem = e.target;
                        let newVal = $(elem).text();
                        ctrl.$setViewValue(newVal,'click');
                        removeCorrect();
                        applyCorrect(ctrl.$modelValue);
                    });
                }
                function reApply(){
                    $timeout(function(){
                        let val = ctrl.$modelValue;
                        if (val){
                            applyCorrect(val);
                            
                        }
                        applyEventListeners();
                    },0);
                }
                function applyCorrect(val){
                    let index = scope.item.answers.findIndex(elem => elem.text === val);
                    if (index>=0){
                        $(elem).find(`li:nth-of-type(${index+1})`).addClass('correct-answer');
                    }
                    else{
                        ctrl.$setViewValue("","keypress");
                    }
                }
                function removeCorrect(){
                    let val = ctrl.$modelValue;
                    let correct = $(elem).find('li.correct-answer');
                    if (correct && val && val !== correct.text()){
                        correct.removeClass('correct-answer');
                    }
                }
                
                
                scope.$watchCollection('item.answers',function(newV,oldV){
                    removeCorrect();
                    reApply();
                })
               
                
            },
            controllerAs: 'tilesCtrl',
            controller: ["$scope",function($scope){
                /*
                if ($scope.item.element.questions){
                    $scope.item.element["questions"].map(elem => elem.answers =  elem.answers.reduce((acc,curr)=>acc+"\n"+curr.text,"").substr(1));
                }
                */
                
            }]
        }
    }]);
};