(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("ChooseWidgetController", ChooseWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {


        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;


        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function () {

                });
        }
        init();



        function checkSafeImageUrl(url) {
            return $sce.trustAsHtml(url);
        }


        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }



        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];

            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function ChooseWidgetController($routeParams, WidgetService, $location) {


        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.widget = {"_id": null, "widgetType": null, "pageId": null, "size": null, "text": null};
        vm.createWidget = createWidget;

        function createWidget(widgetType) {

            vm.widget.widgetType = widgetType;
            vm.widget._id = (new Date()).getTime();
            vm.widget.pageId = vm.pid;

            WidgetService
                .createWidget(vm.widget)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.widget._id);
                })
                .error(function () {

                });
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (widget) {
                    vm.widget = widget
                })
                .error(function () {

                });

            WidgetService
                .findWidgetsByPageId(vm.pid)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function () {

                });
        }
        init();


        function updateWidget(widget) {
            WidgetService
                .updateWidget(widget)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
                })
                .error(function () {

                });
        }

        function deleteWidget(wgid) {
            WidgetService
                .deleteWidget(wgid)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
                })
                .error(function () {

                });
        }
    }
})();