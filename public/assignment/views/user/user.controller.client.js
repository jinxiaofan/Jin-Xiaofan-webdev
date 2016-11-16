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
            UserService.findUserByCredentials(username, password).success(function(user){
                if (user != '0'){
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "Cannot login";
                }
            })
        }
    }


    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;
        function register(username, password, varyPassword){
            if (password != varyPassword){
                vm.error = "Different Passwords typed in";
            }
            else {
                UserService
                    .createUser(username,password)
                    .success(function(user){
                        $location.url("/user/" + user._id);
                    })
            }
        }
    }


    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);

        vm.updateProfile = updateProfile;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                if (user != '0') {
                    vm.user = user;
                }
            })
        }
        init();


        function updateProfile() {
            UserService.updateUser(userId, vm.user).success(function (user) {
                if (user != '0') {
                    vm.user = user;
                }
            })
        }
    }
})();