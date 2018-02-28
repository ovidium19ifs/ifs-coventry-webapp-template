module.exports = function(application){
    "use strict";
    application.directive("matchText",function(){
        return{
            restrict: 'E',
            scope:{
              match: "="
            },
            template: require("../../templates/matchText.html"),
            link: function(scope,elem,attr){
                var offset = 0;
                scope.match.indices.forEach(function(ind){
                   let sub = scope.match.value.substr(ind[0]+offset,ind[1]-ind[0]+1);
                   scope.match.value = scope.match.value.replace(sub,"<span class='' style='color:green'>"+sub+"</span>");
                   offset = offset+42;
                   console.log(scope.match.value);
                });
                $(elem).find("p").html(scope.match.value);
            }
        }
    });
};