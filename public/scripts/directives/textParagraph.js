module.exports = function(application){
    "use strict";
    application.directive("textParagraph",["$timeout",function($timeout){
        "use strict";
        return {
            restrict: "E",
            scope:{
                component: "="
            },
            template: require('../../templates/components/text/paragraph.html'),
            link: function(scope,elem){
                $timeout(function(){
                    if (scope.component.hasOwnProperty("links")){
                        let final = scope.component.text;
                        for (var i=0;i<scope.component["links"].length;i++) {
                            console.log("in paragraph");
                            if (scope.component["links"][i].portion.length < 3) continue;
                            var reg = new RegExp(scope.component["links"][i].portion, "gi");
                            final=final.replace(reg, `<span class="fa fa-globe"></span><a class="website-link" target="_blank" href="${scope.component["links"][i].href}">${scope.component["links"][i].portion}</a>`);
                        }
                        $(elem).find("p").html(final);
                    }
                    
                },0);
    
            }
        }
    }]);
};
