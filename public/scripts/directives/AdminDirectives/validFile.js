module.exports = function(application){
  application.directive("validFile",[function(){
      return{
          restrict: 'A',
          require: 'ngModel',
          link: function(scope,elem,attrs,ctrl){
              if (attrs['validFile']){
                  console.log(attrs['validFile']);
                  var validate = new RegExp(attrs['validFile']);
              }
              if (attrs['maxSize']){
                  var max = Number(attrs['maxSize']);
              }
              
              elem.on('change', function() {
                  console.log("Element is changing");
                  console.log(elem);
                  ctrl.$setViewValue(elem[0].files[0]);
              });
              ctrl.$render = function(){
                  console.log(ctrl.viewValue);
                  return;
              };
              ctrl.$setViewValue();
              ctrl.$validators.validFile = function(modelValue, viewValue) {
                  if (ctrl.$isEmpty(modelValue)) {
                      // consider empty models to be valid
                      console.log("Currently Empty");
                      return true;
                  }
                  if (modelValue.size > max*1000)
                      return false;
                  else
                      return true;
              };
              ctrl.$validators.validType = function(modelValue,viewValue){
                if (ctrl.$isEmpty(modelValue)){
                    return true;
                }
                if (!validate)
                    return true;
                if (validate.test(modelValue.name)){
                    console.log("File is valid because it ends with " + modelValue.name);
                    return true;
                }
                else{
                    console.log("File is not valid because it ends with " + modelValue.name);
                    return false;
                }
              }
          }
      }
  }]);
};