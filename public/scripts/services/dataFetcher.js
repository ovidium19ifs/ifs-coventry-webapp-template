application.factory("dataFetcher",function($resource,$cacheFactory){
    "use strict";
    var resource = $resource("/data/:source",{source:"@source"},{
        'query': {method: 'GET',cache:false,isArray: true},
    });

    return{
        get: function(group){
            var cache = $cacheFactory.get('$http');
            
            return resource.query({source:group,cache:false});

        },
        post: function(group,data){
            return resource.save({source:group},data);
        }

    }
});