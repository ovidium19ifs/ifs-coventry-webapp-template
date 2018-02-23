module.exports = function(application){
    "use strict";
    application.filter("capitalize", [function(){
        "use strict";
        return function(input){
            return input[0].toUpperCase()+input.slice(1);
        }
    }]);
};
