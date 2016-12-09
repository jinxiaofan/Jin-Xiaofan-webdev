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
            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function(user){
                    if (user === '0'){
                        vm.error = "No such user or invalid password";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(){
                    vm.error  = "400 error"
                })
        }

    }


    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, varyPassword){
            UserService
                .findUserByUserName(username)
                .success(function(user){
                    if(user == 0){
                        if (password === varyPassword){
                            UserService
                                .createUser(username,password)
                                .success(function(user){
                                    $location.url("/user/" + user._id);
                                })
                                .error(function(){

                                })
                        } else {
                            vm.error = "password is different with vary password";
                        }
                    }else{
                        vm.error = "Username has been occupied";
                    }
                })
                .error(function(){

                })

        }
    }



    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }else{
                        console.log("no user found");
                    }
                })
                .error(function () {

                });
        }
        init();

        function updateUser(){
            promise = UserService.updateUser(vm.user);
            promise
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });

        }

        function deleteUser(){
            var promise = UserService.deleteUser(vm.user._id);
            promise
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });
        }
    }
})();