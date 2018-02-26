module.exports = function(application){
    "use strict";
    application.directive("themeSelector",function(){
        "use strict";
        return {
            restrict: 'E',
            template: require('../../templates/themeSelector.html'),
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
                    scope.$emit("changeFont",$(e.currentTarget).attr("data-theme"));
                    e.stopPropagation();
                    e.preventDefault();
                    var href = "assets/css/all-"+$(e.currentTarget).attr("data-theme")+".css";
                    toInsert.attr("href",href);
                    console.log(toInsert);
                    style = $("link[href*=assets]");
                    console.log(style);
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
};
