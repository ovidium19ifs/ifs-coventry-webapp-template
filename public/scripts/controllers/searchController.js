/*
    searchController.js
    
    - Responds to URL : :group/search?query=:val
    - Responsible for presenting search data when a query is passed
    - query is received as ?query=val param
    - Uses Fuse.js for the fuzzy search algorithm.
    - Sorts matches by blocks
    - Sorts blocks by the most relevant match inside that block
    - searches the data from the group passed in the url
    
 */


module.exports = function(application){
    "use strict";
    application.controller("searchController",["$scope","query","navigate","$routeParams","dataBlock","$filter","$location",
        function($scope,query,navigate,$routeParams,dataBlock, $filter,$location){
        "use strict";
        $scope.group = $routeParams.group;
        $scope.data = dataBlock;
        $scope.query = query.query;
        $scope.resultCount = 0; //keeps track of number of matches
        $scope.blocks = [];
        var mainWindow = angular.element(document.getElementById("mainContent"));
        var matchTracker;
        mainWindow.scrollTop(0); //scroll top when navigating to this page with history
       
        $scope.scrollTop = function(){
            mainWindow.scrollTop(0);
        };
        //Search summary contain reference links to quickly scroll large search pages
        $scope.scrollTo = function(name){
            let title = $filter('nospaces')(name);
            let elem = angular.element(document.getElementById(title.toLowerCase()));
            mainWindow.scrollToElement(elem,50,120);
        };
        
        //building the URL to navigate to using the match results
        $scope.goTo = function(block,match,ref){
            let reference =  ref ? $filter('nospaces')(ref).toLowerCase() : undefined;
            let block_format = $filter('nospaces')(block,"-");
            let match_format = $filter('nospaces')(match,"-");
            if (reference)
                $location.url("content/"+$scope.group+"/blocks/"+block_format+"/chapter/"+match_format+"#"+reference);
            else
                $location.url("content/"+$scope.group+"/blocks/"+block_format+"/chapter/"+match_format);
        };
        if($scope.data && $scope.query){
            
            //split results into sections and components
            //components will be presented with a short paragraph to give some context where the match was found
            //sections will be presented as "These sections may be relevant to your search"
            //check Fuse.js documentation for how the search works and built
            var options = {
                keys:[
                    "subtitle",
                    "components.text",
                    "components.list_elements.text",
                    "components.links.text",
                    "components.subtitle",
                    "components.title",
                    "components.publisher",
                    "components.authors.name"
                ],
                threshold: $scope.query.length > 7 ? 0.2 : $scope.query.length > 5 ? 0.1 : 0.05,
                distance: 800,
                minMatchCharLength: query.query.length > 7 ? query.query.length-2 : query.query.length > 4 ? query.query.length-1 : query.query.length,
                sort:true,
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
                                        case "components.title":
                                        case "components.publisher":
                                        case "components.authors.name":
                                            $scope.resultCount++;
                                            if (!$scope.blocks.some(function(elem){
                                                    if (elem.name===block.name) {
                                                        elem.count++;
                                                        let rel = Math.round(100 - (res[i].score/0.2)*100);
                                                        elem.matches.components.push({
                                                            ref: res[i].item.subtitle || "",
                                                            key: match.key,
                                                            search: match,
                                                            block  : block.name,
                                                            chapter: chapter.name,
                                                            score: res[i].score,
                                                            relevance: rel
                                                        });
                                                        if (rel > elem.maxRelevance)
                                                                elem.maxRelevance = rel;
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
                                                            score: res[i].score,
                                                            relevance: Math.round(100 - (res[i].score/0.2)*100),
                                                            indices: match.indices
                                                        }],
                                                        "external links": [],
                                                        documents: []
                                                    },
                                                    maxRelevance: Math.round(100 - (res[i].score/0.2)*100)
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
            
            //sort blocks - highest relevance first
            $scope.blocks.sort(function(a,b){
                return b.maxRelevance - a.maxRelevance;
            });
        }
    }]);
};
