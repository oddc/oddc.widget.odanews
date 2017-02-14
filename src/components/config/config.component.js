(function () {
    'use strict';

    angular.module('oddc.widget.odanews')
        .component('config', {
            'templateUrl': 'src/components/config/config.component.html',
            'controller': configController,
            'controllerAs': 'configController'
        });

    configController.$inject = ['widgetState', 'odanewsService', '$state'];

    function configController(widgetState, odanewsService, $state) {
        var self = this;

        self.odanewsService = odanewsService;
        self.selectedFeedName = '';
        self.noFeedSelectedError = false;
        self.buttonText = 'Speichern';

        self.$onInit = function() {
            widgetState.setBackButtonState('index');
            if (odanewsService.getItems() === null) {
                odanewsService.loadNews()
                    .then(function(){
                        self.selectedFeedName = self.odanewsService.getFeedName();
                    });
            }
            self.selectedFeedName = self.odanewsService.getFeedName();
        };

        self.saveFeedName = function() {
            if (self.selectedFeedName != '') {
                self.buttonText = 'Bitte warten...';
                odanewsService.saveFeedName(self.selectedFeedName)
                    .then(function () {
                        $state.go('index');
                    })
                    .catch(function error(){
                        self.buttonText = 'Speichern';
                    });
            } else {
                self.noFeedSelectedError = true;
            }
        }


    }

})();