(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": '<p>Slugs should be so much cooler to watch. They have antennae that wriggle around and their method of forward motion is weird. But they are just so damn slow. You feel the slug’s pain and respect its patience but you don’t really want to look very long. Whether it’s moving at 20x or 40x, timelapse is truly the way to watch a slug do its thing.<br></p>'},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            findWidgetsForPage: findWidgetsForPage,
            findWidgetById: findWidgetById
        };
        return api;
        
        function findWidgetById(wid) {
            for (var w in widgets) {
                if (widgets[w]._id == wid) {
                    return widgets[w];
                }
            }
            return null;
        }

        function findWidgetsForPage(pid) {
            // ToDo: iterate over array looking for widgets for
            return widgets;
        }

    }
})();