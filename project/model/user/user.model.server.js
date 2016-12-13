module.exports = function() {
    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUserName: findUserByUserName,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addFollow: addFollow,
        unFollow: unFollow,
        setModel:setModel
    };
    return api;


    function setModel(_model) {
        model = _model;
    }

    function addFollow(userId, followUserId) {
        return User.findById(userId)
            .then(function (user) {
                    user.follows.push(followUserId);
                    user.save(function(err,doc){});
                },
                function (error) {

                });
    }

    function unFollow(userId, unfollowUserId) {
        return User.findById(userId)
            .then(function (user) {
                    for (var i = 0; i < user.follows.length; ++i) {
                        if (user.follows[i].toString() == unfollowUserId) {
                            user.follows.splice(i, 1);
                            user.save(function(err,doc){});
                            break;
                        }
                    }
                },
                function (error) {

                });
    }

    function createUser(user){
        return UserModel.create(user);
    }


    function findUserById(userId){
        return UserModel.findById(userId);
    }

    function findUserByUserName(userName){
        return UserModel.findOne({
            username : userName
        });
    }

    function updateUser(userId, user){
        return UserModel
            .update({_id: userId},
                {
                    username : user.username,
                    password : user.password,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    phone : user.phone,
                    website : user.website,
                    dateCreated : new Date()
                }
            );
    }



    function findUserByCredentials(username, password){
        return UserModel.findOne({
            username: username,
            password: password
        });
    }


    function deleteUser (userId) {
        return UserModel
            .remove({_id: userId});

    }
};