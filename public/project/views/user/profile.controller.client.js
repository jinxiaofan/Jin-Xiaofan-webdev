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
        vm.showModal = showModal;
        vm.hideModal = hideModal;


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

        function showModal() {
            $('.modal').show();
        }

        function hideModal() {
            $('.modal').hide();
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