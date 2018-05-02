module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArrayEditModalCtrl",["$scope","$uibModalInstance","item","links","authors","fileService","$timeout",
        function($scope,$uibModalInstance,item,links,authors,fileService,$timeout){
            "use strict";
            //set height of container
           // $('.modal-content .card.main')
            var files = {};
            //overwrite default behaviour on pressing Enter in inputs of type text
            /*
            $(document).on("keypress", ":input:not(textarea)", function(event) {
                console.log("pressed: "+ event.keyCode);
                return event.keyCode != 13;
            });*/
            var container;
            $timeout(function(){
                container = angular.element(document.getElementsByClassName("component-edit-form"));
                console.log(container);
            },0);
            $scope.item = item;
            $scope.types = [
                {
                    display: "Paragraph",
                    type: "text-paragraph",
                    icon: " fa fa-align-justify"
                },
                {
                    display: "List",
                    type: "list-text",
                    icon: "fa fa-list"
                },
                {
                    display: "Link(PDF)",
                    type: "link-pdf",
                    icon: "fa fa-file-pdf-o"
                },
                {
                    display: "Link(Email)",
                    type: "link-email",
                    icon: "fa fa-envelope-o"
                },
                {
                    display: "Reference",
                    type: "link-reference",
                    icon: "fa fa-address-book-o"
                },
                {
                    display: "Quiz",
                    type: "quiz",
                    icon: "fa fa-question-circle-o"
                },
                {
                    display: "Video",
                    type: "video-single",
                    icon: "fa fa-play"
                },
                {
                    display: "Video(Multiple)",
                    type: "video-carousel",
                    icon: "fa fa-file-video-o"
                },
                {
                    display: "Link(Web)",
                    type: "link-website",
                    icon: "fa fa-globe"
                },
                {
                    display: "Link(Telephone)",
                    type: "link-telephone",
                    icon: "fa fa-phone"
                },
                {
                    display: "Thought Bubble",
                    type: "thought-bubble",
                    icon: 'fa fa-comment'
                },
                {
                    display: "Myth",
                    type: "text-mythfact",
                    icon: "fa fa-lightbulb-o"
                },
                {
                    display: "Alert",
                    type: "text-alert",
                    icon: "fa fa-exclamation"
                },
                {
                    display: "Image",
                    type: "image-single",
                    icon: 'fa fa-image'
                },
                {
                    display: "Profile",
                    type: "media-description",
                    icon: "fa fa-profile"
                },
                {
                    display: "Quote",
                    type: "text-quote",
                    icon: "fa fa-quote-right"
                },
              {
                display: "Quote List (Main Page)",
                type: "quote-list",
                icon: "fa fa-quote-right"
              },
              {
                display: "List of Images with Links",
                type: "list-images",
                icon: "fa fa-images"
              }
            ];
            
           
            $scope.closeModal = function(f){
                console.log(f);
                fileService.log();
                if (f.$valid){
                    
                    if (item.element.type==='text-paragraph'){
                        console.log("Rebooting element");
                        /*
                        var element = angular.copy(item.element);
                        element.links = links.links;
                        links.links = [];
                        $uibModalInstance.close({reboot: true,element});
                        */
                        $uibModalInstance.close({reboot: true,element: angular.copy(item.element)});
                    }
                    else if (item.element.type === 'video-single' || item.element.type==='video-carousel'){
                        console.log(item.element.type);
                        $uibModalInstance.close({reboot: true,element: item.element});
                    }
                    else if (item.element.type==='list-text'){
                        $uibModalInstance.close({reboot: true,element: angular.copy(item.element)});
                    }
                    else if (item.element.type === 'link-reference'){
                        let itemAuthors = '';
                        if (item.element.hasOwnProperty("authors")){
                            itemAuthors = item.element.authors.reduce((acc,curr) => acc.concat(`${curr.name}\n`),'');
                        }
                        if(itemAuthors !== authors.authors){
                            item.element.authors = [];
                            console.log("Detecting reference, editin authors");
                            authors.authors.split("\n").forEach(function(elem,index){
        
                                item.element.authors.push({name: elem});
                            });
                            authors.authors = '';
                        }
                        $uibModalInstance.close({reboot: false});
                    }
                    else if(item.element.type==='link-email'){
                        item.element.links = item.element.links.map(function(elem){
                            elem.link = `mailto:`+elem.text;
                            return elem;
                        });
                        $uibModalInstance.close({reboot: false});
                    }
                    else if (item.element.type==='link-pdf' || item.element.type === 'image-single' || item.element.type==='list-images' || item.element.type==='media-description'){
                        fileService.createUrls();
                        $uibModalInstance.close({reboot: false});
                    }
                    else if (item.element.type==='quiz'){
                        /*
                        item.element.questions = item.element.questions.map(function(elem){
                            let answers = elem.answers.split("\n");
                            console.log(answers);
                            answers = answers.map(elem => {
                                return {text: elem}
                            });
                            elem.answers = answers;
                            return elem;
                        });
                        */
                        console.log(item.element.questions);
                        $uibModalInstance.close({reboot: false});
                    }
                    else{
                        $uibModalInstance.close({reboot: false});
                    }
                    
                }
                else{
                    $scope.$broadcast("invalid");
                    $timeout(function(){
                        $scope.$emit("scrollTo",{message: 'invalid'});
                    },100);
                }
                
            };
            $scope.dismissModal = function(e){
                
                $uibModalInstance.dismiss("Modal dismissed");
                console.log(files);
            };
            $scope.log = function(){
            };
            $scope.$on("move",function(e,args){
                e.preventDefault();
                e.stopPropagation();
                console.log(args);
                var dir = args.direction;
                if (dir==="up"){
                    var dif=-1;
                }
                else{
                    var dif=1;
                }
                var ind = args.index;
    
                if (args.hasOwnProperty("index") && typeof args.index === "undefined") return;
                let ref = args.array;
                let tempObj = ref[ind];
                ref[ind] = ref[ind+dif];
                ref[ind+dif] = tempObj;
            });
            $scope.$on("deleteFromArray",function(e,args){
               args.array.splice(args.index,1);
            });
            $scope.$on("scrollTo",function(e,args){
                e.preventDefault();
                e.stopPropagation();
                if (args.message==='invalid'){
                
                   let invalids = container.find("input.ng-invalid,textarea.ng-invalid").first();
                   container.scrollTo(invalids,50,120);
                }
            })
        }]);
};