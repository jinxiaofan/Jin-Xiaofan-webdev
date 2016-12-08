module.exports = function (app) {
    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345",
            "widgetType": "IMAGE",
            "pageId": "321",
            "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

    app.put("/api/widget", updateIndex);
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);


   function uploadImage(req, res) {
        var userId = req.body.uid;
        var websiteId = req.body.wid;
        var pageId = req.body.pid;
        var widgetId = req.body.wgid;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;

        var newUrl = '/assignment/uploads/' + filename;
        var theUpdate = {
            "_id":widgetId,
            "name": filename,
            "widgetType": "IMAGE",
            "text": req.body.text,
            "url": newUrl,
            "width": width,
            "pageId": pageId
        };


        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == theUpdate._id) {
                widgets[i] = theUpdate;
                break;
            }
        }
        var url = '/assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/';
        res.redirect(url);
    }


    function updateIndex(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    }



    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        res.send(widgets);
    }


    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;
        var result = [];
        for (var wg in widgets) {
            if (widgets[wg].pageId == pid) {
                result.push(widgets[wg]);
            }
        }
        res.send(result);
    }


    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                res.send(widgets[wg]);
                return;
            }
        }
        res.send('0');
    }


    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                widgets[wg] = widget;
            }
        }
        res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                widgets.splice(wg, 1);
            }
        }
        res.sendStatus(200);
    }

};