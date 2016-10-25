(function () {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);

    MenuService.$inject = ['$q', '$http', 'ApiPath'];
    function MenuService($q, $http, ApiPath) {
        var service = this;

        service.getCategories = function () {
            return $http.get(ApiPath + '/categories.json').then(function (response) {
                return response.data;
            });
        };

        service.getMenuItems = function (category) {
            var config = {};
            if (category) {
                config.params = {'category': category};
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
                return response.data;
            });
        };

        service.getMenuItem = function (shortName) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: ApiPath + '/menu_items/' + shortName + '.json'

            }).then(function (response) {
                deferred.resolve(response.data);

            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        service.existsMenuItem = function (shortName) {
            var deferred = $q.defer();

            service.getMenuItem(shortName)
                .then(function (response) {
                    console.info('then.response:', response);
                    deferred.resolve(true);
                }).catch(function (response) {
                    console.info('catch.response:', response);
                    deferred.reject(false);
                }
            );

            return deferred.promise;
        }
    }
})();
