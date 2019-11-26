let d3 = require("d3");
let cloud = require(".");

let colors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
    "#e6beff",
    "#9a6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
    "#808080",
    "#ffffff",
    "#000000"
];
let chart = document.getElementById("chart");
let chart_data = {
    datasets: []
};

let r_tl = {
    // request for timeline
    protocol: "http",
    domain: "217.218.215.67",
    port: "6649",
    path: "timeline/root",
    options: {
        start: "2017-05-01",
        end: "2019-05-01",
        step: "30"
    }
};

let r_wc = {
    // request for wordcloud
    protocol: "http",
    domain: "217.218.215.67",
    port: "6649",
    path: "wordcloud/root",
    options: {
        start: "2017-05-01",
        end: "2017-6-01"
    }
};

function draw_wordcloud(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(function (data) {
            words_list = [];
            for (key in data) {
                words_list.push({
                    text: key,
                    size: data[key]
                });
            }

            let layout = cloud()
                .size([800, 500])
                .words(words_list)
                .padding(5)
                .rotate(0)
                .font("Impact")
                .fontSize(function (d) {
                    return d.size;
                })
                .on("end", draw);

            layout.start();

            function draw(words) {
                d3.select("#word-cloud").append("svg")
                    .attr("width", layout.size()[0])
                    .attr("height", layout.size()[1])
                    .append("g")
                    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function (d) {
                        return d.size + "px";
                    })
                    .style("font-family", "Impact")
                    .attr("text-anchor", "middle")
                    .attr("transform", function (d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function (d) {
                        return d.text;
                    });
            }
        });
}

function draw_chart(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(function (data) {
            chart_data["labels"] = data["dates"];

            chart_data["datasets"] = [];

            data["topics"].forEach(function (value, i) {
                chart_data["datasets"].push({
                    label: value["title"],
                    data: value["points"],
                    backgroundColor: colors[i],
                    borderColor: colors[i],
                    borderWidth: 1,
                    fill: false,
                    pointBackgroundColor: colors[i]
                });
            });

            if (chart) {
                new Chart(chart, {
                    type: "line",
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
                            position: "top",
                            labels: {
                                boxWidth: 5,
                                usePointStyle: true
                            }
                        },
                        events: ["click", "mousemove"],
                        onClick: clicked,
                        pan: {
                            enabled: true,
                            mode: "x"
                        },

                        zoom: {
                            enabled: true,
                            mode: "x"
                        }
                    }
                });
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function create_url(r) {
    let result = `${r["protocol"]}://${r["domain"]}:${r["port"]}/${r["path"]}`;
    let options = r["options"];
    if (options) {
        result += "?";
        for (let key in options) {
            if (options.hasOwnProperty(key)) result += `${key}=${options[key]}&`;
        }

        result = result.slice(0, -1);
    }
    return result;
}

function clicked(c) {
    let element = this.getElementAtEvent(c)[0];
    let index = element["_datasetIndex"];
    r_tl["path"] = `${r_tl["path"]}-${index}`;
    let url = create_url(
        r_tl["protocol"],
        r_tl["domain"],
        r_tl["port"],
        r_tl["path"],
        r_tl["start"],
        r_tl["end"],
        r_tl["step"]
    );
    draw_chart(url);
}

let url = create_url(r_tl);
draw_chart(url);

url = create_url(r_wc);
draw_wordcloud(url);

$("#chart-option").click(function () {
    $("#chart-div").removeClass("hidden");
    $("#wordcloud-div").addClass("hidden");
});

$("#wordcloud-option").click(function () {
    $("#chart-div").addClass("hidden");
    $("#wordcloud-div").removeClass("hidden");
});

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