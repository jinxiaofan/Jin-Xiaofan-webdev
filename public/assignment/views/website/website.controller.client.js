(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteListController", WebsiteListController)
        .controller("WebsiteNewController", WebsiteNewController);


    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        vm.userId = userId;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/" + userId + "/website");
        }

        function deleteWebsite(wid) {
            WebsiteService.deleteWebsite(wid);
            $location.url("/user/" + userId + "/website");
        }
    }


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.websiteId);
        vm.userId = userId;
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();


        function createWebsite(website) {
            website._id = (new Date()).getTime();
            website.developerId = userId;
            WebsiteService.createWebsite(website);
            $location.url("/user/" + userId + "/website");
        }
    }
})();


