application.directive("themeSelector",function(){
    "use strict";
    return {
        restrict: 'E',
        templateUrl: "templates/themeSelector.html",
        scope: {

        },
        link: function(scope,elem,attrs){
            var style;
            var toInsert = $("<link>",{
                "rel": "stylesheet",
                "type": "text/css",
                "href": ""
            });
            toInsert.on("load",function(e){
                console.log("style loaded");
                style.remove();
            });
            $(elem).find("button[data-theme]").on("click",function(e){
                e.stopPropagation();
                e.preventDefault();
                var href = "css/all-"+$(e.currentTarget).attr("data-theme")+".css";
                toInsert.attr("href",href);
                style = $("link[href^=css]");
                if (style.length==1 && style.attr("href")!=href){
                    console.log("changing style now");
                    style.after(toInsert[0]);
                }

            })
        },
        controller: function($scope){

        }
    }
});