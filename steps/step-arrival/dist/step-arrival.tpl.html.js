var ngModule;
try {
  ngModule = angular.module('wfm.step-arrival');
} catch (e) {
  ngModule = angular.module('wfm.step-arrival', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/step-arrival.tpl.html',
    '\n' +
    '\n' +
    '<md-list class="step-arrival screen-bg">\n' +
    '  <md-subheader class="details-banner">Arrival</md-subheader>\n' +
    '\n' +
    '  <md-list-item class="md-2-line md-long-text">\n' +
    '    <md-icon md-font-set="material-icons" class="icon-color">timer</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <p class="step-list-title primary-text">{{stepGeneric.timeOnSite}}</p>\n' +
    '      <small class="md-body-2 secondary-text">Time on Site</small>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-divider></md-divider>\n' +
    '\n' +
    '  <md-list-item class="md-2-line md-long-text">\n' +
    '    <md-icon md-font-set="material-icons" class="icon-color">place</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <p class="step-list-title primary-text">\n' +
    '        {{stepGeneric.arrivalLocation[0]}},\n' +
    '        <br>{{stepGeneric.arrivalLocation[1]}}</p>\n' +
    '      <small class="md-body-2 secondary-text">Arrival Location</small>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item>\n' +
    '      <div layout="row" class="step-generic-padding-lo-row" style="margin-bottom: 75px;"></div>\n' +
    '  </md-list-item>\n' +
    '</md-list>');
}]);
