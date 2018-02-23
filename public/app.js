var application = angular.module("MyApp",["ngRoute","ngResource","ngAnimate","duScroll","ui.bootstrap"])
    .run(function($anchorScroll){
        "use strict";
        $anchorScroll.yOffset = 90;
    });
application.config(["$routeProvider","$locationProvider",
    function ($routeProvider,$locationProvider) {
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
        .when("/:group/search",{
            templateUrl: "templates/searchResults.html",
            controller: "searchController",
            resolve: {
                query: function($location){
                    "use strict";
                    return $location.search();
                },
                dataBlock: function(navigate,dataFetcher,$route){
                    if (!navigate.getData() || navigate.getGroup()!=$route.current.params.group){
                        return dataFetcher.get($route.current.params.group).$promise.then(
                            function(res){
                                navigate.setData(res,$route.current.params.group);
                                return res;
                            }
                        )
                    }
                    return navigate.getData();
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
}]);
require('./scripts/directives/textParagraph')(application);
require('./scripts/controllers/admin/AdminInterfaceController')(application);
require('./scripts/controllers/AdminController')(application);
require('./scripts/controllers/ArrayDeleteModalCtrl')(application);
require('./scripts/controllers/ContentRedirecter')(application);
//require('./scripts/controllers/IntroductionCtrl')(application);
require('./scripts/controllers/MainContentCtrl')(application);
require('./scripts/controllers/MainMenuController')(application);
require('./scripts/controllers/searchController')(application);
require('./scripts/controllers/TestCtrl')(application);
require('./scripts/services/dataFetcher')(application);
require('./scripts/services/navigate')(application);
require('./scripts/filters/capitalize')(application);
require('./scripts/filters/noSpaces')(application);
require('./scripts/filters/singular')(application);
require('./scripts/directives/AdminDirectives/chapterSummaryAdmin')(application);
require('./scripts/directives/AdminDirectives/navMenuAdmin')(application);
require('./scripts/directives/FormDirectives/linkPdf')(application);
require('./scripts/directives/FormDirectives/linkReference')(application);
require('./scripts/directives/FormDirectives/linkTelephoneForm')(application);
require('./scripts/directives/FormDirectives/linkWebsite')(application);
require('./scripts/directives/FormDirectives/listTextForm')(application);
require('./scripts/directives/FormDirectives/textMythFactForm')(application);
require('./scripts/directives/FormDirectives/textQuote')(application);
require('./scripts/directives/appForm')(application);
require('./scripts/directives/chapterSummary')(application);
require('./scripts/directives/fontSizeSelector')(application);
require('./scripts/directives/ifsEditable')(application);
require('./scripts/directives/ifsExtendable')(application);
require('./scripts/directives/ifsVideo')(application);
require('./scripts/directives/linkEmail')(application);
require('./scripts/directives/linkTelephone')(application);
require('./scripts/directives/listText')(application);
require('./scripts/directives/navMenu')(application);
require('./scripts/directives/quizCarousel')(application);
require('./scripts/directives/textQuote')(application);
require('./scripts/directives/themeSelector')(application);
require('./scripts/directives/thoughtBubble')(application);
require('./scripts/directives/topBar')(application);
require('./scripts/directives/videoCarousel')(application);
