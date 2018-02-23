module.exports = function(application){
    "use strict";
    application.controller("ContentRedirecter",["$scope","dataBlock","$location","navigate","$routeParams",
        function($scope,dataBlock,$location,navigate,$routeParams){
        "use strict";
        var base = $location.path();
        if (base.includes("/blocks/")){
            
            var obj = dataBlock.find(function(elem){
                return elem.name === $routeParams.blockname;
            });
            $location.path(base+"\/chapter\/"+ obj.chapters[0].name).replace();
            
        }
        else{
            $location.path(base+"\/blocks\/"+ dataBlock[0].name+"\/chapter\/"+dataBlock[0].chapters[0].name).replace(); // .replace() simply prevents this location from being registered in the browser history
        }
        
    }]);
};
