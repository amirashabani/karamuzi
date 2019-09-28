let colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
let chart = document.getElementById("chart");
let chartData = {
    datasets: []
}

function draw_chart(url) {
    fetch(url)
    .then((resp) => resp.json())
    .then(
        function(data) {
            chartData['labels'] = data['dates']

            chartData['datasets'] = []

            data['topics'].forEach(function(value, i) {
                chartData['datasets'].push({
                    label: value['title'],
                    data: value['points'],
                    backgroundColor: 'transparent',
                    borderColor: colors[i],
                    borderWidth: 1,
                    pointBackgroundColor: colors[i]

                })
            })

            if (chart) {
                new Chart(chart,{
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
                            position: 'top',
                            labels: {
                                boxWidth: 5
                            }
                        },
                        events: ['click'],
                        onClick: clicked
                    }
                });
            }
        }
    )
    .catch(
        function(error) {
            console.error(error)
        }
    )
}

function create_url(protocol, domain, port, path, start, end, step) {
    return `${protocol}://${domain}:${port}/${path}?start=${start}&end=${end}&step=${step}`
}

function clicked(c) {
    let index = this.getElementAtEvent(c)[0]['_datasetIndex']
    r['path'] = `${r['path']}-${index}`
    let url = create_url(r['protocol'], r['domain'], r['port'], r['path'], r['start'], r['end'], r['step'])
    draw_chart(url)
}

let url = create_url(r['protocol'], r['domain'], r['port'], r['path'], r['start'], r['end'], r['step'])
draw_chart(url)
