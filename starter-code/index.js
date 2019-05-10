$(document).ready(function() {
    
    $("#send-data").click(function(){
        start = $("#start-date").val();
        end = $("#end-date").val();
        currency = $("#currency").val();

        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`)
        .then((result) => {
            console.log('resultdata', result.data.bpi)

            allData = result.data.bpi
            values = Object.values(allData)
            dates = Object.keys(allData)

            console.log(dates)

            showTheChart(dates, values)
            $("#min").html(`Min value: ${currency}` + Math.min.apply(Math, values))
            $("#max").html(`Max value: ${currency}` + Math.max.apply(Math, values))
            
        })

    })
})

function showTheChart(dates, values) {
    let myChart;
    var ctx = document.getElementById('myChart').getContext('2d');

    if(typeof myChart != "undefined") {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Price Index',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

