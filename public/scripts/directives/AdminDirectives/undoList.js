module.exports = function(application){
    "use strict";
    application.directive("undoList",["$compile","$timeout",function($compile,$timeout){
        return {
            restrict: 'E',
            template: require("../../../templates/admin/undo-list.html"),
            link: function(scope,elem,attrs){
                
                scope.$watch("undoMode",function(newV){
                    if (newV){
                        $timeout(function(){
                            let ele = $(elem).find('.undo-panel');
                            ele[0].scrollTop = 0;
                        },0);
                    }
                });
                scope.$watchCollection("undoItems",function(newC,oldC){
                    if (newC.length > oldC.length){
                        let titleContent = ``;
                        for (let i=0;i<newC[0].title.length;i++){
                            titleContent+=`<p><span class="text-dark font-weight-bold">${newC[0].title[i][0]}:</span> ${newC[0].title[i][1]}</p>`;
                        }
                        let listItem = $(elem).find('.undo-list-item').first();
                        let title = $(listItem).find('.undo-list-item-title').first();
                        let icon = $(elem).find('.undo-item-icon span').first();
                        let sum = $(listItem).find('.undo-item-summary').first();
                        switch (newC[0].event){
                            case 'move':
                                icon.addClass('fa-exchange');
                                listItem.addClass('move');
                                break;
                            case 'delete':
                                icon.addClass('fa-trash');
                                listItem.addClass('delete');
                                break;
                            case 'add':
                                icon.addClass('fa-plus');
                                listItem.addClass('add');
                                break;
                               
                            default:
                                break;
                        }
                        title.html(titleContent);
                        sum.html(newC[0].summary);
                    }
        
                });
                $(elem).on("click",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                   
                });
            },
            controller: ["$scope",function($scope){
                console.log($scope.undoMode);
            }]
        }
    }]);
};