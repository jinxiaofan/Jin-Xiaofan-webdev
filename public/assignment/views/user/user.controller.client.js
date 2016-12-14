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
            UserService.findUserByCredentials(username, password)
                .success(function(user){
                    if (user === '0'){
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(){

                });
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService.findUserById(userId)
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }else{
                    }
                })
                .error(function () {

                });
        }
        init();


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

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;


        function register(username, password, varyPassword){
            if (password === varyPassword){
                UserService
                    .createUser(username,password)
                    .success(function(user){
                        $location.url("/user/" + user._id);
                    })
                    .error(function(){

                    })
            } else {
                vm.error = "Notice!, the varypassword must be same as the password";
            }
        }
    }
})();