module.exports = function(application){
    "use strict";
    application.filter("nicename", [function(){
        "use strict";
        return function(input){
            let types = [
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
                    display: "Telephone Number",
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
            let res = types.find(function(elem){
                return elem.type===input;
            });
            return res.display;
        }
    }]);
};