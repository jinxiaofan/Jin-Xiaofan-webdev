(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(user) {
            user._id = (new Date()).getTime();
            UserService.createUser(user);
            $location.url("/user/" + user._id);
        }
    }

})();