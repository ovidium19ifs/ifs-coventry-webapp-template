module.exports = function(application){
    "use strict";
    application.filter("singular", function(){
        "use strict";
        return function(input){
            return input.slice(0,input.length-1);
        }
    });
};

