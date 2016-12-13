(function () {
    angular
        .module("NutritionPlaner")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.unFollow = unFollow;

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


        function unFollow(unfollowUser) {
            UserService
                .unFollow(vm.uid, unfollowUser)
                .then(function (response) {
                        init();
                    },
                    function (error) {
                        vm.error = "Error, cannot follow user.";
                    });
        }

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