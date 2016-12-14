(function(){
    angular
        .module("NutritionPlaner")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/homepage.view.client.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/homepage.view.client.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .when("/help", {
                templateUrl: "views/help/help.view.client.html",
                controller: "HelpController",
                controllerAs: "model"
            })
            .when("/home/:uid", {
                templateUrl: "views/homepage.view.client.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/food/food-search.view.client.html",
                controller: "FoodSearchController",
                controllerAs: "model"
            })
            .when("/search/:pid", {
                templateUrl: "views/food/food-detail.view.client.html",
                controller: "FoodDetailController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });


        function checkLogin($q, UserService ,$location) {
            var deferred = $q.defer();
            UserService.checkLogin()
                .success(
                    function (user) {
                        if (user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    })
                .error(function () {

                });
            return deferred.promise;
        }
    }
})();