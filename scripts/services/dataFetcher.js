application.factory("dataFetcher",function($resource){
    "use strict";
    var resource = $resource("/data/:source",{source:"@source"},{});

    return{
        get: function(group){


            return resource.query({source:group});

        }

    }
});