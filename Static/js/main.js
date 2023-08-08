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
        newChartCanvas.width = '800px';
        newChartCanvas.height = '600px';
        chartContainer.appendChild(newChartCanvas);
        
        if (selectedChart === 'bar') {
            drawBarChart();
        } else if (selectedChart === 'pie') {
            drawPieChart();
        } else if (selectedChart === 'line') {
            drawLineChart();
        }
    });

    // Function to clear the chart container and destroy the current chart instance
    function clearChartContainer() {
        if (currentChart) {
            currentChart.destroy();
        }
        chartContainer.innerHTML = '';
    }

    function drawBarChart() {
        // Sample Bar Chart Data
        const data = {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [
                {
                    label: 'Sample Bar Chart',
                    data: [10, 20, 15, 30],
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
                responsive: false,
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

    function drawPieChart() {
        // Sample Pie Chart Data
        const data = {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [
                {
                    data: [30, 10, 20, 15],
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
                responsive: false,
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

    function drawLineChart() {
        // Sample Line Chart Data
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'Sample Line Chart',
                    data: [10, 20, 15, 30, 25],
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
                responsive: false,
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

    // Initial chart rendering
    drawBarChart();

});