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
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(user) {
            user._id = (new Date()).getTime();
            UserService.createUser(user);
            $location.url("/user/" + user._id);
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