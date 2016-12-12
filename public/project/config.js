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
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
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


        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(function (response) {
                        var user = response.data;
                        if (user == '0') {
                            $rootScope = null;
                            deferred.reject();
                            $location.url("/login")
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login")
                    });
            return deferred.promise;
        }
    }
})();