(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
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