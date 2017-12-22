application.directive("fontSizeSelector",function(){
    "use strict";
    return{
        restrict: "E",
        scope: {

        },
        templateUrl: "templates/fontSelector.html",
        link: function(scope,elem,attrs){
            var buttons = $(elem).find(".btn");
            var html = $("html");
            buttons.on("click",function(e){
                e.stopPropagation();
                e.preventDefault();
                var text = $(e.currentTarget).find(".font-sizer").text();
                var val  = Number(html.css("font-size").substring(0,2));

                if (text==="+" && val<25){
                    val++;
                    html.css("font-size",""+(val)+"px");
                    if (val>18){
                        buttons.css("width","+=2");
                    }
                }
                else if (text==="-" && val>10){
                    html.css("font-size",""+(val-1)+"px");
                    if (val>18){
                        buttons.css("width","-=2");
                    }
                }

            })
        },
        controller: function($scope){

        }
    }
});