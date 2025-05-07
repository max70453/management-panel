document.addEventListener('DOMContentLoaded', function() {
    // Инициализация графиков
    initTurnoverChart();
    initHiringChart();
    initDepartmentChart();

    // Обработчики событий для фильтров
    document.getElementById('reportType').addEventListener('change', updateReports);
    document.getElementById('reportPeriod').addEventListener('change', updateReports);

    // Обработчики для чекбоксов метрик
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateReports);
    });
});

// График текучести кадров
function initTurnoverChart() {
    const ctx = document.getElementById('turnoverChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Текучесть кадров (%)',
                data: [15, 13, 12, 14, 12, 11],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Динамика текучести кадров'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20
                }
            }
        }
    });
}

// График эффективности найма
function initHiringChart() {
    const ctx = document.getElementById('hiringChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Нанято',
                data: [8, 12, 15, 10, 14, 16],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }, {
                label: 'Успешно прошли испытательный срок',
                data: [7, 10, 13, 9, 12, 15],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Эффективность найма'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Диаграмма распределения по отделам
function initDepartmentChart() {
    const ctx = document.getElementById('departmentChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['IT', 'Продажи', 'Маркетинг', 'HR', 'Финансы', 'Производство'],
            datasets: [{
                data: [45, 30, 25, 15, 20, 110],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
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
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Распределение сотрудников по отделам'
                }
            }
        }
    });
}

// Обновление отчетов при изменении фильтров
function updateReports() {
    const reportType = document.getElementById('reportType').value;
    const period = document.getElementById('reportPeriod').value;
    const metrics = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    // Обновление статистики
    updateStatistics(reportType, period);

    // Обновление видимости графиков в зависимости от выбранных метрик
    document.getElementById('turnoverChart').closest('.card').style.display = 
        metrics.includes('turnover') ? 'block' : 'none';
    document.getElementById('hiringChart').closest('.card').style.display = 
        metrics.includes('hiring') ? 'block' : 'none';
    document.getElementById('departmentChart').closest('.card').style.display = 
        metrics.includes('distribution') ? 'block' : 'none';
}

// Обновление статистических данных
function updateStatistics(reportType, period) {
    // В реальном приложении здесь был бы запрос к API
    // Демонстрационные данные
    const stats = {
        operational: {
            day: { total: 245, experience: '3.5', turnover: 12 },
            week: { total: 242, experience: '3.6', turnover: 11 },
            month: { total: 238, experience: '3.7', turnover: 10 }
        },
        periodic: {
            month: { total: 235, experience: '3.8', turnover: 9 },
            quarter: { total: 230, experience: '3.9', turnover: 8 },
            year: { total: 225, experience: '4.0', turnover: 7 }
        }
    };

    const defaultStats = { total: 245, experience: '3.5', turnover: 12 };
    const currentStats = stats[reportType]?.[period] || defaultStats;

    document.getElementById('totalEmployees').textContent = currentStats.total;
    document.getElementById('averageExperience').textContent = currentStats.experience + ' года';
    document.getElementById('turnoverRate').textContent = currentStats.turnover + '%';
}