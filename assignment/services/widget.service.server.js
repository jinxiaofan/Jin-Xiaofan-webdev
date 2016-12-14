module.exports = function(app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});


    var widgets =
        [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findWidgetsByPageId);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.delete('/api/widget/:wgid', deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/api/page/:pid/widget', sortWidget);


    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        res.sendStatus(200);
    }


    function findWidgetsByPageId(req, res) {
        var result = [];
        var pid = req.params.pid;
        for (var w in widgets) {
            if (widgets[w].pageId === pid) {
                result.push(widgets[w])
            }
        }
        res.json(result);
    }


    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                res.json(widgets[w]);
            }
        }
    }


    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.wgid;
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                widgets[w] = widget;
                break;
            }
        }
        res.sendStatus(200);
    }



    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                widgets.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var wgid = req.body.wgid;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;


        for (var wg in widgets) {
            if (widgets[wg]._id === wgid) {
                widgets[wg].url = '/assignment/uploads/'+filename;
                widgets[wg].text = req.body.text;
                widgets[wg].width = req.body.width;
                break;
            }
        }
        var url = '/assignment/index.html#/user/' + uid + '/website/' + wid + '/page/' + pid + '/widget/';
        res.redirect(url);
    }



    function sortWidget(req, res) {
        var pageId = req.params.pid;
        var start = req.query.start;
        var end = req.query.end;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        res.sendStatus(200);
    }
};