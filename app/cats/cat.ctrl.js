'use strict';

function CatCtrl($rootScope, $scope, $q) {
    const vm = this;
    vm.lastName = null;
    let defaultName = "Arbuckle";

    vm.middleName = defaultName;
    console.log(vm);

    vm.$onInit = function() {
        vm.catImage = "https://img.search.brave.com/KGBm_xyHsAacR2CaT45Yzy_5VNy06s6JxRfNl-7gVQ0/rs:fit:327:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5Y/bFhOc09mX2UwUDQx/ekdFUUdKbnpnSGFL/diZwaWQ9QXBp";
        console.log('cat initialied');
        vm.lastName = vm.lastName || 'Arbuckle';

        $scope.$on("onAddResult", () => {
            console.log("Cat Ctrl : onAddResult triggered");
        });

        $rootScope.$on('triggerInterval', () => {
            console.log('Interval triggered by dog');
        });

        $scope.$emit('onCatInit');

        var promises = $q.all([
            fetchSite('https://otr-backend-service-us-devo.offtherecord.com/api/v1/config/app'),
            fetchSite('https://otr-backend-service-us-devo.offtherecord.com/api/v1/config/app')
        ]);

        promises.then(responses => {
            console.log("responses", responses);
        }, error => {
            console.log("Error", error);
        });
    };

    vm.changeName = function() {
        if(vm.middleName == defaultName) {
            vm.middleName = "Heinz";
        } else {
            vm.middleName = defaultName;
        }
    };

    vm.$onChanges = function(changes) {
        console.log("changes:: ", changes);
    };

    function fetchSite(site) {
        let fetchSiteDefer = $q.defer();
        const oReq = new XMLHttpRequest();
        oReq.open("GET", site);
        oReq.addEventListener("load", (response) => {
            // console.log(response);
            var currentTarget = response.currentTarget;
            if(currentTarget.status === 200) {
                fetchSiteDefer.resolve(JSON.parse(currentTarget.response));
            } else {
                fetchSiteDefer.reject(JSON.parse(currentTarget.response));
            }
        });

        oReq.send();
        return fetchSiteDefer.promise;
    }
}

angular.module('myApp')
.component('garfieldCat', {
    templateUrl: 'cats/cat.html',
    controller: CatCtrl,
    controllerAs: 'vm', // view-model or aka instance of your controller.
    bindings: {
        lastName: '@',
        personal: '<',
        onImageClick: '&',
        catImage: '@'


    }
});