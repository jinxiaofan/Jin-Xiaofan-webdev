(function() {
    angular
        .module("NutritionPlaner")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUserName : findUserByUserName,
            findUserByCredentials : findUserByCredentials,
            loggedIn: loggedIn,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout

        };
        return api;


        function loggedIn() {
            var url = "/api/loggedIn";
            return $http.get(url);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

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

        function findUserByUserName(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
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




