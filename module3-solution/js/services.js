/**
 * Created by Vladimir on 01.10.2016.
 */

(function () {
    'use strict';

    angular.module('Services', ['Constants'])
        .service('MenuSearchService', MenuSearchService);

    MenuSearchService.$inject = ['$q', '$http', '$timeout', 'API_PATH', 'DEFAULT_PENDING_TIMEOUT_FOR_EMPTY_SEARCH_TERM'];
    function MenuSearchService($q, $http, $timeout, apiPath, defaultPendingTimeout) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm, pendingTimeoutForEmptySearchTerm) {
            var deferred = $q.defer();
            var result = [];

            searchTerm = (searchTerm || '').trim().toLowerCase();

            if (searchTerm === '') {
                // here we simulate a pending
                $timeout(function () {
                    deferred.reject(result);
                }, pendingTimeoutForEmptySearchTerm || defaultPendingTimeout);

                return deferred.promise;
            }

            $http({
                method: 'GET',
                url: apiPath

            }).then(function (response) {
                var menu = response.data.menu_items;

                menu.forEach(function (dish) {
                    var description = dish.description.toLowerCase();

                    if (description.indexOf(searchTerm) >= 0) {
                        result.push(dish);
                        console.log('description:', '"' + dish.description + '"');
                    }
                });

                deferred.resolve(result);

            }).catch(function (response) {
                result.push({
                    "name": "error",
                    "short_name": response.status,
                    "description": response.statusText || service.htmlToString(response.data) || response
                });

                deferred.reject(result);
            });

            return deferred.promise;
        };

        service.htmlToString = function (html) {
            var result = document.createElement('div');
            result.innerHTML = html;
            result = result.textContent || result.innerText;

            return result;
        }
    }
})()
