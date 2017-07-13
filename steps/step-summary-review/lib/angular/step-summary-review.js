'use strict';

var ngModule = angular.module('wfm.step-summary-review', ['wfm.core.mediator']);

require('../../dist/index');
var utilClient = require('../../../../util/util');


ngModule.directive('stepSummaryReview', function($templateCache, $filter) {
    return {
        restrict: 'E'
        , template: $templateCache.get('wfm-template/step-summary-review.tpl.html')
        , scope: {
            stepGeneric: "=value"
        }
        , controller: function($scope) {
            var self = this;
            $scope.stepGeneric.modifiedTimeOnSite = $scope.stepGeneric.modifiedTimeOnSite ? $filter('date')($scope.stepGeneric.modifiedTimeOnSite, 'HH:mm') : '';
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('stepSummaryReviewForm', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/step-summary-review-form.tpl.html')
  , scope: {
    }
  , link: function(){

    }
  , controller: function($q, $scope, userClient, workorderSync) {
      console.log('stepSummaryReviewForm controller function');
      var self = this;

      $scope.isActionButtonDisabled = false;
      $scope.isContinueButtonDisabled = false;

      // Setup location options
      $scope.options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
      };


      // get the associated driver details
      $q.when(userClient.getProfile().then (function (profileData){
          console.log(profileData)
          $scope.profileData = profileData;
      }));

      $q.when(workorderSync.createManager())
        .then (function (manager){
          self.workorder = utilClient.getWorkOrderFromScope($scope);
          self.workorderManager = manager;
      });


      // get the associated workorder
      self.workorder = utilClient.getWorkOrderFromScope($scope);

      // setup the step result data
      self.stepResultModel = {
          comments: '',
          waitingTime: ''
      };

      var test = new Date();
      test.setHours(test.getHours()-1);
      // setup the fields from previous steps which can be edited
      $scope.editableResults = {
          timeOnSite: null,
          dateOnSite: null,
          timeOffSite: utilClient.getFormattedDate(new Date()),
          dateOffSite: utilClient.getFormattedDate(new Date())
      };

      // get the associated result & all required previous steps results
      self.result = utilClient.getResultFromScope($scope);
      if(self.result && self.result !== 'undefined' && self.result.stepResults){
          // set the contents of fields from previous steps, that can be modified in this step
          $scope.editableResults.timeOnSite = utilClient.getFormattedDate(self.result.stepResults['step-arrival'].submission.timeOnSite);
          $scope.editableResults.dateOnSite = new Date(self.result.stepResults['step-arrival'].submission.timeOnSite);
      }


      // add modified fields if changes occur
      $scope.fieldChanged = function(field){
          switch (field) {
              case 'timeOnSite':
              case 'dateOnSite':
                  self.stepResultModel.modifiedTimeOnSite = utilClient.combineDateTime($scope.editableResults.timeOnSite, $scope.editableResults.dateOnSite);
                  break;
              default:
          }
      };


      self.processStep = function(cb){
          var timeOffSite = self.stepResultModel.modifiedTimeOffSite || new Date();
          var timeOnSite = utilClient.combineDateTime($scope.editableResults.timeOnSite, $scope.editableResults.dateOnSite);
          self.stepResultModel.waitingTime = utilClient.calculateWaitingTimeNow(timeOnSite, timeOffSite);
          self.stepResultModel.timeOffSite = new Date();
          cb();
      };


      self.completeStep = function(ev){
          mediator.publish('wfm:workflow:step:done', self.stepResultModel);
          ev.preventDefault();
          ev.stopPropagation();
      };


      self.onAction = function(ev) {
        self.ev = ev;
        self.processStep(function(){
          self.completeStep(ev);
        });
      };


      self.goBack = function(ev){
          mediator.publish('wfm:workflow:step:back', self.stepResultModel);
          ev.preventDefault();
          ev.stopPropagation();
      };

      self.openMenu = function($mdOpenMenu, ev) {
          console.log(ev);
          $mdOpenMenu(ev);
      };

      self.setReturnedMaterialReason = function(index) {
          $scope.editableResults.reasonReturnedMaterial = returnedMaterialReasonCodes[index];
          self.stepResultModel.reasonReturnedMaterial = returnedMaterialReasonCodes[index];
      };

      self.validateFields = function(){
        return self.stepResultModel.modifiedTimeOnSite < self.despatchTime ||
        $scope.editableResults.timeOnSite < self.depatchTime ||
        (self.stepResultModel.modifiedTimeOnSite ?
          $scope.editableResults.dischargeStartTime < self.stepResultModel.modifiedTimeOnSite ||
          self.stepResultModel.modifiedDischargeStartTime < self.stepResultModel.modifiedTimeOnSite :
          $scope.editableResults.dischargeStartTime < $scope.editableResults.timeOnSite ||
          self.stepResultModel.modifiedDischargeStartTime < $scope.editableResults.timeOnSite) ||
        self.stepResultModel.modifiedDischargeStartTime < self.despatchTime ||
        $scope.editableResults.dischargeStartTime < self.depatchTime ||
        (self.stepResultModel.modifiedDischargeStartTime ?
          self.stepResultModel.modifiedDischargeEndTime < self.stepResultModel.modifiedDischargeStartTime ||
          $scope.editableResults.dischargeEndTime < self.stepResultModel.modifiedDischargeStartTime :
          self.stepResultModel.modifiedDischargeEndTime < $scope.editableResults.dischargeStartTime ||
          $scope.editableResults.dischargeEndTime < $scope.editableResults.dischargeStartTime) ||
        self.stepResultModel.modifiedDischargeEndTime < self.despatchTime ||
        $scope.editableResults.dischargeEndTime < self.depatchTime ||
        (self.stepResultModel.modifiedDischargeEndTime ?
          self.stepResultModel.modifiedTimeOffSite < self.stepResultModel.modifiedDischargeEndTime ||
          $scope.editableResults.timeOffSite < self.stepResultModel.modifiedDischargeEndTime :
          self.stepResultModel.modifiedTimeOffSite < $scope.editableResults.dischargeEndTime ||
          $scope.editableResults.timeOffSite < $scope.editableResults.dischargeEndTime) ||
        self.stepResultModel.modifiedTimeOffSite < self.despatchTime ||
        $scope.editableResults.timeOffSite < self.depatchTime ||
        self.stepResultModel.modifiedAddedWater < 0 ||
        self.stepResultModel.modifiedAddedWater > 500 ||
        self.stepResultModel.modifiedReturnedMaterial > self.workorder.items[0].thisLoad;
      }

    }
  , controllerAs: 'ctrl'
  };
})
;


module.exports = 'wfm.step-summary-review';
