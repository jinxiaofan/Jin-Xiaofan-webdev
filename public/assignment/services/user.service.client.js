(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;

        function createUser(username,password) {
            var user = {
                username:username,
                password:password
            };
            return $http.post('/api/user',user);
        }

        function findUserByCredentials(username,password){
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }


        function findUserById(id) {
            var url = '/api/user/' + id;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var result = [];
            var user;
            for(var u in users){
                user = users[u];
                if(user.username === username){
                    result.push(user);
                }
            }
            return result;
        }


        function updateUser(user) {
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }



        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

    }
})();




