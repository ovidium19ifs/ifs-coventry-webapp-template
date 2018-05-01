//front page controller
module.exports = function(application){
    "use strict";
    application.controller("MainMenuController",["$scope","$location","dataBlock",
        function($scope,$location,dataBlock){
                "use strict";
                //preload hover images
                 console.log("preloading images");
                 var students = new Image();
                 var educators = new Image();
                 var staff = new Image();
                 students.src = "/assets/css/images/StudentsOver.png";
                 educators.src = "/assets/css/images/EducatorsOver.png";
                 staff.src = "/assets/css/images/StaffOver.png";
                 //----------------------------------------
                $scope.selectGroup = function(group){
                    $location.url("/content/"+group+"/");
                };
                $scope.data = dataBlock[0];
                //always scroll top when accessing front page
                $("#mainContent").scrollTop(0);
                
                //because we have templates for most things, I arranged the front-page data in
                //the format needed to be processed correctly by my components
                $scope.videoComp =  {
                    "type": "video-single",
                    "video": {
                        "src": "https://www.youtube.com/embed/QTpNqgNIV3o",
                        "thumb": "https://img.youtube.com/vi/QTpNqgNIV3o/maxresdefault.jpg"
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
                
                //logo animation
                var animation = bodymovin.loadAnimation({
                    container: document.getElementById("bm"),
                    loop: true,
                    renderer: 'svg',
                    autoplay: true,
                    animationData: require('../../logo.json')
                });
                
                //quote-carousel in the front-page
                var carousel  = $(".carousel");
                carousel.carousel({
                    autoplay: true,
                    interval: 4500
                });
                
                //unused vars...will delete eventually still figuring if i need them
                var body = angular.element(document.getElementById("mainContent"));
                var portion_one = angular.element(document.getElementsByClassName("home-container"));
                var bm = angular.element(document.getElementById("bm"));
        
    }]);
};
