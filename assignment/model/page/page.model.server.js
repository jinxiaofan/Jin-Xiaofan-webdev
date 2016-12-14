module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findALLPagesForWebsite: findALLPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel

    };
    return api;

    function setModel(newmodel) {
        model = newmodel;
    }

    function createPage(page) {
        return PageModel
            .create(page)
            .then(function (page) {
                return model
                    .websiteModel
                    .findWebsiteById(page.websiteId)
                    .then(function (website) {
                        website.pages.push(page);
                        page.save();
                        return website.save();
                    })
            })
    }


    function findALLPagesForWebsite(websiteId) {
        return PageModel.find({
            "websiteId": websiteId
        })
    }


    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }



    function updatePage(pid, page){
        return PageModel
            .update(
                {
                    _id: pid
                },
                {
                    "name" : page.name,
                    "title": page.title,
                    "websiteId": page.websiteId,
                    "description" : page.description,
                    "dateCreated" : Date.now()

                }
            );
    }



    function deletePage(pid){
        return PageModel
            .remove({_id: pid});
    }
};