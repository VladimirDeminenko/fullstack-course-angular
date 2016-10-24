(function () {
    "use strict";
    /**
     * Public restaurant application. Includes the common module and ui-router.
     */
    angular.module('public', ['ui.router', 'common'])
        .constant('MENU_NOT_EXISTS_MESSAGE', 'No such menu number exists.')
        .constant('INFO_SAVED_MESSAGE', 'Your information has been saved.');
})();
