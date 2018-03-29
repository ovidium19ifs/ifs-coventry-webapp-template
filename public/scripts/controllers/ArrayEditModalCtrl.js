module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArrayEditModalCtrl",["$scope","$uibModalInstance","item","links","authors",
        function($scope,$uibModalInstance,item,links,authors){
            "use strict";
            //set height of container
           // $('.modal-content .card.main')
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
                    type: "video",
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
                    display: "Quote",
                    type: "text-quote",
                    icon: "fa fa-quote-right"
                }
            ];
            console.log(item);
            $scope.closeModal = function(f){
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
                    else if (item.element.type==='list-text'){
                        $uibModalInstance.close({reboot: true,element: angular.copy(item.element)});
                    }
                    else if (item.element.hasOwnProperty("authors") && authors.authors!==item.element.authors.reduce((acc,curr) => acc.concat(`${curr.name}\n`),'')){
                        item.element.authors = [];
                        authors.authors.split("\n").forEach(function(elem,index){
                            console.log(index);
                           item.element.authors.push({name: elem});
                        });
                        authors.authors = '';
                        $uibModalInstance.close({reboot: false});
                    }
                    else if(item.element.type==='link-email'){
                        item.element.links = item.element.links.map(function(elem){
                            elem.link = `mailto:`+elem.text;
                            return elem;
                        });
                        $uibModalInstance.close({reboot: false});
                    }
                    else{
                        $uibModalInstance.close({reboot: false});
                    }
                    
                }
                
            };
            $scope.dismissModal = function(e){
                
                $uibModalInstance.dismiss("Modal dismissed");
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
        }]);
};