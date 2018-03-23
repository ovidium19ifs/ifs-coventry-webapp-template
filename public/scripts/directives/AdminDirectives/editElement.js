module.exports = function(application){
    "use strict";
    application.directive("editElement",["$parse","$uibModal",function($parse,$uibModal){
        return{
            restrict: 'E',
            template: require('../../../templates/admin/edit-element.html'),
            link: function(scope,elem,attrs){
                var element;
                var arr = $parse(attrs['contextArray'])(scope);
                var index = $parse(attrs['indexInContext'])(scope);
                var type = attrs['editType'];
                if (type === 'Chapter'){
                    scope.$watch('selChapter',function(newV,oldV){
                        element = newV;
                    });
                }
                else{
                    element = arr[index];
                    var chapter = scope[attrs['chapter']];
                    var section = $parse(attrs['section'])(scope);
                }
                $(elem).click(function(e){
                    if (!$uibModal) return;
                    let master = angular.copy(element);
                    let changed=false;
                    let init=0;
                    let watcher = scope.$watchCollection(function(){return element;},function(){
                        console.log("called");
                        if (init>0){
                            changed=true;
                            console.log(changed);
                            watcher();
                        }
                        init++;
                    });
                    var modalInstance = $uibModal.open({
                        template: require('../../../templates/modal/arrayEditModal.html'),
                        controller: "ArrayEditModalCtrl",
                        animation: false,
                        windowClass: "my-modal modal-edit",
                        backdrop: 'static',
                        resolve: {
                            item: function(){
                                return{
                                    element,
                                    chapter:  chapter ?  chapter.name : '',
                                    section:  section ?  section : undefined,
                                    type
                                }
                            }
                        }
                    });
                    modalInstance.result.then(function(res){
                        if (changed) {
                            if (type==='Section'){
                                console.log("Broadcasting");
                                scope.broadcast();
                            }
                            scope.registerUndo('Edit',{
                                type,
                                context: arr,
                                index,
                                element,
                                master,
                                title: type==='Component' ? master.type : type==='Section' ? master.subtitle : master.name
                            });
                        }
                        
        
                    },function(reason){
                        console.log(reason);
                        scope[attrs['component']] = angular.copy(master);
                        element = scope[attrs['component']];
                    });
                });
            },
            controller: ["$scope",function($scope){
            
            }]
        }
    }]);
};