application.controller("MainMenuController",function($scope,$location){
    "use strict";
    $scope.selectGroup = function(group){
        $location.path("/content/"+group+"/");
    };
    $scope.videoComp = {
        "type": "video-single",
        "subtitle": "The Successful Placement App Introduction",
        "video":{
          "type": "helix",
          "src": "https://media.coventry.ac.uk/player?autostart=n&fullscreen=n&width=0&height=0&videoId=21122&quality=hi&captions=n&chapterId=0",
          "thumb": "successful_placement.jpg"
        }
    };
    var animation = bodymovin.loadAnimation({
        container: document.getElementById("bm"),
        loop: true,
        renderer: 'svg',
        autoplay: true,
        path: 'logo.json'
    });
    var body = angular.element(document.getElementById("mainContent"));
    var portion_one = angular.element(document.getElementsByClassName("home-container"));
    var bm = angular.element(document.getElementById("bm"));
   
});