module.exports = function(application){
    "use strict";
    application.filter("nospaces", function(){
        "use strict";
        return function(input,sign){
            var replacer = sign || "";
            if (input)
                return input.replace(/\s/g,replacer);
        }
    });
    application.filter("tospaces",function(){
        "use strict";
        return function(input,sign){
            var reg = new RegExp(sign,"gi");
            if (input)
                return input.replace(reg," ");
        }
    });
};

