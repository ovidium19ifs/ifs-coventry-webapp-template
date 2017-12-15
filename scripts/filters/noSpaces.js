application.filter("nospaces", function(){
    "use strict";
    return function(input){
        return input.replace(/\s/g,"");
    }
});