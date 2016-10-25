(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);


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