(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function NewPageController($location, $routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.newPage = newPage;


        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){

                });
        }
        init();


        function newPage(){
            vm.page. _id = (new Date()).getTime().toString();
            vm.page.websiteId = vm.websiteId;
            PageService.createPage(vm.websiteId,  vm.page)
                .success(function(){
                    $location.url("/user/" +  vm.page. _id + "/website/" +  vm.websiteId + "/page/" + vm.page. _id);
                })
                .error(function(){

                });
        }
    }


    function PageListController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){

                });
        }
        init();
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;


        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {
                vm.pages = pages;
            })
                .error(function () {

                });

            PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function () {

                });
        }

        init();


        function updatePage() {
            PageService.updatePage(vm.pageId, vm.page)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {

                });
        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }).error(function () {

            });
        }

    }
})();