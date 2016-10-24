(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService(){
        var users =[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user, callback){
            var new_user = {
              _id: (new Data()).getTime(),
                username: user.username,
                password: user.password
            };
            services.users.push(new_user);
            callback(new_user);
            return new_user;
        }


        function findUserById(userId){
            for(var u in users){
                user = users[u];
                if(user._id == userId){
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password){
            for (var u in users) {
                user = users[u];
                if (user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }
        function updateUser(userId, user){
            for (var u in services.users) {
                if (services.users[u]._id == userId) {
                    services.users[u].username = user.username;
                    services.users[u].password = user.password;
                    services.users[u].firstName = user.firstName;
                    services.users[u].lastName = user.lastName;
                    callback(services.users[u]);
                    return services.users[u];
                }
                else
                    callback(null);
            }
        }

        function deleteUser(userId, callback){
            for (var u in services.users) {
                if (services.users[u]._id == userId) {
                    services.users.splice(u, 1);
                }
            }
            callback(users);
        }

    }
})();
