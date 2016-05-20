'use strict';

var app = angular.module('frontEnd_template');

app.controller('slash', function(socket, $scope){
  console.log('slashCtrl');
  $scope.dependencies = {
    "dependencies": {
      "body-parser": "^1.15.0",
      "bower": "^1.7.9",
      "express": "^4.13.4",
      "moment": "^2.13.0",
      "morgan": "^1.7.0",
      "path": "^0.12.7",
      "socket.io": "^1.4.6",
      "uuid": "^2.0.2"}
    }

  });

  app.controller('homeCtrl', function(socket, $scope){
    console.log('homeCtrl');

    var testFrontEnd = 'BackEnd, FrontEnd: TEST';
    socket.emit('SOCKET_TEMPLATE', testFrontEnd);

    socket.on('homeCtrl', data => {
      console.log('FR: BackEnd\n', data);
    });
  });

  app.controller('templateLoginCtrl', function($scope, $state, template_service){
    console.log('templateLoginCtrl');

    //$scope.<ARRAY> = [];

  })

  app.controller('templateRegisterCtrl', function($scope, $state, template_service){
    console.log('templateRegisterCtrl');

    //$scope.<ARRAY> = [];

  })

  app.controller('templateForgotCtrl', function($scope, $state, template_service){
    console.log('templateForgotCtrl');

    //$scope.<ARRAY> = [];

  })


  // app.controller('betaCtrl', function($scope, $state, <SERVICE NAME>){
  //   console.log('betaCtrl');
  //
  //   //$scope.<ARRAY> = [];
  //
  // })

'use strict';

var app = angular.module('frontEnd_template');

app.factory('socket', function (socketFactory) {
  var service = socketFactory();
  service.forward('error');
  return service;
});

'use strict';

var app = angular.module('frontEnd_template', [ 'ui.bootstrap', 'ui.router', 'oitozero.ngSweetAlert', 'btford.socket-io' ]);

app.config(function($stateProvider, $urlRouterProvider){


  $stateProvider
  .state('home', {
    url           : '/home' ,
    templateUrl   : 'html/home.html' ,
    controller    : 'homeCtrl'
  })
  .state('templateLogin', {
    url           : '/templateLogin' ,
    templateUrl   : 'html/templateLogin.html' ,
    controller    : 'templateLoginCtrl'
  })
  .state('templateRegister', {
    url           : '/templateRegister' ,
    templateUrl   : 'html/templateRegister.html' ,
    controller    : 'templateRegisterCtrl'
  })
  .state('templateForgot', {
    url           : '/templateForgot' ,
    templateUrl   : 'html/templateForgot.html' ,
    controller    : 'templateForgotCtrl'
  })
  // .state('< name >', {
  //   url           : '< / >' ,
  //   templateUrl   : '< / >' ,
  //   controller    : '< / >' ,
  //   resolve       : ' { < CONTROLLER PROP. NAME > : function( < PARAMS > ){ return < SERVICE NAME.METHOD( <PARAMS> ) > } }'
  // })

  ; // END OF .state(s)

  $urlRouterProvider.otherwise('/');
})

'use strict';

var app = angular.module('frontEnd_template');

app.service('template_service', function(){
  
});
