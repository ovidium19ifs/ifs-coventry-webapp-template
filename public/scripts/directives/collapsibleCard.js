module.exports = function(application){
    "use strict";
    application.directive('collapsibleCard',[function(){
        return{
            restrict:'A',
            link: function(scope,elem,attrs,ctrl){
                let header = $(elem).find('.card-header').first();
                let sign = $(header).find('span').first();
                let body = $(elem).find('.card-body').first();
                header.click(function(e){
                   body.toggleClass('collapse');
                    if (body.hasClass('collapse')){
                        sign.removeClass('fa-minus');
                        sign.addClass('fa-arrow-down');
                    }
                    else{
                        elem.siblings().find('.card-body').each(function(i,e){
                            let elem = $(e);
                            if (!elem.hasClass('collapse')){
                                elem.addClass('collapse');
                                let sign = elem.parent().find('.card-header').find('span');
                                sign.removeClass('fa-minus');
                                sign.addClass('fa-arrow-down');
                            }
                        });
                        sign.removeClass('fa-arrow-down');
                        sign.addClass('fa-minus');
                    }
                });
                scope.$on("invalid",function(e,args){
                    let invalids = $(body).find("input.ng-invalid,textarea.ng-invalid");
                    if (invalids.length>0){
                        if (body.hasClass('collapse')){
                            body.toggleClass('collapse');
                            sign.removeClass('fa-arrow-down');
                            sign.addClass('fa-minus');
                        }
                        
                    }
                    
                });
                header.click();
            }
        }
    }])
};