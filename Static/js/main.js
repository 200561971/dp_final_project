document.addEventListener('DOMContentLoaded', function () {
    var chartContainer = document.getElementById('chart-container');
    var chartSelect = document.getElementById('chart-select');
    var chartForm = document.getElementById('chart-form');
    var currentChart; // Declare currentChart variable

    chartForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        var selectedChart = chartSelect.value;
        clearChartContainer(); // Clear the existing chart (if any)

        var newChartCanvas = document.createElement('canvas');
        newChartCanvas.id = 'chart-container';
        chartContainer.appendChild(newChartCanvas);
        
        if (selectedChart === 'bar') {
            fetchBarChartData();
        } else if (selectedChart === 'pie') {
            fetchPieChartData();
        } else if (selectedChart === 'line') {
            fetchLineChartData();
        }
    });

    // Function to clear the chart container and destroy the current chart instance
    function clearChartContainer() {
        if (currentChart) {
            currentChart.destroy();
        }
        chartContainer.innerHTML = '';
    }




    // ================= Fetching Data======================
    
    //=====Fetch Barchart Data=====
    function fetchBarChartData() {
        fetch('/barchart_data')
            .then(response => response.json())
            .then(data => {
                const labels = data.labels;
                const values = data.values;
                drawBarChart(labels, values);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    //=====Fetch LineChart Data=====
    function fetchLineChartData() {
        fetch('/linechart_data')
            .then(response => response.json())
            .then(data => {
                const labels = data.labels;
                const values = data.values;
                drawLineChart(labels, values);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    //====== Fetch Piechart Data
    function fetchPieChartData() {
        fetch('/piechart_data')
            .then(response => response.json())
            .then(data => {
                const labels = data.labels;
                const values = data.values;
                drawPieChart(labels, values);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    

    //================ Displaying Chart============

    //=====Barchart==============
    function drawBarChart(labels, values) {
        // Sample Bar Chart Data
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Sample Bar Chart',
                    data: values,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }
            ]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        };

        currentChart = new Chart(chartContainer, config); // Assign the currentChart variable
    }

    //=====PieChart==============
    function drawPieChart(labels, values) {
        // Sample Pie Chart Data
        const data = {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }
            ]
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        };

        currentChart = new Chart(chartContainer, config); // Assign the currentChart variable
    }


    
    //=====LineChart==============

    function drawLineChart(labels, values) {
        // Sample Line Chart Data
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Sample Line Chart',
                    data: values,
                    borderColor: ['rgba(255, 99, 132, 1)'],
                    borderWidth: 2,
                    fill: false
                }
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        };

        currentChart = new Chart(chartContainer, config); // Assign the currentChart variable
    }

  

});