try {

    const getData = async () => {
        const data = await fetch('./data.json');
        return await data.json();        
    }
    
    const initChart = async () => {
        const chartData = await getData();
        const xAxisLabels = chartData.map((item) => item.day);
        const yAxisAmounts = chartData.map((item) => item.amount);
        const ctx = document.getElementById('expense-chart');


        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: xAxisLabels,
            datasets: [
                {                
                    data: yAxisAmounts,
                    backgroundColor: [
                        'hsl(10, 79%, 65%)',
                        'hsl(10, 79%, 65%)',
                        'hsl(186, 34%, 60%)',
                        'hsl(10, 79%, 65%)',
                        'hsl(10, 79%, 65%)',
                        'hsl(10, 79%, 65%)',
                        'hsl(10, 79%, 65%)'
                    ],                   
                    borderSkipped: false,
                    borderRadius: 4,
                    barThickness: 35,
                    hoverBackgroundColor: [
                        'hsl(10,100%,76%)',
                        'hsl(10,100%,76%)',
                        'hsl(187,49%,80%)',
                        'hsl(10,100%,76%)',
                        'hsl(10,100%,76%)',
                        'hsl(10,100%,76%)',
                        'hsl(10,100%,76%)',
                    ]
                }
            ]
            },
            options: {
                scales: {
                    x: {
                        display: true,  
                        ticks:{
                            color: 'hsl(28, 10%, 53%)',
                            font: {                                
                                size: 11,
                                family: "'DM Sans', sans-serif"
                            }
                        },
                        grid: {                                                    
                            display: false,
                        },                        
                    },
                    y: {
                        beginAtZero: true,
                        display: false
                    }
                },
                plugins: {
					legend: {
						display: false,
					},
					title: {
						display: false,
					},
                    tooltip: {
						enabled: true,						
						backgroundColor: 'hsl(25, 47%, 15%)',
						borderColor: 'hsl(25, 47%, 15%)',
						bodyColor: 'hsl(33, 100%, 98%)',                        						                      					
						bodySpacing: 3,
						cornerRadius: 4,
						displayColors: false,
						bodyFont: {
							weight: '500',
                            size: 13,
                            family: "'DM Sans', sans-serif"
						},

						callbacks: {
                            title: function (context) {                                
								return '';
							},
							label: function (context) {
								return '$'+context.formattedValue;
							},
						},
					},
                },
            }
        });
    }

    initChart();

} catch (error) {
    console.log('Error statement:', error);
}