(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)
        .controller("PageListController", PageListController)
        .controller("PageNewController", PageNewController);


    function PageEditController($routeParams, PageService, $location) {

        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).success(function(pages){
                vm.pages = pages;
            });

            PageService.findPageById(vm.pageId).success(function(page){
                vm.page = page;
            })
        }
        init();


        function updatePage(){
            PageService.updatePage(vm.pageId , vm.page ).success(function(){
                $location.url("/user/" + vm.userId  + "/website/" + vm.websiteId + "/page");
            })
        }

        function deletePage(){
            PageService.deletePage(vm.pageId).success(function(){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            })
        }
    }


    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);


        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).success(function (pages) {
                vm.pages = pages;
            });
        }
        init();
    }

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.createPage = createPage;
        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).success(function (pages) {
                vm.pages = pages;
            });
        }
        init();


        function createPage() {
            vm.page. _id = (new Date()).getTime();
            vm.page.websiteId = vm.websiteId;
            PageService.createPage(vm.websiteId,  vm.page).success(function(){
                $location.url("/user/" +  vm.page. _id + "/website/" +  vm.websiteId + "/page/" + vm.page. _id);
            })
        }
    }
})();