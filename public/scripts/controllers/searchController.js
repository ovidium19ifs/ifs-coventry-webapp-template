application.controller("searchController",function($scope,query,navigate,$routeParams,$window,dataBlock, $filter,$location){
    "use strict";
    $scope.group = $routeParams.group;
    $scope.data = dataBlock;
    $scope.query = query.query;
    $scope.resultCount = 0;
    $scope.blocks = [];
    var mainWindow = angular.element(document.getElementById("mainContent"));
    var matchTracker;
    mainWindow.scrollTop(0);
    $scope.goBack = function(){
        $window.history.back();
    };
    $scope.scrollTop = function(){
        mainWindow.scrollTop(0);
    };
    $scope.scrollTo = function(name){
        let title = $filter('nospaces')(name);
        let elem = angular.element(document.getElementById(title.toLowerCase()));
        mainWindow.scrollToElement(elem,50,120);
    };
    $scope.goTo = function(block,match,ref){
       let reference = $filter('nospaces')(ref).toLowerCase();
       let block_format = $filter('nospaces')(block,"-");
       let match_format = $filter('nospaces')(match,"-");
       $location.url("content/"+$scope.group+"/blocks/"+block_format+"/chapter/"+match_format+"#"+reference);
    };
    if($scope.data){
        $scope.results={
            sections:[],
            comps: [],
            externalLinks: [],
            documents: []
        };
        var options = {
            keys:[
                "subtitle",
                "components.text",
                "components.list_elements.text",
                "components.links.text",
                "components.subtitle"
            ],
            threshold: $scope.query.length > 8 ? 0.5 : $scope.query.length > 5 ? 0.34 : 0.15,
            minMatchCharLength: query.query.length-2,
            includeMatches: true,
            includeScore: true
        };
        matchTracker = [];
        $scope.data.forEach(function(block){
            block.chapters.forEach(function(chapter){
                var fuse = new Fuse(chapter.sections,options);
                let res= fuse.search(query.query);
                if (res.length>0){
                    for (var i=0;i<res.length;i++){
                        res[i].matches.forEach(function(match){
                            if (!matchTracker.includes(match.value.trim())){
                                switch (match.key) {
                                    case "subtitle":
                                        $scope.resultCount++;
                                        if (!$scope.blocks.some(function(elem){
                                                if (elem.name===block.name) {
                                                    elem.count++;
                                                    elem.matches.sections.push({
                                                        ref: res[i].item.subtitle,
                                                        search : match,
                                                        block  : block.name,
                                                        chapter: chapter.name,
                                                        score: res[i].score
                                                    });
                                                    return true;
                                                }
                                                return false;
                                            })){
                                            $scope.blocks.push({
                                                name: block.name,
                                                count:1,
                                                matches:{
                                                    sections:[{
                                                        ref: res[i].item.subtitle,
                                                        search : match,
                                                        block  : block.name,
                                                        chapter: chapter.name,
                                                        score: res[i].score
                                                    }],
                                                    components: [],
                                                    "external links": [],
                                                    documents: []
                                                }
                                            });
                                        }
                                        break;
                                    case "components.text":
                                    case "components.list_elements.text":
                                    case "components.subtitle":
                                    case "components.links.text":
                                        $scope.resultCount++;
                                        if (!$scope.blocks.some(function(elem){
                                                if (elem.name===block.name) {
                                                    elem.count++;
                                                    elem.matches.components.push({
                                                        ref: res[i].item.subtitle,
                                                        key: match.key,
                                                        search: match,
                                                        block  : block.name,
                                                        chapter: chapter.name,
                                                        score: res[i].score
                                                    });
                                                    return true;
                                                }
                                                return false;
                                            })){
                                            $scope.blocks.push({
                                                name: block.name,
                                                count:1,
                                                matches:{
                                                    sections:[],
                                                    components: [{
                                                        ref: res[i].item.subtitle,
                                                        key: match.key,
                                                        search: match,
                                                        block  : block.name,
                                                        chapter: chapter.name,
                                                        score: res[i].score
                                                    }],
                                                    "external links": [],
                                                    documents: []
                                                }
                                            });
                                        }
                                        break;
                                }
                                matchTracker.push(match.value.trim());
                            }
                        });
                    }
                }
            });
        });
    }
});