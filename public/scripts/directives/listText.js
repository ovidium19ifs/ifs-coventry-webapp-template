module.exports = function(application){
    "use strict";
    application.directive("listText",["$timeout",function($timeout){
        "use strict";
        return {
            restrict: "E",
            scope: {
                element: "="
            },
            template: require('../../templates/components/list/text.html'),
            link: function(scope,elem,attr,ctrl){
                scope.applyLinks = function(){
                    $timeout(function(){
                        for (var i=0;i<scope.element['list_elements'].length;i++){
                            var item = scope.element['list_elements'][i];
                            if (item.links){
                                console.log(item.text);
                                console.log("This paragraph has links\n-------------------------------------------------------");
                                for (var j=0;j<item.links.length;j++){
                                    var applied = item.text.replace(item.links[j].portion,"<span class='fa fa-globe'></span><a href='"+item.links[j].href+"' class='list-link' target='_blank'>"+item.links[j].portion+"<\/a>");
                                    $(".learning-outcome:contains('"+item.links[j].portion+"')").html(applied);
                                }
                            }
                        }
                        
                    });
                };
                if (scope.element.hasOwnProperty("list-elements"))
                    scope.applyLinks();
                
            },
            controller: function($scope,$timeout){
            
            }
        }
    }]);
};
