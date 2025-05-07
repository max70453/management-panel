document.addEventListener('DOMContentLoaded', function() {
    const employeesCtx = document.getElementById('employees-growth-chart').getContext('2d');
    
    // Данные для графика
    const data = {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        datasets: [{
            label: 'Количество сотрудников',
            data: [280, 290, 295, 305, 310, 315, 318, 320, 322, 324, 324, 324],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    // Настройки графика
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 250,
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    };

    // Создание графика
    new Chart(employeesCtx, config);
});