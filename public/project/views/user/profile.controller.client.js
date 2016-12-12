(function () {
    angular
        .module("NutritionPlaner")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.unFollow = unFollow;
        vm.logout = logout;

        function init() {
            UserService.findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        
        function unFollow(unfollowUser) {
            UserService
                .unFollow(vm.uid, unfollowUser)
                .then(function (response) {
                        init();
                    },
                    function (error) {
                        vm.error = "Cannot follow user.";
                    });
        }
        
        function deleteUser(user) {
            UserService
                .deleteUser(user)
                .then(function (response) {
                    $location.url("/home");
                },
                function (error) {
                    vm.error = "Unable to unregister."
                });
        }

        function updateUser(newUser) {
            UserService
                .updateUser(vm.uid, newUser)
                .then(function (response) {
                    vm.success = "Your profile was saved."
                },
                function (error) {
                    vm.error = "Unable to update profile."
                });
        }

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $location.url("/home");
                    },
                    function (error) {
                        $location.url("/home");
                    })
        }
    }
})();