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
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function () {
                    
                })

            WebsiteService.findWebsiteById(vm.wid)
                .success(function(website){
                    vm.website = website;
                })
                .error(function () {
                    
                })
        }
        init();

        function updateWebsite() {
            WebsiteService.updateWebsite(vm.websiteId , vm.website).success(function(){
                $location.url("/user/" + vm.userId  + "/website");
            })
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website._id)
                .success(function(){
                $location.url("/user/" + vm.userId  + "/website");
            })
                .error(function () {

                });
        }
    }


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (websites) {
                vm.websites = websites;
            })
                .error(function () {

                })
        }
        init();
    }

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (websites) {
                vm.websites = websites;
            })
                .error(function () {

                });
        }
        init();


        function createWebsite(newWebSite) {
            newWebSite.developerId = vm.userId;
            WebsiteService.createWebsite(newWebSite._id, newWebSite)
                .success(function(){
                $location.url("/user/" +  newWebSite.developerId  + "/website");
            })
                .error(function () {

                });
        }
    }
})();



