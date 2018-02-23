module.exports = function(application){
    "use strict";
    application.directive("appForm",["$timeout",function($timeout){
        "use strict";
        return {
            restrict: "E",
            template: require('../../templates/appForm.html'),
            scope: {
                chapter: "="
            },
            link: function (scope, elem, attrs, ctrl) {
                
                var findTogglers = function () {
                    var toggleButton = elem.find(".toggles");
                    toggleButton.off();
                    toggleButton.on("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("toggling element");
                        var selectField = $(e.currentTarget).siblings("select");
                        console.log(selectField);
                        selectField[0].disabled = !selectField[0].disabled;
                    })
                };
                scope.$on("prepareFields", function () {
                    
                    $timeout(function () {
                        console.log("finding togglers");
                        findTogglers();
                    }, 100);
                    
                })
                
            },
            controller: function ($scope) {
                $scope.selected=null;
                $scope.typeOptions = [
                    "text-paragraph",
                    "list-text",
                    "text-alert",
                    "text-mythfact",
                    "text-quote",
                    "link-telephone",
                    "link-website",
                    "link-email",
                    "link-pdf",
                    "link-reference",
                    "video-single"
                ];
                $scope.$on("deleteSelectors", function (event) {
                    console.log(event);
                    event.preventDefault();
                    $scope.componentSelected=null;
                    $scope.selected=null;
                });
                $scope.selectThis = function (i) {
                    $scope.selected == i ? $scope.selected = null : $scope.selected = i;
                };
                $scope.addNewSection = function(){
                    $scope.chapter.sections.push({})
                };
                $scope.addNewComponent = function(i){
                    if (!$scope.chapter.sections[i].hasOwnProperty("components"))
                        $scope.chapter.sections[i].components = [];
                    $scope.chapter.sections[i].components.push({});
                    $scope.$emit("prepareFields");
                };
                $scope.move = function(by,arr,pos,e){
                    e.preventDefault();
                    e.stopPropagation();
                    $timeout(function(){
                        var mid = arr[pos+by];
                        arr[pos+by] = arr[pos];
                        arr[pos] = mid;
                        $scope.$emit("prepareFields");
                    },0);
                    
                    
                };
                $scope.deleteSection = function(i){
                    $scope.chapter.sections.splice(i,1);
                    $scope.selected=null;
                };
                $scope.setComponentSelected = function(i,j){
                    var st = j.toString()+i.toString();
                    $scope.componentSelected === st ? $scope.componentSelected=null : $scope.componentSelected = st;
                };
                $scope.deleteComponent = function(i,j){
                    $scope.chapter.sections[j].components.splice(i,1);
                    $scope.componentSelected=null;
                }
            }
        }
    }]);
};
