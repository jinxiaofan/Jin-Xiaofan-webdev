module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({

    }, {collection: "Website"});
    return WebsiteSchema;
};