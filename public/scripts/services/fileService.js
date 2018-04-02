module.exports = function(application){
    "use strict";
    application.factory("fileService",["$resource","$cacheFactory",function($resource,$cacheFactory){
        "use strict";
        //when we get data, we receive an array, therefore we have to specify isArray in the resource method definition
        var resource = $resource("/files/:folder",{folder:"@folder"},{
            'query': {method: 'GET',isArray: true},
        });
        return{
            get: function(group){
                return resource.query({folder:group});
            },
            post: function(data){
                return resource.save(data);
            }
        }
    }]);
};