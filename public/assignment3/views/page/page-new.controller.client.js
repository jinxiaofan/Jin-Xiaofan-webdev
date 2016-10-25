(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);


    function PageNewController($routeParams, PageService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.createPage = createPage;


        function init() {
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();

        function createPage(page) {
            page._id = (new Date()).getTime();
            page.websiteId = websiteId;
            PageService.createPage(page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

    }
})();