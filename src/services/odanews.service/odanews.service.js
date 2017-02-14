(function () {

    'use strict';

    angular
        .module('oddc.widget.odanews')
        .factory('odanewsService', odanewsServiceFactory);

    odanewsServiceFactory.$inject = ['$log', '$q', 'widgetServices', 'widgetConfiguration'];

    function odanewsServiceFactory($log, $q, widgetServices, widgetConfiguration) {
        var _items = null;
        var _feedName = null;

        var _service =   {
            loadNews: loadNews,
            getItems: getItems,
            getFeedName: getFeedName,
            saveFeedName: saveFeedName
        };

        function loadNews() {
            return widgetServices
                .callService('loadFeedName')
                .then(function onLoadFeedNameSuccess(response) {
                    // if there is no custom feedName set users feedName from widgetConfiguration:
                    if (response.error) {
                        $log.debug('Die property-API meldet: ',response.message);
                        _feedName = widgetConfiguration.feedName;
                    } else {
                        _feedName = response.propertyValueString;
                    }
                    return widgetServices.callService('loadFeed', {
                        feedName: encodeURIComponent(_feedName)
                    });
                })
                .then(function onLoadFeedSuccess(response) {
                    if (response.error) {
                        return $q.reject(response.message);
                    } else {
                        _items = response.items;
                        return true;
                    }
                })
                .catch(function onError(error) {
                    return $q.reject(error);
                });
        }

        function getItems() {
            return _items;
        }

        function getFeedName() {
            return _feedName;
        }

        function saveFeedName(feedName) {
            return widgetServices
                .callService('getCurrentUser')
                .then(function onGetCurrentUserSuccess(response) {
                    return widgetServices.callService('saveFeedName', {
                        "id": {
                            "widgetIdentifier": "oddc.widget.odanews",
                            "userId": response.openId,
                            "propertyKey": "feedName",
                            "globalProperty": false
                        },
                        "propertyValueString": feedName
                    });
                })
                .then(function onSaveFeedNameSuccess(response) {
                    _feedName = feedName;
                    return widgetServices.callService('loadFeed', {
                        feedName: encodeURIComponent(_feedName)
                    });
                })
                .then(function onLoadWeatherSuccess(response){
                    _items = response.items;
                    return true;
                })
                .catch(function onError(error) {
                    return $q.reject(error);
                });
        }

        return _service;
    }

})();