var ngModule;
try {
  ngModule = angular.module('wfm.step-arrival');
} catch (e) {
  ngModule = angular.module('wfm.step-arrival', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/step-arrival-form.tpl.html',
    '<md-list class="screen-bg">\n' +
    '    <md-list-item class="md-2-line md-long-text">\n' +
    '      <md-icon md-font-set="material-icons" class="icon-color">account_circle</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <p class="step-list-title primary-text">{{ctrl.workorder.title}}</p>\n' +
    '        <small class="md-body-2 secondary-text">Title</small>\n' +
    '      </div>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-divider></md-divider>\n' +
    '\n' +
    '    <md-list-item>\n' +
    '        <br>\n' +
    '        <md-input-container class="step-input-container">\n' +
    '            <label class="label-text" for="date">Summary</label>\n' +
    '            <input class="input-text" type="text" name="date" ng-model="ctrl.workorder.summary" ng-disabled="true">\n' +
    '        </md-input-container>\n' +
    '    </md-list-item>\n' +
    '    <md-divider></md-divider>\n' +
    '\n' +
    '    <md-subheader class="details-banner">Details</md-subheader>\n' +
    '    <md-list-item class="md-2-line md-long-text">\n' +
    '        <md-icon md-font-set="material-icons" class="icon-color">room</md-icon>\n' +
    '        <div class="md-list-item-text">\n' +
    '            <p class="step-list-title primary-text">\n' +
    '                {{ctrl.workorder.address}}\n' +
    '            </p>\n' +
    '            <!--<small class="md-body-2 secondary-text">{{ctrl.workorder.addressPostalCode}}</small>-->\n' +
    '        </div>\n' +
    '    </md-list-item>\n' +
    '    <md-divider></md-divider>\n' +
    '    <md-list-item>\n' +
    '        <br>\n' +
    '        <md-input-container class="step-input-container">\n' +
    '          <label class="label-text" for="date">Date</label>\n' +
    '          <input class="input-text" type="text" name="date" ng-model="ctrl.ticketDate" ng-disabled="true">\n' +
    '        </md-input-container>\n' +
    '    </md-list-item>\n' +
    '    <md-divider></md-divider>\n' +
    '    <md-list-item>\n' +
    '        <md-input-container class="step-input-container">\n' +
    '          <label class="label-text" for="loadTime">Time</label>\n' +
    '          <input class="input-text" type="text" name="loadTime" ng-model="ctrl.ticketTime" ng-disabled="true">\n' +
    '        </md-input-container>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item>\n' +
    '       <div layout="row" class="step-generic-padding-lo-row" style="margin-bottom: 75px;"></div>\n' +
    '    </md-list-item>\n' +
    '</md-list>\n' +
    '\n' +
    '  <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '      <!--<md-button class="md-primary md-hue-1" ng-click="ctrl.goBack($event)">Back</md-button>-->\n' +
    '      <md-button class="btn-call-to-action" ng-if="isLocationAvailable === true" ng-click="ctrl.onAction($event)">Arrival</md-button>\n' +
    '      <md-button class="btn-call-to-action" ng-if="isLocationAvailable === false">Retrieving GPS location...</md-button>\n' +
    '  </div>\n' +
    '');
}]);
