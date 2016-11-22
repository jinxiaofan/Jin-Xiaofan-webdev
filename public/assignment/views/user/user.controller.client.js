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
                .success(function(user) {
                    if (user === '0') {
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function () {

                });
            }
        }
    

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;
        function register(username, password, varyPassword){
            UserService.findUserByUsername(username)
                .success(function (user) {
                    if (user == 0) {
                        if (password === varyPassword){
                            UserService
                                .createUser(username,password)
                                .success(function(user){
                                    $location.url("/user/" + user._id);
                                })
                                .error(function () {
                                    
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
        vm.unregisterUser = unregisterUser;


        function init() {
            var promise = UserService.findUserById(userId);
            promise
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
            console.log(vm.user);
            UserService.updateUser(vm.user)
                .success(function (user) {
                $location.url("/login");
            })
                .error(function () {
                    
                })
        }

        function unregisterUser(){
            UserService.unregisterUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function () {
                    
                })
        }
    }
})();