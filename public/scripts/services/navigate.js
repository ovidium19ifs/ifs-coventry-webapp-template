//this is a rly messy service however is was the first one created and I focused on working with it..
//it should definitely be changed, but that requires a lot of changes throughout the entire app
//maybe one day...

/*
    basically responsible for validating URLs, navigating the data, keeping track of data indexes and stores the data as well
 */
module.exports = function(application){
    "use strict";
    application.factory("navigate",["$location","$filter",
        function($location,$filter){
        "use strict";
        var data;
        var path="/";
        var group;
        var current_bl_index,current_ch_index;
        return{
            urlIsValid:function(routeParams){
                group=routeParams.group;
                console.log(routeParams);
                if (routeParams.hasOwnProperty("chaptername")) {
                    
                    
                    var bl_name = $filter('tospaces')(routeParams.blockname,"-");
                    var ch_name = $filter('tospaces')(routeParams.chaptername,"-");
                    current_bl_index = data.findIndex(function (elem) {
                        return elem.name === bl_name;
                    });
                    if (current_bl_index > -1)
                        current_ch_index = data[current_bl_index].chapters.findIndex(function (elem) {
                            return elem.name === ch_name;
                        });
                    return (!(current_bl_index === -1 || current_ch_index === -1));
                }
                else if(routeParams.hasOwnProperty("blockname")){
                    var bl_name=$filter('tospaces')(routeParams.blockname);
                    current_bl_index = data.findIndex(function (elem) {
                        return elem.name === bl_name;
                    });
                    current_ch_index=-1;
                    return current_bl_index!==-1;
                }
                else return false;
            },
            errorPage: function(){
                current_bl_index=-1;
                current_ch_index=-1;
                $location.url("/404");
            },
            setData: function(fullData,gr){
                data = fullData;
                group = gr;
                current_bl_index=0;
                current_ch_index=-1;
            },
            getData: function(){
                return data;
            },
            getGroup: function(){
                return group;
            },
            goTo : function(bl_name,ch_name){
                console.log("in navigate.goTo");
                console.log(bl_name);
                console.log(ch_name);
                if (ch_name){
                    $location.url("/content/"+group+"/blocks/"+bl_name+"/chapter/"+ch_name);
                    
                }
                else{
                    $location.url("/content/"+group+"/blocks/"+bl_name);
                }
                
            },
            lowEnd: function(){
                return (current_bl_index===0 && current_ch_index<=0) || ( current_bl_index===-1 && current_ch_index===-1)
            },
            highEnd: function(){
                return (current_bl_index===data.length-1 && current_ch_index===data[data.length-1].chapters.length-1) || (current_bl_index===-1)
            },
            goToNext: function(){
                var bl_name,ch_name;
                if (current_ch_index===-1){
                    
                    bl_name = data[current_bl_index].name;
                    ch_name = data[current_bl_index].chapters[current_ch_index+1].name;
                    $location.url("/content/"+group+"/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-"));
                    path="/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-");
                }
                else if (current_ch_index<data[current_bl_index].chapters.length-1){
                    
                    bl_name = data[current_bl_index].name;
                    ch_name = data[current_bl_index].chapters[current_ch_index+1].name;
                    $location.url("/content/"+group+"/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-"));
                    path="/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-");
                }
                else if (current_ch_index === data[current_bl_index].chapters.length-1){
                    bl_name = data[current_bl_index+1].name;
                    ch_name = data[current_bl_index+1].chapters[0].name;
                    $location.url("/content/"+group+"/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-"));
                    path="/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-");
                }
            },
            goToPrevious: function(){
                var bl_name,ch_name;
                if (current_ch_index>0){
                    current_ch_index--;
                    bl_name = data[current_bl_index].name;
                    ch_name = data[current_bl_index].chapters[current_ch_index].name;
                    $location.url("/content/"+group+"/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-"));
                }
                else{
                    current_bl_index--;
                    bl_name = data[current_bl_index].name;
                    current_ch_index = data[current_bl_index].chapters.length-1;
                    ch_name = data[current_bl_index].chapters[current_ch_index].name;
                    $location.url("/content/"+group+"/blocks/"+$filter('nospaces')(bl_name,"-")+"/chapter/"+$filter('nospaces')(ch_name,"-"));
                }
            },
            getDataBlock: function(name,chapter){
                if (current_ch_index>-1){
                    return [data[current_bl_index].chapters[current_ch_index],current_ch_index];
                }
                else{
                    return [data[current_bl_index],current_bl_index];
                }
            },
            getDataLength: function(){
                return data.length;
            },
            getBlockLength: function(){
                return data[current_bl_index].chapters.length;
            }
        }
    }]);
};
