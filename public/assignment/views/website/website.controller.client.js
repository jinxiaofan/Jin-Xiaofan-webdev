(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteListController", WebsiteListController)
        .controller("WebsiteNewController", WebsiteNewController);


    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService.findWebsiteById(vm.websiteId).success(function (website) {
                if (website != '0') {
                    vm.website = website;
                }
            });
            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) {
                vm.websites = websites;
            });
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website).success(function (website) {
                if (website != '0') {
                    $location.url("/user/" + vm.userId + "/website");
                }
            });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId).success(function (res) {
                console.log(res);
                $location.url("/user/" + vm.userId + "/website");
            });
        }
    }


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) {
                vm.websites = websites;
            });
        }
        init();
    }

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) {
                vm.websites = websites;
            });        }
        init();


        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, vm.website).success(function (website) {
                $location.url("/user/" + vm.userId + "/website");
            });
        }
    }
})();



