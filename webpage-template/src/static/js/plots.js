document.addEventListener('DOMContentLoaded', function() {
    // d3.csv("./BarChartData.csv").then(data => {
    //     console.log(data);
    //   });
    var barChart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Comparison Between States Population Density and Endangered Species '
        },
        xAxis: {
            categories: ['New Mexico', 'Nebraska', 'Utah', 'Oregon', 'Iowa ', 'Mississippi', 'Arizona', 'Texas', 'South Carolina', 'North Carolina', 'Hawaii', 'Illinois', 'California', ' Florida', 'New York ', 'Massachusetts'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population Density (People/Million square miles)',
                align: 'high'
            },
            labels: {
                overflow: ''
            }
        },
        // tooltip: {
        //     valueSuffix: 'millions'
        // },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'White',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
                name: 'Bird Species',
                data: [7, 5, 3, 4, 1, 7, 7, 21, 9, 3, 33, 1, 30, 23, 2, 2],
                color: '#DC143C',
                dataLabels: {
                    style: {
                        color: '#DC143C'
                    }
                }
            }, {
                name: 'Plant Species',
                data: [2, 2, 1, 1, 1, 1, 3, 1, 2, 1, 24, 1, 14, 9, 1, 1],
                color: '#DAA520',
                dataLabels: {
                    style: {
                        color: '#DAA520'
                    }
                }
            },
            {
                name: 'Density',
                data: [17.29, 25.42, 39.94, 44.81, 56.93, 63.71, 64.95, 112.82, 173.31, 218.27, 219.94, 228.02, 256.38, 410.13, 412.52, 894.44],
                color: '#9ACD32',
                dataLabels: {
                    style: {
                        color: '#9ACD32'
                    }
                }
            }
        ]
    });
});