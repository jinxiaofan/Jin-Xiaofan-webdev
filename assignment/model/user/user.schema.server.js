module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        "username" : { type: String, required: true, unique: true},
        "password": { type: String, required: true },
        "firstName" : String,
        "lastName" : String,
        "email" : String,
        "phone" : String,
        // list of reference
        "websites": [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        "dateCreated": { type: Date, default: Date.now }

    }, {collection: "user"});
    return UserSchema;
};