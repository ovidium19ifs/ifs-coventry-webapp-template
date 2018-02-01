application.directive("textParagraph",function($timeout){
    "use strict";
    return {
        restrict: "E",
        scope:{
            component: "="
        },
        templateUrl: "templates/components/text/paragraph.html",
        link: function(scope,elem){
            $timeout(function(){
                console.log(scope.component.text);
                if (scope.component.hasOwnProperty("links")){
                    for (var i=0;i<scope.component["links"].length;i++) {
                        console.log(scope.component.links[i]);
                        var reg = new RegExp("commit", "gi");
                        console.log(`<a href="${scope.component.links[i].href}">${scope.component.links[i].portion}</a>`);
                        scope.component.text.replace(reg,`<a href="${scope.component.links[i].href}">${scope.component.links[i].portion}</a>`);
                    }
                    console.log(scope.component.text);
                }
            },0);
        }
    }
});