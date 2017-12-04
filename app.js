var application = angular.module("MyApp",["ngRoute","ngResource","ngAnimate"]);
application.config(function ($routeProvider,$locationProvider) {
    $routeProvider.when("/blocks/:blockname/chapter/:chaptername",{
        templateUrl: "templates/newContent.html",
        controller: "MainContentCtrl"
    })
        .when("/blocks/:blockname",{
            templateUrl: "templates/blockIntroduction.html",
            controller: "IntroductionCtrl"
        })
        .when("/404",{
            templateUrl: "templates/404.html",

        })
        .when("/",{
            redirectTo: "/blocks/Disclosure"
        })
        .otherwise({
            redirectTo: "/404"
        });
    $locationProvider.html5Mode(true);
});