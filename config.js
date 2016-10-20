(function() {
    angular
        .module("WebAppMaker")
        .config(function ($routeProvider) {
            console.log("in config");

            $routeProvider
                .when("/login", {
                    templateUrl: "/views/user/login.view.client.html",
                    controller: "LoginCotroller",
                    controllerAs: "model"
                })
        });


})();
