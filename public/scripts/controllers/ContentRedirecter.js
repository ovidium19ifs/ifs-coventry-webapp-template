application.controller("ContentRedirecter",function($scope,dataBlock,$location){
    "use strict";
    var base = $location.path();
    $location.path(base+"\/blocks\/"+ dataBlock[0].name).replace(); // .replace() simply prevents this location from being registered in the browser history
});