module.exports = function (app) {
    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findWidgetsByPageId);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.put('/api/page/:pid/widget', sortWidget);
    app.delete('/api/widget/:wgid', deleteWidget);


    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        res.sendStatus(200);
    }

    function findWidgetsByPageId(req, res) {
        var allWidgets = [];
        var pid = req.params.pid;
        for(var wg in widgets){
            if(widgets[wg].pageId === pid){
                allWidgets.push(widgets[wg])
            }
        }
        res.json(allWidgets);
    }


    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        for(var wg in widgets){
            if(widgets[wg]._id === wgid){
                res.json(widgets[wg]);
            }
        }
    }


    function updateWidget(req, res){
        var widget = req.body;
        var wgid = req.params.wgid;
        for (var wg in widgets) {
            if (widgets[wg]._id === wgid) {
                widgets[wg] = widget;
                break;
            }
        }
        res.sendStatus(200);
    }

    function sortWidget(req, res) {
        var pageId = req.params.pid;
        var start = req.query.start;
        var end = req.query.end;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        res.sendStatus(200);
    }



    function deleteWidget(req,res){
        var wgid = req.params.wgid;
        for (var wg in widgets) {
            if (widgets[wg]._id === wgid) {
                widgets.splice(wg, 1);
            }
        }
        res.sendStatus(200);
    }
};