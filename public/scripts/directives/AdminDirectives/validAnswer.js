module.exports = function(application){
    application.directive("validAnswer",[function(){
        return{
            restrict: 'A',
            require: 'ngModel',
            link: function(scope,elem,attrs,ctrl){
                /*
                Explanation:
                    The answers of a questions are stored as an array of objects, each with only one property (text)
                    As input, I chose textarea, and for the two-way data binding to work correctly we have to
                    link the textarea viewValue to the modelValue described above.
                    
                    
                    function parseResult - takes the value from the textarea, splits it by newline and creates the array of objects described above
                    
                    function formatResult - takes the array of objects and constructs the text to be put in the textarea
                 */
                function formatResult(modelValue){
                    if (!modelValue){
                        return modelValue;
                    }
                    let value = modelValue.reduce((acc,curr) => acc+"\n"+curr.text,"").substr(1);
                    return value;
                }
                function parseResult(viewValue){
                    return viewValue.split("\n").map(elem => {return {text: elem}});
                }
                ctrl.$formatters.push(formatResult);
                ctrl.$parsers.push(parseResult);
                
            }
        }
    }]);
};