// Инициализация графиков после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Данные для графика трендов эффективности
    const performanceTrendsChart = new Chart(
        document.getElementById('performanceTrendsChart'),
        {
            type: 'line',
            data: {
                labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
                datasets: [
                    {
                        label: 'Общая эффективность',
                        data: [82, 85, 84, 87, 85, 85],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Выполнение задач',
                        data: [88, 90, 89, 91, 90, 92],
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1
                    },
                    {
                        label: 'Качество работы',
                        data: [75, 76, 77, 78, 77, 78],
                        borderColor: 'rgb(255, 205, 86)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Динамика показателей эффективности'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        }
    );

    // Данные для графика эффективности по отделам
    const departmentPerformanceChart = new Chart(
        document.getElementById('departmentPerformanceChart'),
        {
            type: 'bar',
            data: {
                labels: ['Разработка', 'Маркетинг', 'Продажи', 'HR', 'Финансы'],
                datasets: [
                    {
                        label: 'Эффективность',
                        data: [95, 88, 75, 85, 82],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(255, 205, 86, 0.5)',
                            'rgba(153, 102, 255, 0.5)'
                        ],
                        borderColor: [
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)',
                            'rgb(255, 205, 86)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Сравнение эффективности отделов'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        }
    );

    // Обработчики событий для модальных окон
    document.querySelectorAll('.--jb-modal').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            // Здесь можно добавить логику открытия модального окна
            console.log(`Открытие модального окна: ${target}`);
        });
    });
});