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
            template: "<div>Index hello</div>"
        })
        .otherwise({
            redirectTo: ""
        });
    $locationProvider.html5Mode(true);
});