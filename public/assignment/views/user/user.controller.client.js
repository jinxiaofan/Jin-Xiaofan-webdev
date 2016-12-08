(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {


        var vm = this;
        vm.login = login;

        function login(username, password) {
            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    if (user === '0') {
                        vm.error = "error"
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (user) {

                });
        }
    }

    function RegisterController(UserService, $location) {

        var vm = this;
        vm.createUser = createUser;


        function createUser(user) {
            if (user.password != user.varyPassword) {
                vm.error = "Sorry! Different password typed in"
            } else {
                var promise = UserService.createUser(user.username, user.password);
                promise
                    .success(function (user) {
                        $location.url("/user/" + user._id);
                    })
                    .error(function (error) {
                        vm.error = "error";
                    });
            }
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        vm.userId = parseInt($routeParams.uid);

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;


        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function () {

                });
        }
        init();



        function updateUser() {
            UserService.updateUser(vm.user);
        }



        function unregisterUser() {
            UserService
                .unregisterUser(vm.user._id)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });
        }
    }
})();