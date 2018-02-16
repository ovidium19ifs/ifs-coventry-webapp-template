application.directive("navMenuAdmin",function(){
    "use strict";
    return{
        templateUrl: "templates/admin/navMenuAdmin.html",
        scope: {
            data: "=repo"
        },
        restrict: "E",
        link: function(scope,elem){},
        controller: function($scope,$uibModal){
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

            $scope.selectChapter = function(bl_index,ch_index,evt){
                evt.preventDefault();
                evt.stopPropagation();
                $scope.selected = $scope.data[bl_index].name;
                $scope.chSelected = $scope.data[bl_index].name+"-"+$scope.data[bl_index].chapters[ch_index].name;
                $scope.$emit("ChangeChapter",bl_index,ch_index);
            };

            $scope.$on("move",function(e,args){
                var dir = args.direction;
                if (dir==="up"){
                    var dif=-1;
                }
                else{
                    var dif=1;
                }
               e.preventDefault();
               e.stopPropagation();
               var ind = args.index;
               if (args.hasOwnProperty("index") && typeof args.index === "undefined") return;
               if (args.message==="section"){
                   var tempObj = $scope.data[ind];
                   $scope.data[ind] = $scope.data[ind+dif];
                   $scope.data[ind+dif] = tempObj;
               }
               else if(args.message==="chapter"){
                   var ref = $scope.data[args.parentIndex];
                   var tempObj = ref.chapters[ind];
                   ref.chapters[ind] =ref.chapters[ind+dif];
                   ref.chapters[ind+dif] = tempObj;
               }
            });
            $scope.$on("deleteFromArray",function(e,args){
                e.preventDefault();
                e.stopPropagation();
                if (!$uibModal) return;
                console.log(args);
                var modalInstance = $uibModal.open({
                    templateUrl: "templates/modal/arrayDeleteModal.html",
                    controller: "ArrayDeleteModalCtrl",
                    animation: false,
                    windowClass: "my-modal",
                    backdrop: 'static',
                    resolve: {
                       item: function(){
                           return {
                               block: $scope.data[0].block,
                               section: args.parentIndex!==undefined ? $scope.data[args.parentIndex].name : $scope.data[args.index].name,
                               chapter: args.parentIndex!==undefined ? $scope.data[args.parentIndex].chapters[args.index].name : ""
                           }
                       }
                    }
                });
                modalInstance.result.then(function(res){
                    console.log(res);
                    console.log("exit modal");
                    if (args.message==="section")
                        $scope.data.splice(args.index,1);
                    else if (args.message==="chapter"){
                        if ($scope.data[args.parentIndex].chapters.length < 2){
                            alert("You must have at least 1 section");
                            return;
                        }
                        $scope.data[args.parentIndex].chapters.splice(args.index,1);
                    }
                    $scope.$emit("ChangeChapter");
                },function(reason){
                    console.log(reason);
                });

            });
            $scope.addSection = function(){
                console.log("Adding section");
                var newSection = templateMaker.makeSection();
                $scope.data.push(newSection);
            };
            $scope.addChapter = function(i){
                console.log("Adding chapter at section " + i);
                var newChapter = templateMaker.makeChapter(i);
                $scope.data[i].chapters.push(newChapter);
            }

        }
    }
});