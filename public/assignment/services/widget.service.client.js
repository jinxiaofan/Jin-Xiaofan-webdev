(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            loadDefaultWidgetType : loadDefaultWidgetType,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;



        function createWidget(widget) {
            widgets.push(widget);
        }


        function loadDefaultWidgetType(wType) {
            var res = [];
            for (var wg in widgets) {
                if (widgets[wg].template == wType) {
                    res.push(widgets[wg]);
                }
            }
            return res;
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


        function updateWidget(widget) {
            for (var wg in widgets) {
                currentWidget = widgets[wg];
                if (currentWidget._id == widget._id) {
                    widgets[wg] = widget;
                }
            }
        }


        function deleteWidget(widgetId) {
            for (var wg in widgets) {
                currentWidget = widgets[wg];
                if (currentWidget._id == widgetId) {
                    widgets.splice(wg, 1);
                }
            }
        }
    }
})();