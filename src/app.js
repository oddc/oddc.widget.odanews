(function(){
    'use strict';

    angular.module('oddc.widget.odanews',['widgetbuilder'])
        .config(function stateConfig($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('index', {
                    url: '/',
                    template: '<feedlist />',
                    data: {
                        cssClassNames : 'index'
                    }
                })
                .state('config', {
                    url: '/config',
                    template: '<config />',
                    data: {
                        cssClassNames : 'config'
                    }
                });

            $urlRouterProvider.otherwise('/');
        });

})();