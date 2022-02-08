const request = require('request');
const urlEncode = require('urlencode');

const geoCode = (locationName, callback) => {
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlEncode(
        locationName
    )}.json?access_token=pk.eyJ1IjoicnBhbmUiLCJhIjoiY2t5cmg5cnhkMDh3cDJvcHR1ZGh2am9mdSJ9.1WfUgOF_6cgSDtvYOkg15A&limit=1`;

    request({ url: geoCodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            if (response.body.features.length === 0) {
                callback('Unable to find location', undefined);
            } else {
                const latitude = response.body.features[0].center[1];
                const longitude = response.body.features[0].center[0];

                const data = {
                    latitude,
                    longitude,
                    placeName: response.body.features[0].place_name,
                };

                callback(undefined, data);
            }
        }
    });
};

module.exports = geoCode;
