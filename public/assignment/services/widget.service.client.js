(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            loadDefaultWidgetType : loadDefaultWidgetType,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget:sortWidget
        };
        return api;


        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId +"/widget";
            return $http.post(url, widget)
        }

        function loadDefaultWidgetType(widgetType) {
            var type = [];
            for (var wg in widgets) {
                if (widgets[wg].template == widgetType) {
                    type.push(widgets[wg]);
                }
            }
            return type;
        }


        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId +"/widget";
            return $http.get(url);
        }


        function findWidgetById(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.get(url, widgetId);
        }


        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' + widgetId;
            return $http.put(url, widget);
        }


        function deleteWidget(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.delete(url);
        }

        function sortWidget(pid, start, end) {
            var url = "/api/page/" + pid + "/widget?start=" + start + "&end=" + end;
            return $http.put(url);
        }
    }
})();