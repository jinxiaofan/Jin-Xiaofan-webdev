(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

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
})();