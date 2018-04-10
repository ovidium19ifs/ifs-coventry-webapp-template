module.exports = function(application){
    "use strict";
    application.controller("AdminInterfaceController",["$scope","dataBlock","$timeout","$uibModal","$filter","fileService","dataFetcher","$routeParams","$window","$location",function($scope,dataBlock,$timeout,$uibModal,$filter,fileService,dataFetcher,$routeParams,$window,$location){
        "use strict";
        function undoMove(args){
            move(args);
        }
        function undoDelete(args){
            switch (args.message){
                case 'Block':
                    $scope.data.splice(args.index,0,args.object);
                    break;
                case 'Chapter':
                    $scope.data[args.parentIndex].chapters.splice(args.index,0,args.object);
                    break;
                case 'Section':
                    args.chapter.sections.splice(args.index,0,args.object);
                    if ($scope.selChapter === args.chapter){
                        $scope.$broadcast("dataWasLoaded",$scope.selChapter.sections);
                    }
                    break;
                case 'Component':
                    args.section.components.splice(args.index,0,args.object);
                    break;
                default:
                    break;
            }
        }
        function undoAdd(args){
            if (args.message==='Block'){
                let deleted_elem =$scope.data.pop();
                return;
            }
            else if (args.message === 'Chapter'){
                let deleted_elem = $scope.data[args.index].chapters.pop();
                return;
            }
            else if (args.message === 'Section' || args.message=== 'Component'){
                let deleted_elem = args.chapter.pop();
            }
        }
        function undoEdit(args){
            console.log(args);
            switch (args.type){
                case 'Chapter':
                    args.element.name = args.prev.name;
                    break;
                case 'Component':
                case 'Section':
                    if (args.context[args.index].type === 'link-pdf'){
                        console.log("Undoing a link-pdf, gottac check for file references");
                        args.context[args.index].links.forEach(function(ctx){
                           if (ctx.link.startsWith('blob')){
                               fileService.remove(ctx);
                           }
                        });
                    }
                    args.context[args.index] = angular.copy(args.prev);
                    $scope.broadcast();
                    break;
                default:
                    break;
            }
        }
        function move(args,scroll){
            var dir = args.direction;
            if (dir==="up"){
                var dif=-1;
            }
            else{
                var dif=1;
            }
            if (scroll){
                let subtitle = args.array[args.index+dif].subtitle; //why
                var target = subtitle.replace(/\s/g,"").toLowerCase();
                $timeout(function(){
                    $scope.$broadcast("ifsPrepareScroll",[target]);
                },0);
            }
            var ind = args.index;
            
            if (args.hasOwnProperty("index") && typeof args.index === "undefined") return;
            let ref = args.array;
            let tempObj = ref[ind];
            ref[ind] = ref[ind+dif];
            ref[ind+dif] = tempObj;
        }
        
        var templateMaker = (function(){
            var newSectionsAdded = 0;
            var newChaptersAdded = 0;
            var newBlocksAdded = 0;
            function makeChapter (i) {
                return {
                    blockname: $scope.data[i].name,
                    name: "New Chapter "+ ++newChaptersAdded,
                    sections:[]
                }
            }
            function makeBlock(){
                return{
                    name: "New Block "+ ++newBlocksAdded,
                    chapters:[
                        {
                            "blockname": "New Block "+ newBlocksAdded,
                            "name": "Introduction",
                            "sections":[]
                        }
                    ]
                }
            }
            function makeSection(){
                return{
                    subtitle: "New Section " + ++newSectionsAdded,
                    "space_after": false,
                    components: []
                }
            }
            function makeComponent(){
                return{
                    type: 'text-paragraph'
                }
            }
            return{
                makeChapter: makeChapter,
                makeBlock: makeBlock,
                makeSection: makeSection,
                makeComponent
            }
        })();
        
        $scope.resolveUndo = function(index){
            for (let i=0;i<=index;i++){
                $scope.undoItems[i].callback.apply(this,$scope.undoItems[i].args);
            }
            $scope.undoItems.splice(0,index+1);
        };
        $scope.data = dataBlock;
        $scope.group = $routeParams.group;
        $scope.undoMode = false;
        $scope.undoItems = [
        ];
        $scope.registerUndo = function(type,args){
              console.log(type);
              let new_undo = {};
              if (type === 'Edit'){
                  let compType = args.type;
                  new_undo.event = 'edit';
                  new_undo.title = [["Block",$scope.selBlock.name],["Chapter",$scope.selChapter.name]];
                  new_undo.summary = `${compType} ${compType == 'Component' ? $filter('nicename')(args.title) : args.title} has been edited`;
                  new_undo.callback = undoEdit;
                  new_undo.args = [{
                      element : args.element,
                      context: args.context,
                      index: args.index,
                      prev: args.master,
                      type: compType
                  }
                  ];
              }
              $scope.undoItems.unshift(new_undo);
        };
        $scope.selBlock = dataBlock[0];
        if ($scope.selBlock && $scope.selBlock.hasOwnProperty('chapters')){
            $scope.selChapter = dataBlock[0].chapters[0];
        }
        
        $scope.broadcast = function(){
            $scope.$broadcast("dataWasLoaded",$scope.selChapter.sections);
        };
        $scope.$watchCollection(function(){return $scope.selChapter.sections;},function(newV,oldV){
            $scope.broadcast();
        });
        
        
        //angular.element is a jquery selector
        //send a message to the chapter summary(right-hand menu) that data has been loaded, so it can link subtitles to page elements
        var container = angular.element(document.getElementById("mainContent2"));
        
        $scope.addBlock = function(){
            console.log("Adding section");
            var newSection = templateMaker.makeBlock();
            if (!$uibModal) return;
            var modalInstance = $uibModal.open({
                template: require('../../../templates/modal/arrayAddModal.html'),
                controller: "ArrayAddModalCtrl",
                animation: false,
                windowClass: "my-modal modal-add",
                backdrop: 'static',
                resolve: {
                    item: function(){
                        return{
                            newSection,
                            message: 'Block'
                        }
                    }
                }
            });
            modalInstance.result.then(function(res){
                let new_undo = {};
                new_undo.event = 'add';
                new_undo.title = [["Block",newSection.name]];
                new_undo.summary = `Block has been added.`;
                new_undo.callback = undoAdd;
                new_undo.args = [{
                    message: 'Block'
                }];
                $scope.undoItems.unshift(new_undo);
                $scope.data.push(newSection);
            
            },function(reason){
                console.log(reason);
            });
        
        };
        $scope.addChapter = function(i) {
            console.log("Adding chapter at block " + i);
            var newChapter = templateMaker.makeChapter(i);
            let sectionName = $scope.data[i].name;
            if (!$uibModal) return;
            var modalInstance = $uibModal.open({
                template   : require('../../../templates/modal/arrayAddModal.html'),
                controller : "ArrayAddModalCtrl",
                animation  : false,
                windowClass: "my-modal modal-add",
                backdrop   : 'static',
                resolve    : {
                    item: function () {
                        return {
                            newChapter,
                            message: 'Chapter',
                            sectionName
                        }
                    }
                }
            });
            modalInstance.result.then(function (res) {
                let new_undo = {};
                new_undo.event = 'add';
                new_undo.title = [["Block",sectionName],["Chapter",newChapter.name]];
                new_undo.summary = `Chapter ${newChapter.name} has been added in block ${sectionName}`;
                new_undo.callback = undoAdd;
                new_undo.args = [{
                    message: 'Chapter',
                    index  : i
                }
                ];
                $scope.undoItems.unshift(new_undo);
                $scope.data[i].chapters.push(newChapter);
            }, function (reason) {
                console.log(reason);
            });
        };
        $scope.addSection = function(){
            var newSection = templateMaker.makeSection();
            if (!$uibModal) return;
            var modalInstance = $uibModal.open({
                template   : require('../../../templates/modal/arrayAddModal.html'),
                controller : "ArrayAddModalCtrl",
                animation  : false,
                windowClass: "my-modal modal-add",
                backdrop   : 'static',
                resolve    : {
                    item: function () {
                        return {
                            newSection,
                            message: 'Section'
                        }
                    }
                }
            });
            modalInstance.result.then(function (res) {
                let new_undo = {};
                new_undo.event = 'add';
                new_undo.title = [["Block",$scope.selBlock.name],["Chapter",$scope.selChapter.name],["Section",newSection.subtitle]];
                new_undo.summary = `Section ${newSection.subtitle} has been added`;
                new_undo.callback = undoAdd;
                new_undo.args = [{
                    message: 'Section',
                    chapter: $scope.selChapter.sections
                }
                ];
                $scope.undoItems.unshift(new_undo);
                $scope.selChapter.sections.push(newSection);
                $timeout(function(){
                    $scope.$broadcast("ifsPrepareScroll",[$filter('nospaces')(newSection.subtitle).toLowerCase()])
                },100);
            }, function (reason) {
                console.log(reason);
            });
        };
        $scope.addComponent = function(s){
            var newComponent = templateMaker.makeComponent();
            if (!$uibModal) return;
            var modalInstance = $uibModal.open({
                template   : require('../../../templates/modal/arrayAddComponentModal.html'),
                controller : "ArrayAddComponentModalCtrl",
                animation  : false,
                windowClass: "my-modal modal-add",
                backdrop   : 'static',
                resolve    : {
                    item: function () {
                        return {
                            newComponent,
                            message: 'Component'
                        }
                    }
                }
            });
            modalInstance.result.then(function (res) {
                let new_undo = {};
                new_undo.event = 'add';
                new_undo.title = [["Block",$scope.selBlock.name],["Chapter",$scope.selChapter.name],["Section",s.subtitle]];
                new_undo.summary = `Component of type  ${$filter('nicename')(newComponent.type)} has been added`;
                new_undo.callback = undoAdd;
                new_undo.args = [{
                    message: 'Component',
                    chapter: s.components
                }
                ];
                $scope.undoItems.unshift(new_undo);
                s.components.push(newComponent);
            }, function (reason) {
                console.log(reason);
            });
        };
        
        
        $scope.$on("move",function(e,args){
                e.preventDefault();
                console.log(args);
                let title;
                switch (args.message){
                    case 'Chapter':
                        title = [["Block",$scope.data[args.parentIndex].name],["Chapter",$scope.data[args.parentIndex].chapters[args.index].name]];
                        break;
                    case 'Block':
                        title = [["Block",$scope.data[args.index].name]];
                        break;
                    case 'Section':
                        title = [["Block",$scope.selBlock.name],["Chapter",$scope.selChapter.name],["Section",$scope.selChapter.sections[args.index].subtitle]];
                        break;
                    case 'Component':
                        title = [["Block",$scope.selBlock.name],["Chapter",$scope.selChapter.name],["Section",$scope.selChapter.sections[args.parentIndex].subtitle],
                            ["Type",$scope.selChapter.sections[args.parentIndex].components[args.index].type]];
                        break;
                    case 'Link':
                        move(args);
                        return;
                        break;
                    default:
                        break;
                }
                
                let summary = `${args.message} has been moved ${args.direction}wards.`;
                let new_args = args;
                if (args.direction==="up"){
                    new_args.direction="down";
                    new_args.index=args.index-1;
                }
                else{
                    new_args.direction="up";
                    new_args.index=args.index+1;
                }
                let new_undo = {
                    title,
                    summary,
                    event: 'move',
                    callback: undoMove,
                    args: [new_args]
                };
            
                move(args,args.message==='Section');
                $scope.undoItems.unshift(new_undo);
        });
        $scope.$on("ChangeChapter",function(e,bl_index,ch_index){
            e.preventDefault();
            e.stopPropagation();
            if (bl_index===undefined && ch_index===undefined) {
                $scope.selChapter = undefined;
                $scope.$broadcast("dataWasLoaded");
                return;
            }
            $scope.selBlock = dataBlock[bl_index];
            $scope.selChapter = dataBlock[bl_index].chapters[ch_index];
            $scope.index = ch_index;
            $scope.$broadcast("dataWasLoaded",$scope.selChapter.sections);
            container[0].scrollTop = 0;
        });
        $scope.$on("ifsPrepareScroll",function(e,args){
            e.preventDefault();
            var title = args[0];
            var elem = angular.element(document.getElementById(title));
            container.scrollToElement(elem,50,120);
        });
        $scope.$on("deleteFromArray",function(e,args){
            e.preventDefault();
            e.stopPropagation();
            console.log(args);
            let item = {};
            switch (args.message){
                case 'Block':
                    item.block = $scope.data[args.index].name;
                    break;
                case 'Chapter':
                    item.block = $scope.data[args.parentIndex].name;
                    item.chapter = $scope.data[args.parentIndex].chapters[args.index].name;
                    break;
                case 'Section':
                    item.block = $scope.selBlock.name;
                    item.chapter = $scope.selChapter.name;
                    item.section = $scope.selChapter.sections[args.index].subtitle;
                    break;
                case 'Component':
                    item.block = $scope.selBlock.name;
                    item.chapter = $scope.selChapter.name;
                    item.section = $scope.selChapter.sections[args.parentIndex].subtitle;
                    item.type = $scope.selChapter.sections[args.parentIndex].components[args.index].type;
                    
                    break;
                default:
                    break;
            }
            if (!$uibModal) return;
            var modalInstance = $uibModal.open({
                template: require('../../../templates/modal/arrayDeleteModal.html'),
                controller: "ArrayDeleteModalCtrl",
                animation: false,
                windowClass: "my-modal modal-delete",
                backdrop: 'static',
                resolve: {
                    item,
                }
            });
            modalInstance.result.then(function(res){
                let currentlySelected = false;
                let new_undo = {};
                new_undo.event = 'delete';
                new_undo.summary = `${args.message} has been deleted.`;
                if (args.message==="Block"){
                    if ($scope.selBlock === $scope.data[args.index]){
                        currentlySelected = true;
                    }
                    args.object = $scope.data[args.index];
                    new_undo.title = [["Block",args.object.name]];
                    $scope.data.splice(args.index,1);
                    
                }
                else if (args.message==="Chapter"){
                    if ($scope.data[args.parentIndex].chapters.length < 2){
                        alert("You must have at least 1 chapter");
                        return;
                    }
                    if ($scope.selChapter === $scope.data[args.parentIndex].chapters[args.index]){
                        currentlySelected = true;
                    }
                    args.object = $scope.data[args.parentIndex].chapters[args.index];
                    new_undo.title = [["Block",$scope.data[args.parentIndex].name],["Chapter",args.object.name]];
                    $scope.data[args.parentIndex].chapters.splice(args.index,1);
                }
                else if (args.message === 'Section'){
                    args.object = $scope.selChapter.sections[args.index];
                    args.chapter = $scope.selChapter;
                    new_undo.title = [["Block",$scope.selBlock.name],["Chapter",$scope.selChapter.name],["Section",$scope.selChapter.sections[args.index].subtitle]];
                    $scope.selChapter.sections.splice(args.index,1);
                    $scope.$broadcast("dataWasLoaded",$scope.selChapter.sections);
                }
                else if (args.message === 'Component'){
                    args.object = $scope.selChapter.sections[args.parentIndex].components[args.index];
                    args.section = $scope.selChapter.sections[args.parentIndex];
                    new_undo.title = [["Block",$scope.selBlock.name],["Chapter",$scope.selChapter.name],["Section",$scope.selChapter.sections[args.parentIndex].subtitle],
                        ["Type",args.object.type]];
                    $scope.selChapter.sections[args.parentIndex].components.splice(args.index,1);
                    
                }
                if (currentlySelected){
                    $scope.$emit("ChangeChapter");
                }
                new_undo.callback = undoDelete;
                new_undo.args = [args];
                $scope.undoItems.unshift(new_undo);
                
            },function(reason){
                console.log(reason);
            });
        
        });
        $scope.$on("addSection",function(e){
            $scope.addSection();
        });
        $scope.undoToggle = function(){
            $scope.undoMode = !$scope.undoMode;
        };
    
        $scope.saveChanges = function(){
            console.log($scope.data);
            console.log(`Saving data to ${$scope.group}`);
            fileService.post().then(function(res){
                console.log(res);
                dataFetcher.post($scope.group,$scope.data).$promise
                    .then(function(res){
                        let modalInstance = $uibModal.open({
                            template   : require('../../../templates/modal/arraySuccessModal.html'),
                            controller : "ArraySuccessModalCtrl",
                            animation  : false,
                            windowClass: "my-modal modal-add",
                            backdrop   : 'static',
                        });
                        modalInstance.result.then(function(res){
                            $location.url("/");
                        });
                    })
                    .catch(function(err){
                        console.log("Data not saved");
                        console.log(err);
                    });
                })
                .catch(function(err){
                    console.log("Data not saved (files)");
                    console.log(err);
                });
        };
    }]);
};
