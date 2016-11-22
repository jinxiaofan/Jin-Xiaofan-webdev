(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            unregisterUser: unregisterUser
        };
        return api;

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }


        function unregisterUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }


        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post('/api/user', user);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username=/' + username;
            return $http.get(url);
        }


        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }


        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }
    }
})();