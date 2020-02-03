(function () {

    'use strict';

    angular
        .module('oddc.widget.odanews')
        .factory('odanewsService', odanewsServiceFactory);

    odanewsServiceFactory.$inject = ['$q', 'widgetServices'];

    function odanewsServiceFactory($q, widgetServices) {
        var _items = null;


        var _service =   {
            loadNews: loadNews,
            getItems: getItems
        };

        function loadNews() {
            return widgetServices
                .callService('getItems')
                .then(function (response) {
                    _items = response.items;
                    return true;
                })
                .catch(function (e) {
                    return $q.reject(error);
                });
        }

        function getItems() {
            return _items;
        }

        return _service;
    }

})();