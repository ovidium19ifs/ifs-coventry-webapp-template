module.exports = function(application){
    "use strict";
    application.directive("navMenuAdmin",function(){
        "use strict";
        return{
            template: require('../../../templates/admin/navMenuAdmin.html'),
            restrict: "E",
            link: function(scope,elem){},
            controller: ["$scope",function($scope){
                var templateMaker = (function(){
                    var newSectionsAdded = 0;
                    var newChaptersAdded = 0;
                    function makeChapter (i) {
                        return {
                            blockname: $scope.data[i].name,
                            name: "New Chapter "+ ++newChaptersAdded,
                            sections:[]
                        }
                    }
                    function makeSection(){
                        return{
                            name: "New Section "+ ++newSectionsAdded,
                            chapters:[
                                {
                                    "blockname": "New Section "+ newSectionsAdded,
                                    "name": "Introduction",
                                    "sections":[]
                                }
                            ]
                        }
                    }
                    return{
                        makeChapter: makeChapter,
                        makeSection: makeSection
                    }
                })();
                
                $scope.selected = $scope.data[0].name;
                $scope.chSelected = $scope.data[0].name+"-"+$scope.data[0].chapters[0].name;
                
                $scope.select = function(bl_index,evt){
                    evt.preventDefault();
                    evt.stopPropagation();
                    $scope.selected = $scope.data[bl_index].name;
                    $scope.chSelected = $scope.data[bl_index].name+"-"+$scope.data[bl_index].chapters[0].name;
                    $scope.$emit("ChangeChapter",bl_index,0);
                };
                
                $scope.selectChapter = function(bl_index,ch_index,evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $scope.selected = $scope.data[bl_index].name;
                    $scope.chSelected = $scope.data[bl_index].name + "-" + $scope.data[bl_index].chapters[ch_index].name;
                    $scope.$emit("ChangeChapter", bl_index, ch_index);
                };
                
                $scope.$on("move",function(e,args){
                    
                    var dir = args.direction;
                    if (dir==="up"){
                        var dif=-1;
                    }
                    else{
                        var dif=1;
                    }
                    
                    var ind = args.index;
                    if (args.hasOwnProperty("index") && typeof args.index === "undefined") return;
                    if (args.message==="Block"){
                        var tempObj = $scope.data[ind];
                        $scope.data[ind] = $scope.data[ind+dif];
                        $scope.data[ind+dif] = tempObj;
                    }
                    else if(args.message==="Chapter"){
                        var ref = $scope.data[args.parentIndex];
                        var tempObj = ref.chapters[ind];
                        ref.chapters[ind] =ref.chapters[ind+dif];
                        ref.chapters[ind+dif] = tempObj;
                    }
                });
                
                
                
                
            }]
        }
    });
};
