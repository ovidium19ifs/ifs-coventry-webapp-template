application.controller("MainMenuController",function($scope,$location){
    "use strict";
    $scope.selectGroup = function(group){
        $location.path("/content/"+group+"/");
    };
    $("#mainContent").scrollTop(0);
    $scope.videoComp = {
        "type": "video-single",
        "subtitle": "The Successful Placement App Introduction",
        "video":{
          "type": "helix",
          "src": "https://media.coventry.ac.uk/player?autostart=n&fullscreen=n&width=0&height=0&videoId=21122&quality=hi&captions=n&chapterId=0",
          "thumb": "successful_placement.jpg"
        }
    };
    $scope.quoteComp = {
        "subtitle": "",
        "type": "text-quote",
        "text": "Student nurses value a welcoming workplace where staff and educators are happy to help and have a positive attitude to student presence on the wards",
        "author": "Doyle et al ",
        "year": "2017"
    };
    $scope.contactDetails = {
        "subtitle": "Contact Details",
        "components": [
            {
                "subtitle": "Telephone",
                "type": "link-telephone",
                "text": "+44 (0)24 7765 8029",
                "space_after": false
            },
            {
                "subtitle": "E-mails",
                "type": "link-email",
                "links": [
                    {
                        "tag": "Disability Team",
                        "text": "disabilityadvisor.ss@coventry.ac.uk",
                        "link": "mailto:disabilityadvisor.ss@coventry.ac.uk"
                    },
                    {
                        "tag": "Mental health Team",
                        "text": "counsell.ss@coventry.ac.uk",
                        "link": "mailto:counsell.ss@coventry.ac.uk"
                    }
                ],
                "space_after": false
            }
        ],
        "space_after": false
    };
   
    var animation = bodymovin.loadAnimation({
        container: document.getElementById("bm"),
        loop: true,
        renderer: 'svg',
        autoplay: true,
        path: 'logo.json'
    });
    var carousel  = $(".carousel");
    carousel.carousel({
        autoplay: true,
        interval: 4500
    });
    var body = angular.element(document.getElementById("mainContent"));
    var portion_one = angular.element(document.getElementsByClassName("home-container"));
    var bm = angular.element(document.getElementById("bm"));

});