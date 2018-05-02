module.exports = function(app){
    app.directive("mediaDescriptionAdmin",[function(){
        return{
            restrict: 'E',
            template: require("../../../../templates/admin/components/mediaDescription.html"),
            link: function(scope,elem,attrs,ctrl){
            
            },
            controller: function(){
            
            }
        }
    }])
};