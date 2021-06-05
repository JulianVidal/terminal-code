const request = require('request');
const city = 'Moscow';
const apiKey = '3864d006583c4215bbb150302192105';
const data = [];

for (let i = 7; i > 0; i--) {
    const date = `2019-05-${21- i}`;
    const url = `http://api.apixu.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`;

    request(url, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            const information = JSON.parse(body);
            
            console.log(information.forecast.forecastday[0].hour[0].time + " " + information.forecast.forecastday[0].hour[0].temp_c + "c");
        }
    });
}
