const url = 'url';

let colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];
let chLine = document.getElementById("chLine");

fetch(url)
    .then((resp) => resp.json())
    .then(
        function(data) {
            console.log(data)
            let chartData = {
                labels: data['dates'],
                datasets: [
                    {
                        label: data['topics'][0]['title'],
                        data: data['topics'][0]['points'],
                        backgroundColor: 'transparent',
                        borderColor: colors[0],
                        borderWidth: 1,
                        pointBackgroundColor: colors[0]
                    },
                    {
                        label: data['topics'][0]['title'],
                        data: data['topics'][1]['points'],
                        backgroundColor: 'transparent',
                        borderColor: colors[1],
                        borderWidth: 1,
                        pointBackgroundColor: colors[1]
                    }
                ]
            };
              
            if (chLine) {
                new Chart(chLine,{
                        type: 'line',
                        data: chartData,
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                    beginAtZero: false
                                    }
                                }]
                            },
                            legend: {
                                position: 'right'
                            }
                        }
                    }
                );
            }
        }
    )
    .catch(
        function(error) {
            console.error(error)
        }
    )