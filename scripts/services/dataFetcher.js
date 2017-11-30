application.factory("dataFetcher",function($resource){
    "use strict";
    var resource = $resource("/data/:source",{source:"@source"},{});

    return{
        get: function(){


            return resource.query({source:"students"});

        }

    }
});