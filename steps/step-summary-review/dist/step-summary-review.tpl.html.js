var ngModule;
try {
  ngModule = angular.module('wfm.step-summary-review');
} catch (e) {
  ngModule = angular.module('wfm.step-summary-review', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/step-summary-review.tpl.html',
    '<md-list class="step-arrival">\n' +
    '  <md-subheader class="details-banner">Review</md-subheader>\n' +
    '  <md-list-item class="md-2-line md-long-text" >\n' +
    '    <md-icon md-font-set="material-icons" class="icon-color">comment</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <p class="epod-list-title primary-text">{{stepGeneric.comments}}</p>\n' +
    '        <small class="md-body-2 secondary-text">Comments</small>\n' +
    '      </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-divider></md-divider>\n' +
    '\n' +
    '  <md-list-item ng-if="stepGeneric.modifiedTimeOnSite" class="md-2-line md-long-text" >\n' +
    '    <md-icon md-font-set="material-icons" class="icon-color">update</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <p class="step-list-title primary-text">{{stepGeneric.modifiedTimeOnSite}}</p>\n' +
    '      <small class="md-body-2 secondary-text">Updated Time on Site</small>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item>\n' +
    '    <div layout="row" class="step-generic-padding-lo-row" style="margin-bottom: 75px;"></div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '</md-list>');
}]);
