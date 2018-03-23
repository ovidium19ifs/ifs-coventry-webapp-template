module.exports = function(application){
    "use strict";
    application.directive('collapsibleCard',[function(){
        return{
            restrict:'A',
            link: function(scope,elem,attrs,ctrl){
                let header = $(elem).find('.card-header');
                let sign = $(header).find('span');
                let body = $(elem).find('.card-body');
                header.click(function(e){
                   body.toggleClass('collapse');
                    if (body.hasClass('collapse')){
                        sign.removeClass('fa-minus');
                        sign.addClass('fa-arrow-down');
                    }
                    else{
                        sign.removeClass('fa-arrow-down');
                        sign.addClass('fa-minus');
                    }
                });
            }
        }
    }])
};