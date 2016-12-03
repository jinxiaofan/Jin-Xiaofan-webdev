module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findALLPagesForWebsite: findALLPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(page){
        return PageModel.create(page);
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
                {_id: pid},
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