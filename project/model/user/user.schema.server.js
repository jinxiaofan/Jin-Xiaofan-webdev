module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        follows: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}],
        avatar: String,
        dateCreated: { type: Date, default: Date.now }

    }, {collection: "user"});
    return UserSchema;
};