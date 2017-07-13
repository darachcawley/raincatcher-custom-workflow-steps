/**
 * Created by darachcawley on 06/03/2017.
 *
 * List the custom workflow steps to be used in this app.
 *
 * Note: keep the naming of folders exactly the same as the directives which are referenced in the workflow steps.
 */
var angular = require('angular');

angular.module('custom.steps', ['wfm.core.mediator'
    , require('../../steps/step-arrival/lib/angular/step-arrival')
    , require('../../steps/step-summary-review/lib/angular/step-summary-review')
]);

module.exports = 'custom.steps';