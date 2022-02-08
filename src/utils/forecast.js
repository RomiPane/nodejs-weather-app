const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=86d2ffdc602d5b5655b32222697d70e4&query=${latitude},${longitude}&units=m`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            return callback('Unable to connect to weather service', undefined);
        } else if (response.body.error) {
            return callback('Unable to fetch weather info', undefined);
        }

        const temperature = response.body.current.temperature;
        const feelsLike = response.body.current.feelslike;
        const description = response.body.current.weather_descriptions[0];
        const isDay = response.body.current.is_day;
        const humidity = response.body.current.humidity;

        const forecast = description + '. It is currently ' + temperature + ' degrees but it feels like ' + feelsLike + ' degrees out.';
        const data = {
            temperature,
            feelsLike,
            forecast,
            isDay,
            humidity,
        };

        callback(undefined, data);
    });
};

module.exports = forecast;
