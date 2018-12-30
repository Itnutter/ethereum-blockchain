function loadChart() {
  
  var data = [];

  $('.votes').each(function() {
    data.push({
      name: $(this).attr("data-name"),
      data: [Number($(this).attr("data-votes"))] 
    })
  })

  Highcharts.chart('container', {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Stats'
      },
      xAxis: {
          categories: ['Votes']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'contestants'
          }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: data
  });
}