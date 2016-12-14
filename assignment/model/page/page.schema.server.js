module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({

    }, {collection: "page"});
    return PageSchema;
};