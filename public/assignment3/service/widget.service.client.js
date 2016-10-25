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
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            var newID = Math.random() * 1000;
            while (!checkValid(newId)) {
                newID = Math.random() * 1000;
            }
            widget._id = newID;
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function checkValid(newID) {
            for (var wg in widgets) {
                if (widgets[wg]._id == newID) {
                    return false;
                }
            }
            return true;
        }

        function findWidgetsByPageId(pageId) {
            var res = [];
            for (var wg in widgets) {
                if (widgets[wg].pageId == pageId) {
                    res.push(widgets[wg]);
                }
            }
            return res;
        }

        function findWidgetById(widgetId) {
            for (var wg in widgets) {
                if (widgets[wg]._id == widgetId) {
                    return widgets[wg];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var wg in widgets) {
                curWidget = widgets[wg];
                if (curWidget._id === widgetId) {
                    widgets[wg] = widget;
                }
            }
        }

        function deleteWidget(userId) {
            for (var wg in widgets) {
                curWidget = widgets[wg];
                if (curWidget._id === widgetId) {
                    widgets.splice(wg, 1);
                }
            }
        }
    }

})();