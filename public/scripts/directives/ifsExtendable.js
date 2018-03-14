module.exports = function(application){
    "use strict";
    application.directive("ifsExtendable",["$compile","$timeout","$parse",
        function($compile,$timeout,$parse){
        "use strict";
        return {
            restrict: "A",
            
            link: function(scope,elem,attrs,ctrl){
                var fn = $parse(attrs['ifsExtendableCallback']);
                var classes = attrs['classes'] || "";
                var title = attrs['ifsExtendableTitle'];
                var content = angular.element(`<li class="${classes}">
                        <button class="btn btn-success w-100 btn-sm"">
                            <span class="fa fa-plus-circle fa-fw text-white float-left"></span>
                            <span> ${title}</span>
                        </button>
                    </li>`);
                var content = $compile(content)(scope);
                $timeout(function(){
                    elem.append(content);
                    $(content).on("click",function(){
                        console.log("clicked");
                        scope.$apply(function(){
                            fn(scope);
                        }) ;
                    });
                },0);
            },
            controller: function($scope){
            
            }
        }
    }]);
};
