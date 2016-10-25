(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {

        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId = $routeParams.pid;

        vm.pageId = pageId;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(pageId);
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();

        function updatePage(page) {
            PageService.updatePage(page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function deletePage(pid) {
            PageService.deletePage(pid);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
    }
})();