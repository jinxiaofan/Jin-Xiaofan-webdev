module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        "developerId" : { type : String, required: true},
        "name" : { type : String, required: true},
        "description" : String,
        "pages" : {type: mongoose.Schema.Types.ObjectId, ref: "page"},
        "dateCreated": { type: Date, default: Date.now }
    }, {collection: "Website"});
    return WebsiteSchema;
};