application.filter("nospaces", function(){
    "use strict";
    return function(input){
        if (input)
            return input.replace(/\s/g,"");
    }
});