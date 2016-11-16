(function(){
    angular
        .module("jgaDirectives",[])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {


        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element.sortable({
                start: function(event, ui){
                    start = $(ui.item).index();
                },
                stop: function(event, ui) {
                    end = $(ui.item).index();
                    scope.jgaSortableController.sort(start, end);
                }
            });
        }
        return {
            scope:{pid : "@"},
            link: linker,
            controller: jgaSortableController,
            controllerAs: 'jgaSortableController'
        };



        function jgaSortableController(WidgetService){

            var vm = this;
            vm.sort = sort;

            function sort(start, end){
                WidgetService.sortWidget(vm.pid, start, end)
            }
        }
    }
})();