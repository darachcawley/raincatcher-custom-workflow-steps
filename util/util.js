/**
 * Created by darachcawley on 14/03/2017.
 */
'use strict';

function getFormattedTime(date, cb) {
    if(date && date.getHours() > 0 && date.getMinutes() > 0){
        cb( ('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2));
    }else{
        cb( $filter('date')(new Date(), 'HH:mm', 'UTC'));
    }
}

// take a time format of "HH:mm" and return a date - make sure to set seconds to 0
function getFormattedDate(oldDate) {
    var newDate = new Date();
    if(oldDate) {
        var pastDate = new Date(oldDate);
        return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), pastDate.getHours(), pastDate.getMinutes(), 0);
    }else{
        return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0);
    }
}

function combineDateTime(time, date) {
    return (time && date) ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()): null;
}

function calculateWaitingTimeNow (pastTime, nowTime) {
    return Math.floor(((new Date(nowTime) - new Date(pastTime)) / 1000 ) / 60 );
}

function getWorkOrderFromScope(scope){
    return scope.$parent.$parent.ctrl.workorder;
}

function getResultFromScope(scope){
    return scope.$parent.$parent.ctrl.result;
}


module.exports.getFormattedTime = getFormattedTime;
module.exports.getFormattedDate = getFormattedDate;
module.exports.combineDateTime = combineDateTime;
module.exports.calculateWaitingTimeNow = calculateWaitingTimeNow;
module.exports.getWorkOrderFromScope = getWorkOrderFromScope;
module.exports.getResultFromScope = getResultFromScope;