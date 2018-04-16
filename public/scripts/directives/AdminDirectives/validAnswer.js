module.exports = function(application){
    application.directive("validAnswer",[function(){
        return{
            restrict: 'A',
            require: 'ngModel',
            link: function(scope,elem,attrs,ctrl){
                
                ctrl.$validators.validAnswer = function(modelValue,viewValue){
                    let ans=scope.item.answers;
                    let reg=`\\b${modelValue}\\b`;
                    let re = new RegExp(reg,"g");
                    console.log(re);
                    if (re.test(ans)){
                        
                        return true;
                    }
                    else{
                        console.log(ans);
                        return false;
                    }
                }
            }
        }
    }]);
};