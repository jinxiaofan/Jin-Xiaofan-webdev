(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("myController", myController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.websiteId = parseInt($routeParams['wid']);

        vm.checkSafeHTML = checkSafeHTML;
        vm.checkSafeYOUTUBE = checkSafeYOUTUBE;
        vm.checkSafeIMAGE = checkSafeIMAGE;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                vm.widgets = widgets;
            })
                .error(function () {

                });
            var allWedgets = $(".wam-widget");
            alert(allWedgets.length);
        }
        init();

        function checkSafeHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYOUTUBE(url) {
            if (url == '' || url == null) {
                return;
            }
            var parts = url.split("/");
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeIMAGE(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }


    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];
        vm.tmp =  {"_id": null, "widgetType": null, "pageId": null, "size": null, "text": null};
        vm.createNewWidget = createNewWidget;

        function createNewWidget(widgetType) {
            var tempWidget = {
                widgetType: widgetType
            };
            WidgetService.createWidget(vm.pageId, tempWidget)
                .success(function (widget) {
                tempWidget = widget;
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + tempWidget._id);
            })
                .error(function () {

                });
        }
    }

    function WidgetEditController($routeParams, WidgetService, $location) {

        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];
        vm.deleteTheWidget = deleteTheWidget;
        vm.updateTheWidget = updateTheWidget;

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .success(function (widget) {
                vm.widget = widget;
            })
                .error(function () {

                })
        }
        init();

        function deleteTheWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .success(function (status) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            })
                .error(function () {

                })
        }

        function updateTheWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget)
                .success(function (widget) {
                if (widget != '0') {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }
            })
                .error(function () {

            });
        }
    }


    function myController($http, $routeParams, WidgetService, MyFlickrService){

        var vm = this;
        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.wgid = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm){
            console.log("searchTerm");
            MyFlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {"_id": vm.wgid, widgetType: "Image", "pageId": vm.pid, "width": "100%",
                "url": url};
            WidgetService
                .UpdateWidget(vm.wgid, widget)
                .then();
        }
    }
})();