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
            UserService.findUserByUserName(username)
                .success(function (user) {
                    if (user == 0) {
                        if (password === varyPassword){
                            UserService
                                .createUser(username,password)
                                .success(function(user){
                                    $location.url("/user/" + user._id);
                                })
                        } else {
                            vm.error = "Different passwords typed in";
                        }
                    } else {
                        vm.error = "This UserName has been used";
                    }
                })
        }
    }


    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;


        function init() {
            UserService.findUserById(userId).success(function (user) {
                if (user != '0') {
                    vm.user = user;
                }
            })
        }
        init();


        function updateUser() {
            UserService.updateUser(vm.user).success(function (user) {
                $location.url("/login");
            })
        }

        function deleteUser(){
            UserService.deleteUser(vm.user._id).success(function(){
                    $location.url("/login");
                })
        }
    }
})();