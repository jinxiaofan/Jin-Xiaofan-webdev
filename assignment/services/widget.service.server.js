module.exports = function(app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findWidgetsByPageId);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.delete('/api/widget/:wgid', deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/api/page/:pid/widget', sortWidget);



    function createWidget(req, res) {
        var widget = req.body;
        model.widgetModel.createWidget(widget.pageId, widget)
            .then(function (page) {
                var widgetId = page.widgets[page.widgets.length - 1];
                res.send(widgetId);
            })
    }



    function findWidgetsByPageId(req, res) {
        var pid = req.params.pid;
        model.widgetModel.findWidgetsByPageId(pid)
            .then(
                function(widgets){
                    if(widgets){
                        res.json(widgets);
                    } else {
                        res.json([]);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }



    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        model.widgetModel.findWidgetById(wgid)
            .then(
                function(widget){
                    if(widget){
                        res.json(widget);
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.wgid;
        model.widgetModel.updateWidget(wgid, widget)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }



    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        model.widgetModel.deleteWidget(wgid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }



    function sortWidget(req, res) {
        var pageId = req.params.pid;
        var start = req.query.start;
        var end = req.query.end;
                    res.sendStatus(200);
    }



    function uploadImage(req, res) {
        var wgid = req.body.wgid;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;
        var myFile = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in uploads folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;


        var newUrl = '/assignment/uploads/'+filename;
        var updateOne = {"name": filename, "widgetType": "IMAGE", "text": req.body.text, "url": newUrl, "width": req.body.width, "pageId" : pid};
        model.widgetModel
            .updateWidget(wgid, updateOne)
            .then(
                function(status){
                    console.log(newUrl);
                    var url = '/assignment/index.html#/user/' + uid + '/website/' + wid + '/page/' + pid + '/widget/';
                    res.redirect(url);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};