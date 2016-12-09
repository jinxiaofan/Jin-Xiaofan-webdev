
module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        "websiteId": { type: String, required: true},
        "name" : { type: String, required: true},
        "title": String,
        "description" : String,
        "widgets" : {type: mongoose.Schema.Types.ObjectId, ref: "Widget"},
        "dateCreated": { type: Date, default: Date.now }

    }, {collection: "page"});
    return PageSchema;
};