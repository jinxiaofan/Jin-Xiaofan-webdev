(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService){
        var vm = this;

        vm.userId = $routeParams.uid;
        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                });
        }
        init();
    }



    function NewWebsiteController($location, $routeParams, WebsiteService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();


        function createWebsite(name, description){
            if (typeof(name) === "undefined" || name === "") {
                vm.error = "Notice! Name needed"
            } else {
                var newWebSite = {
                    developerId: vm.userId,
                    name: name,
                    description: description
                };
                WebsiteService.createWebsite(newWebSite._id, newWebSite)
                    .success(function () {
                        $location.url("/user/" + newWebSite.developerId + "/website");
                    });
            }
        }
    }



    function EditWebsiteController($location, $routeParams, WebsiteService){
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                });

            WebsiteService.findWebsiteById(vm.wid)
                .success(function(website){
                    vm.website = website;
                });
        }
        init();


        function updateWebsite(){
            if (typeof(vm.website.name) === "undefined" || vm.website.name === "") {
                vm.error = "Notice! Name needed"
            } else {
                WebsiteService.updateWebsite(vm.wid, vm.website)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {

                    });
            }
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.website._id)
                .success(function(){
                    $location.url("/user/" + vm.userId  + "/website");
                });
        }
    }
})();



