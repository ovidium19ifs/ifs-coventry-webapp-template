var application = angular.module("MyApp",["ngRoute","ngResource","ngAnimate","duScroll","ui.bootstrap"])
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
            template: "",
            controller: "ContentRedirecter",
            resolve:{
                dataBlock: function(navigate,dataFetcher,$route){
                    "use strict";
                    // Delete this in production.
                    return dataFetcher.get($route.current.params.group).$promise.then(
                        function(res){
                            navigate.setData(res,$route.current.params.group);
                            return res;
                        }
                    );
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
        .when("/content/:group",{
            template: "",
            controller: "ContentRedirecter",
            resolve:{
                dataBlock: function(navigate,dataFetcher,$route){
                    "use strict";
                    // Delete this in production.
                    return dataFetcher.get($route.current.params.group).$promise.then(
                        function(res){
                            navigate.setData(res,$route.current.params.group);
                            return res;
                        }
                    );
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
                    // Delete this in production.
                    return dataFetcher.get($route.current.params.group).$promise.then(
                        function(res){
                            navigate.setData(res,$route.current.params.group);
                            return res;
                        }
                    );
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
        .when("/admini/:group",{
            templateUrl: "templates/admin/adminHome.html",
            controller: "AdminInterfaceController",
            resolve: {
                dataBlock: function(navigate,dataFetcher,$route){
                    "use strict";
                        return dataFetcher.get($route.current.params.group).$promise.then(
                            function(res){
                                return res;
                            }
                        )
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