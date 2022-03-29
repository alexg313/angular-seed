'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ui.router',
  'myApp.version'
]).
config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  $stateProvider
    .state('dogs', {
      url: '/dogs',
      views: {
          '': {
              templateUrl: 'dogs/dog.html',
              controller: 'DogCtrl as vm'
          },
          'larry': {
              template: "<b> hello I'm Larry </b>"
          }
      },
      resolve: {
        allDogs: function() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(['terrance', 'larry']);
                }, 1000);
            });
        }
      }

    })
    .state('dogs.terrier', {
        url: '/terrier', // /dogs/terrier
        templateUrl: 'dogs/terrier.html',
        controller: function($scope) {
            const vm = this;
            vm.breed = 'terrier';
            vm.animalName = 'Terrance';

            $scope.$emit('setAnimalName', vm.animalName);

        },
        controllerAs: 'vm'
    })
    .state('cats', {
      url: '/cats',
      component: 'garfieldCat'
    });

  // $stateProvider.otherwise({redirectTo: '/view1'});
}]);
