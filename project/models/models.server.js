module.exports = function () {
    console.log("hello from model");
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;

    var userModel = require("./user/user.model.server")();

    var models = {
        userModel: userModel
    };
    userModel.setModel(models);
    return models;
};