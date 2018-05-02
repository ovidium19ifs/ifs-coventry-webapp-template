//this redirects to the first chapter of content in the url is:
    //  content/:group
    //  content/:group/blocks/:block
module.exports = function(application){
    "use strict";
    application.controller("ContentRedirecter",["$scope","dataBlock","$location","navigate","$routeParams","$filter",
        function($scope,dataBlock,$location,navigate,$routeParams,$filter){
        "use strict";
        var base = $location.path();
        if (base.includes("/blocks/")){
            
            var obj = dataBlock.find(function(elem){
                return elem.name === $routeParams.blockname;
            });
            $location.path(base+"\/chapter\/"+ $filter('nospaces')(obj.chapters[0].name,"-")).replace();
            
        }
        else{
            $location.path(base+"\/blocks\/"+ $filter('nospaces')(dataBlock[0].name,"-")+"\/chapter\/"+$filter('nospaces')(dataBlock[0].chapters[0].name,"-")).replace(); // .replace() simply prevents this location from being registered in the browser history
        }
        
    }]);
};
