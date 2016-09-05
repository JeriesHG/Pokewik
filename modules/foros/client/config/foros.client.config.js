(function () {
  'use strict';

  angular
    .module('foros')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Foros',
      state: 'foros',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'foros', {
      title: 'List Foros',
      state: 'foros.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'foros', {
      title: 'Create Foro',
      state: 'foros.create',
      roles: ['user']
    });
  }
}());
