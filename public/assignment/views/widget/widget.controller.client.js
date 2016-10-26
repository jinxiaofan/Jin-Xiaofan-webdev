(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetListController", WidgetListController);

    function WidgetChooseController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }
        init();
    }

    function WidgetEditController($routeParams,
                                  WidgetService, $sce) {

        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        var wgid = $routeParams.wgid;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();

    }

    function WidgetListController($routeParams,
                                  WidgetService, $sce) {
        var vm = this;
        var pid = $routeParams.pid;

        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsForPage(pid);
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

})();