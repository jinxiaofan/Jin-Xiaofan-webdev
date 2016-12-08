(function(){
    angular
        .module("Cool_Wo_MusicPlayer")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs : "model"
            })
        }
})();