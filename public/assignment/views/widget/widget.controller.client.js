(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("ChooseWidgetController", ChooseWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("FlickrController", FlickrController);


    function WidgetListController($routeParams, WidgetService, $sce){
        var vm = this;

        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.wid = $routeParams["wid"];


        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeImage = checkSafeImage;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;


        function init(){
            WidgetService.findWidgetsByPageId(vm.pid)
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(){

                });
        }
        init();


        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeImage(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeYoutubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

    }

    function ChooseWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.createWidget = createWidget;
        vm.widget = {
            "type": null,
            "_page": null,
            "rows": 0,
            "size": 0,
            "text": null,
            "deletable": false,
            "formatted": false
        };


        function createWidget(widgetType) {
            vm.widget.widgetType = widgetType;
            vm.widget.pageId = vm.pid;

            WidgetService.createWidget(vm.widget)
                .success(function (widgetId) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widgetId);
                })
                .error(function () {

                });
        }
    }


    function EditWidgetController($location, $routeParams, WidgetService){
        var vm = this;

        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.wid = $routeParams["wid"];
        vm.wgid = $routeParams["wgid"];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){

            WidgetService.findWidgetById(vm.wgid)
                .success(function(widget){
                    vm.widget = widget;
                })
                .error(function(){

                });
        }
        init();


        function updateWidget(){
            WidgetService.updateWidget(vm.wgid, vm.widget)
                .success(function(){
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(){

                });
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.wgid)
                .success(function(){
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(){

                });
        }
    }



    function FlickrController($http, $routeParams, WidgetService, MyFlickrService){
        var vm = this;

        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.wgid = $routeParams.wgid;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm){
            MyFlickrService.searchPhotos(searchTerm)
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
            var widget = {"_id": vm.wgid, widgetType: "Image", "pageId": vm.pid, "width": "100%", "url": url};
            WidgetService.UpdateWidget(vm.wgid, widget)
                .then();
        }
    }
})();