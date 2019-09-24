const url = 'url';

let colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
let chLine = document.getElementById("chLine");

fetch(url)
    .then((resp) => resp.json())
    .then(
        function(data) {
            console.log(data)
            let chartData = {
                labels: data['dates'],
                datasets: []
            }

            data['topics'].forEach(function(value, i) {
                console.log(value, i)
                chartData['datasets'].push({
                    label: value['title'],
                    data: value['points'],
                    backgroundColor: 'transparent',
                    borderColor: colors[i],
                    borderWidth: 1,
                    pointBackgroundColor: colors[i]

                })
            })
              
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
                                position: 'right',
                                labels: {
                                    boxWidth: 5
                                }
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