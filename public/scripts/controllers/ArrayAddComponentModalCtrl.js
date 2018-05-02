module.exports = function(application){
    "use strict";
    //this uses angular ui bootstrap modal component
    //need to inject $uibModalInstance to properly close the modal instance
    application.controller("ArrayAddComponentModalCtrl",["$scope","$uibModalInstance","item",
        function($scope,$uibModalInstance,item){
            "use strict";
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
                    display: "Documents",
                    type: "link-pdf",
                    icon: "fa fa-file-pdf-o"
                },
                {
                    display: "E-mail",
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
                    display: "Video Carousel",
                    type: "video-carousel",
                    icon: "fa fa-file-video-o"
                },
                {
                    display: "Website Links",
                    type: "link-website",
                    icon: "fa fa-globe"
                },
                {
                    display: "Contact Number",
                    type: "link-telephone",
                    icon: "fa fa-phone"
                },
                {
                    display: "Thought Bubble",
                    type: "thought-bubble",
                    icon: 'fa fa-comment'
                },
                {
                    display: "Profile",
                    type: "media-description",
                    icon: "fa fa-profile"
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
            $scope.closeModal = function(){
                $uibModalInstance.close({val: true});
            };
            $scope.dismissModal = function(){
                $uibModalInstance.dismiss("Modal dismissed");
            }
        }]);
};