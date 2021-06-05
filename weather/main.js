const today = new Date();
const city = 'Moscow';
const apiKey = '3864d006583c4215bbb150302192105';
const data = [];
const temps = [];

getData().then(response => {
    console.log("Data loaded");
    getTemperature();
}).catch(error => {
    console.log(error);
});


async function getData() {
    let date;
    for (let i = 7; i > 0; i--) {
        if ((today.getDate() - i) > 0) {
             date = `2019-0${today.getMonth() + 1}-${today.getDate() - i}`;
        } else {
            date = `2019-0${today.getMonth()}-${30 - i}`;
        }
        const url = `http://api.apixu.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`;
        
        const response = await fetch(url);
        const information = await response.json();
        data.push(information);
    }
}

 function getTemperature() {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        temps[i] = [];
        for (let j = 0; j < 24; j++) {
            const h = element.forecast.forecastday[0].hour[j].time[11] + element.forecast.forecastday[0].hour[j].time[12]; 
            const time = Number(h) + (24 * i);
            const temperature = element.forecast.forecastday[0].hour[j].temp_c;

            temps[i].push([time, temperature]);
            
        }
        
    }
    console.log("Loaded temperatures");
    makeGraph();
}


function makeGraph() {
    const temperatureData = [];
    const timeData = [];
    const maximums = [];
    const minimums = [];
    
    for (let i = 0; i < temps.length; i++) {
        let maxRecord = -Infinity;
        let minRecord = Infinity;

        for (let j = 0; j < temps[i].length; j++) {
            const element = temps[i][j][1];
            temperatureData.push(element);
            if (maxRecord < element) {
                maxRecord = element;
            }
            if (minRecord > element) {
                minRecord = element;
            }
        }
        maximums.push(maxRecord);
        minimums.push(minRecord);
    }
    for (let i = 0; i < temps.length; i++) {
        for (let j = 0; j < temps[i].length; j++) {
            const element = temps[i][j][0];
            if (temps[i][j][0] % 24 == 0) {
                timeData.push(`${15 + (temps[i][j][0] / 24)}` + '  May');
            } else {
                timeData.push(element - (24 * Math.floor(temps[i][j][0] / 24)));
            }
        }
    }

    var lineChartCanvas = document.getElementById('lineChart').getContext('2d');
    var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 'Temperature every hour for the last 7 days',
                data: temperatureData,
                backgroundColor: 'rgba(255, 0, 0, 0.0)',
                borderColor: 'rgba(255, 0, 0, 0.5)',
                pointBackgroundColor: 'rgba(0, 100, 0, 0.5)',
                borderWidth: '2',
                pointBorderWidth: '0.5',
                pointRadius: '2'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{

                }]
            }
        }
    });

    var maxChartCanvas = document.getElementById('maxChart').getContext('2d');
    var lineChart = new Chart(maxChartCanvas, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [{
                label: 'Min temperatures',
                data: minimums,
                borderColor: 'rgba(100, 255, 100, 0.5)',
                backgroundColor: 'rgba(100, 255, 100, 0.8)',
                lineTension: '0'
            },
            {
                label: 'Max temperatures',
                data: maximums,
                borderColor: 'rgba(80, 120, 220, 0.5)',
                backgroundColor: 'rgba(80, 120, 220, 0.8)',
                lineTension: '0'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{

                }]
            }
        }
    });
    console.log("Chart made");
}