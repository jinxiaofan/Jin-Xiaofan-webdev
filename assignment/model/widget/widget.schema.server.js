module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({

    }, {collection: "Widget"});
    return WidgetSchema;
};