(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService) {

        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.websiteId = parseInt($routeParams.wid);



        function init() {
            var promise = PageService.findPagesByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                });
        }
        init();
    }


    function NewPageController($routeParams, PageService, $location) {

        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.createPage = createPage;


        function init() {
            var promise = PageService.findPagesByWebsiteId(websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                });
        }

        init();

        function createPage(page) {
            page._id = (new Date()).getTime();
            page.websiteId = websiteId;
            var promise = PageService.createPage(page);
            promise
                .success(function () {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                })
                .error(function () {

                });
        }
    }


    function EditPageController($routeParams, PageService, $location) {

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
            var promise = PageService.findPageById(pageId);
            promise
                .success(function (page) {
                    vm.page = page;
                })
                .error(function () {

                });
            promise = PageService.findPagesByWebsiteId(websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                });
        }
        init();


        function updatePage(page) {
            var promise = PageService.updatePage(page);
            promise
                .success(function () {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                })
                .error(function () {

                });
        }


        function deletePage(pid) {
            var promise = PageService.deletePage(pid);
            promise
                .success(function () {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                })
                .error(function () {

                });
        }
    }
})();