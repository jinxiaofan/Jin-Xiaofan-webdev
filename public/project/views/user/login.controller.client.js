(function () {
    angular
        .module("NutritionPlaner")
        .controller("LoginController", LoginController);

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

})();