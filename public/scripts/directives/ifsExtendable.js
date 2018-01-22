application.directive("ifsExtendable",function($timeout,$parse){
    "use strict";
    return{
        restrict: "A",

        link: function (scope,elem,attrs,ctrl,transcludeFn) {
            $timeout(function(){
                console.log(attrs);
                elem.append("" +
                    "<li class='"+attrs.ifsClass+"'>" +
                    "<button class='btn btn-success'><span class='fa fa-plus mr-3' ng-click='addElem()'></span>Press Me</button></li>");
                console.log(scope.data[0]);
                $(elem).find("button").on("click",function(e){
                   var fn = $parse(attrs["ifsPush"]);
                   scope.$apply(function(){
                       fn(scope);
                   });

                });
            },0);
        }
    }
});