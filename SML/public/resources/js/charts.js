const doughnutChart = document.getElementById('doughnutChart').getContext('2d')

Chart.defaults.global.defaultFontSize=12

const chart = new Chart(doughnutChart, {
    type: 'doughnut',
    data:{
        labels:['Facebook', 'Instagram', 'Google', 'Organic', 'Store Visit'],
        datasets:[{
            label: 'Source',
            data:[6,4,12,15,3],
            backgroundColor:['#0080ff', '#3f729b', '#FF334C', '#898182', '#B8B81B']
        }]
    },
    option:{
        title:{
            display:true,
            text:'Lead Segmentation',
            fontSize:30
        }
    } 
})






const lineChart = document.getElementById('lineChart').getContext('2d')

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize=12

const linechart = new Chart(lineChart, {
    type: 'bar',
    data:{
        labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets:[{
            label: 'Weekly Calls',
            data:[
                6,
                4,
                12,
                15,
                3,
                4,
                16
            ],
            backgroundColor:'#0080ff'
            
        }]
    },
    option:{
        title:{
            display:true,
            text:'Lead Segmentation',
            fontSize:30
        }
    } 
})