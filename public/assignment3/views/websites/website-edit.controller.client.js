(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

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
})();