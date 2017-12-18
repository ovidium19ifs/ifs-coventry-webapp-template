application.directive("quizCarousel",function(){
    "use strict";
    return {
        restrict: "E",
        scope:{
            questions:"="
        },
        templateUrl: "/templates/quiz-carousel.html",
        link: function(scope,elem,attrs,ctrl){
            scope.progress = $(elem).find(".progress-div");
            scope.carousel = $(elem).find("#quiz-carousel");
            scope.row = $(elem).find(".row");

            //make slide invisible until completely centered on screen. Prevent slide overlapping
            $(scope.carousel).on("slide.bs.carousel",function(e){

                $(".carousel-item").eq(e.to).css("visibility","hidden");
                scope.current = e.to-1;
            });
            $(scope.carousel).on("slid.bs.carousel",function(e){
                $(".carousel-item").eq(e.to).slideDown(300,function(){
                    $(this).css("visibility","visible");
                });
            });
            //---------------------------------------------------------------------
            //function to advance the progress-bar with either correct or wrong color
            scope.advanceProgress = function(ans,i){
                console.log("cell: "+i);

                var cell =$(scope.row).children(".progress-cell").eq(i);
                console.log(cell);
                if (ans){
                    $(cell).addClass("correct");
                    scope.correctAnswers++;
                    scope.score = Math.floor(scope.correctAnswers * 100 / scope.questions.length );
                }
                else{
                    $(cell).addClass("wrong");
                }
            }
        },
        controller: function($scope,$route,$location,$routeParams,$timeout){
            $scope.correctAnswers = 0;
            $scope.score = 0;
            $scope.results = [];
            $scope.nextSlide = function(){
                $($scope.carousel).carousel('next');
            };
            $scope.isCorrect = function(i,q){
                var r = {
                    text: $scope.questions[q].text,
                    answer: $scope.questions[q].answers[i].text,
                    tip: $scope.questions[q].tip
                };
                if ($scope.questions[q].answers[i].id === $scope.questions[q]['correct_answer']){
                    $scope.advanceProgress(true,q);
                    r.correct = true;
                }
                else{
                    $scope.advanceProgress(false,q);
                    r.correct = false;
                }
                $scope.results.push(r);
                if (q===$scope.questions.length-1)
                    $timeout(function(){
                        $scope.quizFinished = true;
                    },1000);


                $($scope.carousel).carousel('next');
            };
            $scope.reloadQuiz = function(){
                $route.reload();
            }
        }
    }
});