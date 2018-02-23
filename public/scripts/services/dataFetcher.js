module.exports = function(application){
    "use strict";
    application.factory("dataFetcher",["$resource","$cacheFactory",function($resource,$cacheFactory){
        "use strict";
        var resource = $resource("/data/:source",{source:"@source"},{
            'query': {method: 'GET',cache:true,isArray: true},
        });
        return{
            get: function(group){
                var cache = $cacheFactory.get('$http');
                return resource.query({source:group,cache:true});
            },
            post: function(group,data){
                return resource.save({source:group},data);
            }
        }
    }]);
};
