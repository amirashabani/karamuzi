let colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
let chart = document.getElementById("chart");
let chart_data = {
    datasets: []
}

let r_tl = { // request for timeline
    protocol: 'http',
    domain: '217.218.215.67',
    port: '6649',
    path: 'timeline/root',
    start: '2017-05-01',
    end: '2019-05-01',
    step: '30'
}

let r_wc = { // request for wordcloud
    protocol: 'http',
    domain: '217.218.215.67',
    port: '6649',
    path: 'wordcloud/root',
    start: '2017-05-01',
    end: '2017-6-01'
}

function draw_chart(url) {
    fetch(url)
        .then((resp) => resp.json())
        .then(
            function (data) {
                chart_data['labels'] = data['dates']

                chart_data['datasets'] = []

                data['topics'].forEach(function (value, i) {
                    chart_data['datasets'].push({
                        label: value['title'],
                        data: value['points'],
                        backgroundColor: colors[i],
                        borderColor: colors[i],
                        borderWidth: 1,
                        fill: false,
                        pointBackgroundColor: colors[i]

                    })
                })

                if (chart) {
                    new Chart(chart, {
                        type: 'line',
                        data: chart_data,
                        options: {
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        maxRotation: 90
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: false
                                    }
                                }]
                            },
                            legend: {
                                position: 'top',
                                labels: {
                                    boxWidth: 5,
                                    usePointStyle: true
                                }
                            },
                            events: ['click', 'mousemove'],
                            onClick: clicked,
                            pan: {
                                enabled: true,
                                mode: 'x'
                            },

                            zoom: {
                                enabled: true,
                                mode: 'x'
                            }
                        }
                    });
                }
            }
        )
        .catch(
            function (error) {
                console.error(error)
            }
        )
}

function create_url(protocol, domain, port, path, start, end, step) {
    return `${protocol}://${domain}:${port}/${path}?start=${start}&end=${end}&step=${step}`
}

function clicked(c) {
    let element = this.getElementAtEvent(c)[0]
    let index = element['_datasetIndex']
    r_tl['path'] = `${r_tl['path']}-${index}`
    let url = create_url(r_tl['protocol'],r_tl['domain'],r_tl['port'],r_tl['path'],r_tl['start'],r_tl['end'],r_tl['step'])
    draw_chart(url)
}

let url = create_url(r_tl['protocol'],r_tl['domain'],r_tl['port'],r_tl['path'],r_tl['start'],r_tl['end'],r_tl['step'])
draw_chart(url)

$(".closeAsideNav i").click(function () {
    $(".asideNavbar").removeClass("openAsideNavbar");
    $(".mainDashboard").removeClass("leftVerticalMenu");
    $(".asideNavbar").addClass("closeAsideNavbar");
    $(".mainDashboard").addClass("wideVerticalMenu");
});

$(".openAsideNav i").click(function () {
    $(".asideNavbar").removeClass("closeAsideNavbar");
    $(".mainDashboard").removeClass("wideVerticalMenu");
    $(".asideNavbar").addClass("openAsideNavbar");
    $(".mainDashboard").addClass("leftVerticalMenu");
});

$(".closeAsideNav i").click(function () {
    $(".asideNavbar").removeClass("openAsideNavbar");
    $(".mainDashboard").removeClass("leftVerticalMenu");
    $(".asideNavbar").addClass("closeAsideNavbar");
    $(".mainDashboard").addClass("wideVerticalMenu");
});

$(".asideNavbarItems li a").click(function () {
    $(".asideNavbar").removeClass("closeAsideNavbar");
    $(".mainDashboard").removeClass("wideVerticalMenu");
    $(".asideNavbar").addClass("openAsideNavbar");
    $(".mainDashboard").addClass("leftVerticalMenu");
});