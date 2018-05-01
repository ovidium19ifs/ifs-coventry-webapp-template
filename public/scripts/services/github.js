module.exports = function(application){
  "use strict";
  application.factory("github",["$resource",function($resource){
    "use strict";
    //when we get data, we receive an array, therefore we have to specify isArray in the resource method definition
    var resource = $resource("/github",{
      'query': {method: 'GET', isArray:true},
      'get': {method: 'GET',params: {connection:false}}
    });
    var resource_auth = $resource("/github/auth",{
      'get' : {method: 'GET'}
    });
    var resource_local = $resource("/auth",{
      'post': {method: 'POST'}
    });
    var authenticated = false;
    
    return{
      get: function(conn){
        
        return resource.get({connection: conn});
      },
      getConnectionUrl: function(){
        return resource.get({connection: true})
      },
      post: function(){
        return resource_auth.get();
      },
      authLocal: function(form){
        return resource_local.save(null,form);
      },
      authenticated: authenticated
    }
  }]);
};
