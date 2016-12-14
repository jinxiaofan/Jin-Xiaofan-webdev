(function(){
    angular
        .module("NutritionPlaner")
        .controller("RegisterController", RegisterController);

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
})();