(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (vm.user == null) {
                vm.error = "No such user"
            }
            else {
                var user = UserService.findUserByCredentials(vm.user.username, vm.user.password);
                if (user === null) {
                    vm.error = "No such user"
                }
                else {
                    $location.url("/user/" + user._id);
                }
            }
        }
    }


    function RegisterController(UserService, $location) {
        var vm = this;
        vm.createUser = createUser;
        function createUser(user) {
            if (user.password != user.password2) {
                vm.error = "Different Passwords typed in"
            }
            else {
                user._id = (new Date()).getTime();
                UserService.createUser(user);
                $location.url("/user/" + user._id);
            }
        }
    }


    function ProfileController($routeParams, UserService) {

        var vm = this;

        vm.userId = parseInt($routeParams.uid);
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }

})();