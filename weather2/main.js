const today = new Date();
let city = 'auto:ip';
const apiKey = '3864d006583c4215bbb150302192105';
let data = [];
let temps = [];

function findData() {
    if (document.getElementById("City").value != null) {
        data = [];
        temps = [];
        getData().then(() => {
            console.log("Data loaded");
            getTemperature();
        }).catch(error => {
            console.log(error);
        });
    }
}

async function getData() {
    let date;
    city = document.getElementById("City").value;
    for (let i = 7; i > 0; i--) {
        if ((today.getDate() - i) > 0) {
             date = `2019-0${today.getMonth() + 1}-${today.getDate() - i}`;
        } else {
            date = `2019-0${today.getMonth()}-${31 - (i - today.getDate())}`;
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
    const title = document.getElementById("titleElement");
    title.textContent = data[0].location.name;

    const parent = document.getElementById("Chart");

    const lineElement = document.getElementById("lineChart");
    parent.removeChild(lineElement);

    const newlineChartElement = document.createElement('canvas');
    parent.appendChild(newlineChartElement);
    newlineChartElement.setAttribute('id', 'lineChart');


    const maxElement = document.getElementById("maxChart");
    parent.removeChild(maxElement);

    const newMaxChartElement = document.createElement('canvas');
    parent.appendChild(newMaxChartElement);
    newMaxChartElement.setAttribute('id', 'maxChart');

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
            if (temps[i][j][0] % 24 === 0) {

                if ((today.getDate() - 7) > 0) {
                    timeData.push(`${(today.getDate() - 7) + (temps[i][j][0] / 24)}` + '  June');
                } else {
                    timeData.push(`${((today.getDate() - 7 )+ 31) + (temps[i][j][0] / 24)}` + '  May');
                }
            } else {
                timeData.push(element - (24 * Math.floor(temps[i][j][0] / 24)));
            }
        }
    }

    const lineChartCanvas = document.getElementById('lineChart').getContext('2d');

    let lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 'Temperature in C° every hour for the last 7 days',
                data: temperatureData,
                fill: false,
                borderColor: 'rgba(255, 0, 0, 0.5)',
                pointBackgroundColor: 'rgba(0, 100, 0, 0.5)',
                borderWidth: '2',
                pointBorderWidth: '0.5',
                pointRadius: '0'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return value + '°';
                        }
                    }
                }],
                xAxes: [{

                }]
            }
        }
    });

    let maxChartCanvas = document.getElementById('maxChart').getContext('2d');
    let maxChart = new Chart(maxChartCanvas, {
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