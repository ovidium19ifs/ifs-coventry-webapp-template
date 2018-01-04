var application = angular.module("MyApp",["ngRoute","ngResource","ngAnimate","duScroll"])
    .run(function($anchorScroll){
        "use strict";
        $anchorScroll.yOffset = 90;
    });
application.config(function ($routeProvider,$locationProvider) {
    $routeProvider.when("/content/:group/blocks/:blockname/chapter/:chaptername",{
        templateUrl: "templates/newContent.html",
        controller: "MainContentCtrl",
        resolve: {
            dataBlock: function(navigate,dataFetcher,$route,$location){
                if (!navigate.getData() || navigate.getGroup()!=$route.current.params.group){
                    return dataFetcher.get($route.current.params.group).$promise.then(
                        function(res){
                            navigate.setData(res,$route.current.params.group);
                            return res;
                        }
                    )
                }
            }
        }
    })
        .when("/content/:group/blocks/:blockname",{
            templateUrl: "templates/blockIntroduction.html",
            controller: "IntroductionCtrl",
            resolve: {
                dataBlock: function(navigate,dataFetcher,$route){
                    "use strict";
                    if (!navigate.getData() || navigate.getGroup()!=$route.current.params.group){
                        return dataFetcher.get($route.current.params.group).$promise.then(
                            function(res){
                                navigate.setData(res,$route.current.params.group);
                                return res;
                            }
                        )
                    }
                }
            }
        })
        .when("/content/:group",{
            template: "",
            controller: "ContentRedirecter",
            resolve:{
                dataBlock: function(navigate,dataFetcher,$route){
                    "use strict";
                    if (!navigate.getData() || navigate.getGroup()!==$route.current.params.group){
                        return dataFetcher.get($route.current.params.group).$promise.then(
                            function(res){
                                navigate.setData(res,$route.current.params.group);
                                return res;
                            }
                        )
                    }
                    else return navigate.getData();
                }
            }
        })
        .when("/admin",{
            templateUrl: "templates/adminHome.html",
            controller: "AdminController",
            resolve:{
                dataBlock: function(){
                    "use strict";
                    return undefined;
                }
            }
        })
        .when("/admin/:group",{
            templateUrl: "templates/adminEditor.html",
            controller:"AdminController",
            resolve: {
                dataBlock: function(navigate,dataFetcher,$route){
                    "use strict";
                    if (!navigate.getData() || navigate.getGroup()!==$route.current.params.group){
                        return dataFetcher.get($route.current.params.group).$promise.then(
                            function(res){
                                navigate.setData(res,$route.current.params.group);
                                return res;
                            }
                        )
                    }
                    else return navigate.getData();
                }
            }
        })
        .when("/404",{
            templateUrl: "templates/404.html",

        })
        .when("/",{
            templateUrl : "templates/mainmenu.html",
            controller: "MainMenuController"
        })
        .otherwise({
        });
    $locationProvider.html5Mode(true);
});