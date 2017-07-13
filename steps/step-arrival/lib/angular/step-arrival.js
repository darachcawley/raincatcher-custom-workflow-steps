'use strict';

var ngModule = angular.module('wfm.step-arrival', ['wfm.core.mediator']);

require('../../dist/index');
var gpsLocator = require('../../../../util/gpslocation');
var utilClient = require('../../../../util/util');


ngModule.directive('stepArrival', function($templateCache) {
    return {
        restrict: 'E'
        , template: $templateCache.get('wfm-template/step-arrival.tpl.html')
        , scope: {
            stepGeneric: "=value"
        }
        , controller: function($scope, userClient, $filter) {
            var self = this;

            $scope.stepGeneric.timeOnSite = $scope.stepGeneric.timeOnSite ? $filter('date')($scope.stepGeneric.timeOnSite, 'HH:mm') : '';

            userClient.getProfile().then (function (profileData){
                $scope.profileData = profileData;
            });
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('stepArrivalForm', function($templateCache, mediator, $rootScope) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/step-arrival-form.tpl.html')
  , scope: {
    }
  , link: function(){

    }
  , controller: function($q, $scope, $filter, workorderSync) {
      console.log('stepArrivalForm controller function');
      var self = this;
      $scope.isLocationAvailable = true;


      // get the associated workorder
      self.workorder = utilClient.getWorkOrderFromScope($scope);
      self.ticketDate = self.workorder.startTimestamp ? $filter('date')(new Date(self.workorder.startTimestamp), 'dd/MM/yyyy') : '';
      self.ticketTime = self.workorder.startTimestamp ? $filter('date')(new Date(self.workorder.startTimestamp), 'HH:mm') : '';


      // setup the result model for this step
      self.stepResultModel = {
        timeOnSite: '',
        arrivalLocation: null
      };


      // get the associated workorder and update to In Progress
      $q.when(workorderSync.createManager())
        .then (function (manager){
          self.workorder = utilClient.getWorkOrderFromScope($scope);
          self.workorderManager = manager;
          // update the workorder with the status In Progress
          self.workorder.status = 'In Progress';
          self.workorderManager.update(self.workorder).then(function() {
              console.log('stepArrivalForm set workorder to In Progress');
          });
      });


      // Setup location options
      $scope.options = {
          desiredAccuracy : 20,
          distanceFilter : 0,
          enableHighAccuracy : true,
          timeout: 5000,
          maximumAge: 0
      };


      // Subscribing to the 'done' state for the 'wfm:gps:location:update' topic.
      mediator.subscribe('done:wfm:gps:location:update', function(loc, workorderId) {
          var location = [];
          location.push(loc.coords.latitude);
          location.push(loc.coords.longitude);

          self.stepResultModel.arrivalLocation = location;
      });


      self.processStep = function(cb){
          self.stepResultModel.timeOnSite = new Date();

          // request the location via mediator
          mediator.publish('wfm:gps:location:update', self.workorder.id, $scope.options);

          // set a time interval and then move on, if the location isn't available then it isn't saved
          setTimeout(function() {
            cb();
          }, 5000);

      };


      self.goBack = function(ev){
          mediator.publish('wfm:workflow:step:back', self.stepResultModel);
          ev.preventDefault();
          ev.stopPropagation();
      };


      self.completeStep = function(ev){
          mediator.publish('wfm:workflow:step:done', self.stepResultModel);
          $scope.isLocationAvailable = true;
          $rootScope.isLoading = false;
          //$scope.$apply();
          ev.preventDefault();
          ev.stopPropagation();
      };


      self.onAction = function(ev) {
        self.ev = ev;
        $rootScope.isLoading = true;
        $scope.isLocationAvailable = false;
        self.processStep(function(){
          self.completeStep(ev);
        });
      };

    }
  , controllerAs: 'ctrl'
  };
})
;


module.exports = 'wfm.step-arrival';
