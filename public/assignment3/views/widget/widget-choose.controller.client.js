(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController);

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



})();