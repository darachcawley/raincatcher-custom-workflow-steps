var ngModule;
try {
  ngModule = angular.module('wfm.step-summary-review');
} catch (e) {
  ngModule = angular.module('wfm.step-summary-review', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/step-summary-review-form.tpl.html',
    '\n' +
    '  <md-list>\n' +
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
    '    <md-list-item class="md-2-line md-long-text">\n' +
    '      <md-icon md-font-set="material-icons" class="icon-color">room</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <p class="step-list-title primary-text">\n' +
    '          {{ctrl.workorder.address}}\n' +
    '        </p>\n' +
    '        <!--<small class="md-body-2 secondary-text">{{ctrl.workorder.addressPostalCode}}</small>-->\n' +
    '      </div>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '\n' +
    '    <md-list-item>\n' +
    '      <md-icon md-font-set="material-icons" class="icon-color">query_builder</md-icon>\n' +
    '      <md-input-container class="epod-input-container">\n' +
    '        <label class="label-text" for="productDescription">Time on Site</label>\n' +
    '        <input flex="50" type="time" name="timeOnSite" ng-model="editableResults.timeOnSite" ng-change="fieldChanged(\'timeOnSite\')" placeholder="HH:mm" ng-disabled="false">\n' +
    '        <input flex="50" type="date" name="dateOnSite" ng-model="editableResults.dateOnSite" ng-change="fieldChanged(\'dateOnSite\')" placeholder="DD/MM/YYYY" ng-disabled="false">\n' +
    '        <div ng-show="ctrl.stepResultModel.modifiedTimeOnSite < ctrl.despatchTime || editableResults.timeOnSite < ctrl.depatchTime" class="danger">Time on Site cannot be before the despatch time</div>\n' +
    '      </md-input-container>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item>\n' +
    '      <md-icon md-font-set="material-icons" class="icon-color"></md-icon>\n' +
    '      <md-input-container class="step-input-container">\n' +
    '        <label class="label-text" for="productDescription">Time off Site</label>\n' +
    '        <input flex="50" type="time" name="timeOffSite" ng-model="editableResults.timeOffSite" ng-change="fieldChanged(\'timeOffSite\')" placeholder="HH:mm" ng-disabled="false">\n' +
    '        <input flex="50" type="date" name="dateOffSite" ng-model="editableResults.dateOffSite" ng-change="fieldChanged(\'dateOffSite\')" placeholder="DD/MM/YYYY" ng-disabled="false">\n' +
    '      </md-input-container>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '\n' +
    '    <md-subheader class="details-banner">Comment</md-subheader>\n' +
    '    <md-list-item>\n' +
    '    <md-input-container class="step-input-container">\n' +
    '        <label class="label-text" for="comment">Comments</label>\n' +
    '        <textarea rows="5" class="step-review-comment-box" name="comments" ng-model="ctrl.stepResultModel.comments" ng-disabled="false"></textarea>\n' +
    '      </md-input-container>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '\n' +
    '     <md-subheader class="details-banner"></md-subheader>\n' +
    '\n' +
    '    <md-list-item>\n' +
    '      <md-button class="step-review-accept-btn" ng-click="ctrl.onAction($event)" ng-disabled="ctrl.validateFields()">Accept</md-button>\n' +
    '    </md-list-item>\n' +
    '  </md-list>\n' +
    '\n' +
    '');
}]);
