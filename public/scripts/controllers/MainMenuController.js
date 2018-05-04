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
