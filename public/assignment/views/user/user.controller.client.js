(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        function login(username, password){
            if (typeof(username) === "undefined" || username === "") {
                vm.error = "Notice! Username needed"
            } else if (typeof(password) === "undefined" || password === "") {
                vm.error = "Notice! Password needed."
            } else {
                UserService.login(username, password)
                    .success(function (user) {
                        if (user === '0') {
                            vm.error = "User not found";
                        } else {
                            $location.url("/user/" + user._id);
                        }
                    });
            }
        }
    }


    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;
        function register(username, password, varyPassword){
            if ((typeof(username) === "undefined" || username === "") ||
                (typeof(password) === "undefined" || password === "") ||
                (typeof(varyPassword) === "undefined" || varyPassword === "")) {
                vm.error = "Notice! Username, Password, Varypassword needed"
            } else {
                UserService.findUserByUserName(username)
                    .success(function (user) {
                        if (user == 0) {
                            if (password === varyPassword) {
                                UserService
                                    .createUser(username, password)
                                    .success(function (user) {
                                        $location.url("/user/" + user._id);
                                    })
                                    .error(function () {

                                    })
                            } else {
                                vm.error = "password is different with vary password";
                            }
                        } else {
                            vm.error = "Notice! This username has been used";
                        }
                    })
                    .error(function () {

                    })
            }
        }
    }



    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }else{
                        console.log("No such a user");
                    }
                });
        }
        init();

        function logout() {
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });
        }

        function updateUser(){
            UserService.updateUser(vm.user)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });

        }

        function deleteUser(){
            UserService.deleteUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });
        }
    }
})();