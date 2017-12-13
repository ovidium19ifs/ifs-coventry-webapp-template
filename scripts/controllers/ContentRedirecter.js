application.controller("ContentRedirecter",function($scope,dataBlock,$location){
    "use strict";
    console.log("Welcome to Content Redirecter" );
    var base = $location.path();
    console.log(base+"\/blocks\/"+ dataBlock[0].name);
    $location.path(base+"\/blocks\/"+ dataBlock[0].name).replace();
});