'use strict';

var app = angular.module('frontEnd_template');

app.factory('socket', function (socketFactory) {
  var service = socketFactory();
  service.forward('error');
  return service;
});
