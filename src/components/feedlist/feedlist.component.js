(function(){
    'use strict';

    angular.module('oddc.widget.odanews')
        .component('feedlist', {
            templateUrl : 'src/components/feedlist/feedlist.component.html',
            controller: feedlistController,
            controllerAs : 'feedlistController'
        });

    feedlistController.$inject = ['odanewsService', '$log', '$window', '$state'];

    function feedlistController(odanewsService, $log, $window, $state) {
        var self = this;
        self.loading = true;
        self.error = false;
        self.odanewsService = odanewsService;

        self.actions = [
            {
                icon: 'icon-cog',
                title: 'Einstellungen',
                action: function() {
                    $state.go('config');
                }
            }
        ];


        self.$onInit = function() {
            if (odanewsService.getItems() === null) {
                odanewsService.loadNews()
                    .then(function loadNewsSuccess(){
                        self.loading = false;
                    })
                    .catch(function (error) {
                        self.error = true;
                        $log.debug('Error:', error);
                    });
            } else {
                self.loading = false;
            }
        };

        self.open = function (link) {
            $window.open(link)
        };

    }

})();