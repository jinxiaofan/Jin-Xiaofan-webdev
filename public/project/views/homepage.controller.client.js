(function () {
    angular
        .module("NutritionPlaner")
        .controller("HomepageController", HomepageController);

    function HomepageController($location, UserService, $rootScope) {
        var vm = this;

        vm.user = $rootScope.currentUser;
        vm.logout = logout;

        function init() {

            UserService
                .loggedIn()
                .then(function (response) {
                        var user = response.data;
                        if (user == '0') {
                            $rootScope = null;
                            vm.user = null;
                        } else {
                            $rootScope.currentUser = user;
                            vm.user = user;
                        }
                    },
                    function (err) {
                        $location.url("/home")
                    });

        }
        init();



        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        init();
                    },
                    function (error) {
                        init();
                    })
        }
    }
})();