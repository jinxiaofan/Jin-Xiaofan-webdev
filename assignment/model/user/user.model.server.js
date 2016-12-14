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
        setModel:setModel
    };
    return api;


    function setModel(_model) {
        model = _model;
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