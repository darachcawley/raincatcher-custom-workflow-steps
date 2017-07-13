'use strict';

function processGPSLocation(_options){
    return new Promise(function(resolve, reject){
        var foundLocation = null;

        //testing
        //var location = [];
        //location.push('52.310131339684446');
        //location.push('-7.119140622500026');
        //foundLocation = [{location: location}];
        //cb(foundLocation);

        if(navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                var location = [];
                var crd = pos.coords;
                //console.log('Your current position is:');
                //console.log('Latitude : ' + crd.latitude);
                //console.log('Longitude: ' + crd.longitude);
                //console.log('More or less ' + crd.accuracy + ' meters.');
                //alert('Latitude : ' + crd.latitude+', Longitude: ' + crd.longitude);

                location.push(crd.latitude);
                location.push(crd.longitude);

                foundLocation = [{location: location}];
                console.log('Callback done from GPS location success');
                return resolve(foundLocation[0]);
            },  function geoError(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
                foundLocation = null;
                console.log('Callback done from GPS location failure');
                return reject(foundLocation);
            }, _options);
        } else {
            console.log('Geo location not supported');
            foundLocation = null;
            reject(foundLocation);
        }
    });
}

module.exports.processGPSLocation = processGPSLocation;