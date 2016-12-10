(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


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


    function NewPageController($location, $routeParams, PageService){
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.newPage = newPage;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                });
        }
        init();


        function newPage(name, title){
            if (typeof(name) === "undefined" || name === "") {
                vm.error = "Notice! name needed"
            } else {
                var page = {websiteId:vm.websiteId, name: name, title: title};
                PageService.createPage(vm.websiteId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                    });
            }
        }
    }


    function EditPageController($location, $routeParams, PageService){
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;



        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){

                });

            PageService.findPageById(vm.pageId)
                .success(function(page){
                    vm.page = page;
                });
        }
        init();



        function updatePage(){
            if (typeof(vm.page.name) === "undefined" || vm.page.name === "") {
                vm.error = "Notice! Name needed."
            } else {
                PageService.updatePage(vm.pageId, vm.page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function () {

                    })
            }
        }

        function deletePage(){
            PageService.deletePage(vm.pageId)
                .success(function(){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    }
})();