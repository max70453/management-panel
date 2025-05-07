// Конфигурация типов отчетов
const reportMetrics = {
    operational: {
        description: 'Оперативный отчет показывает текущие ежедневные показатели: посещаемость, производительность и активность персонала. Обновляется в режиме реального времени.',
        metrics: [
            { id: 'attendance', label: 'Посещаемость', default: true },
            { id: 'performance', label: 'Производительность', default: true },
            { id: 'activity', label: 'Активность', default: true },
            { id: 'tasks', label: 'Выполнение задач', default: false }
        ]
    },
    periodic: {
        description: 'Периодический отчет содержит агрегированные данные за выбранный период: динамика текучести кадров, эффективность найма, распределение по отделам.',
        metrics: [
            { id: 'turnover', label: 'Текучесть кадров', default: true },
            { id: 'hiring', label: 'Эффективность найма', default: true },
            { id: 'departments', label: 'Распределение по отделам', default: true },
            { id: 'experience', label: 'Средний стаж работы', default: false }
        ]
    },
    custom: {
        description: 'Настраиваемый отчет позволяет выбрать любые доступные метрики и период для детального анализа необходимых показателей.',
        metrics: [
            { id: 'turnover', label: 'Текучесть кадров', default: false },
            { id: 'hiring', label: 'Эффективность найма', default: false },
            { id: 'departments', label: 'Распределение по отделам', default: false },
            { id: 'attendance', label: 'Посещаемость', default: false },
            { id: 'performance', label: 'Производительность', default: false },
            { id: 'activity', label: 'Активность', default: false },
            { id: 'tasks', label: 'Выполнение задач', default: false },
            { id: 'experience', label: 'Средний стаж работы', default: false }
        ]
    }
};

// Данные для разных периодов
const reportData = {
    day: {
        turnover: {
            labels: ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
            data: [5, 7, 8, 6, 9, 7]
        },
        hiring: {
            labels: ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
            data: [2, 3, 1, 4, 2, 3]
        },
        departments: {
            labels: ['IT', 'Маркетинг', 'Продажи', 'HR', 'Финансы'],
            data: [40, 30, 60, 20, 30]
        }
    },
    week: {
        turnover: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            data: [8, 10, 7, 9, 11, 8]
        },
        hiring: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            data: [4, 6, 5, 7, 3, 5]
        },
        departments: {
            labels: ['IT', 'Маркетинг', 'Продажи', 'HR', 'Финансы'],
            data: [42, 33, 58, 25, 32]
        }
    },
    month: {
        turnover: {
            labels: ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'],
            data: [12, 15, 10, 8]
        },
        hiring: {
            labels: ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'],
            data: [8, 12, 15, 10]
        },
        departments: {
            labels: ['IT', 'Маркетинг', 'Продажи', 'HR', 'Финансы'],
            data: [45, 35, 65, 25, 35]
        }
    },
    quarter: {
        turnover: {
            labels: ['Янв', 'Фев', 'Мар'],
            data: [11, 13, 9]
        },
        hiring: {
            labels: ['Янв', 'Фев', 'Мар'],
            data: [15, 18, 12]
        },
        departments: {
            labels: ['IT', 'Маркетинг', 'Продажи', 'HR', 'Финансы'],
            data: [48, 38, 70, 28, 36]
        }
    },
    year: {
        turnover: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            data: [10, 12, 9, 11]
        },
        hiring: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            data: [45, 52, 38, 48]
        },
        departments: {
            labels: ['IT', 'Маркетинг', 'Продажи', 'HR', 'Финансы'],
            data: [50, 40, 75, 30, 40]
        }
    }
};

// Глобальные переменные для хранения графиков
let turnoverChart;
let hiringChart;
let departmentChart;

// Функция инициализации графиков
function initializeCharts() {
    const turnoverCtx = document.getElementById('turnoverChart').getContext('2d');
    const hiringCtx = document.getElementById('hiringChart').getContext('2d');
    const departmentCtx = document.getElementById('departmentChart').getContext('2d');

    // Инициализация графика текучести кадров
    turnoverChart = new Chart(turnoverCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Текучесть кадров (%)',
                data: [],
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
                    text: 'Динамика текучести кадров',
                    font: { size: 16 }
                },
                legend: { position: 'bottom' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Инициализация графика эффективности найма
    hiringChart = new Chart(hiringCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Успешные наймы',
                data: [],
                backgroundColor: 'rgb(75, 192, 192)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Эффективность найма',
                    font: { size: 16 }
                },
                legend: { position: 'bottom' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Инициализация диаграммы распределения по отделам
    departmentChart = new Chart(departmentCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Распределение по отделам',
                    font: { size: 16 }
                },
                legend: { position: 'bottom' }
            }
        }
    });

    // Обновление графиков при изменении периода
    document.getElementById('reportPeriod').addEventListener('change', updateCharts);
    document.getElementById('reportType').addEventListener('change', updateReportDescription);

    // Инициализация с данными по умолчанию
    updateCharts();
    updateReportDescription();
}

// Функция обновления графиков
function updateCharts() {
    const period = document.getElementById('reportPeriod').value;
    const periodData = reportData[period];

    // Обновление графика текучести кадров
    turnoverChart.data.labels = periodData.turnover.labels;
    turnoverChart.data.datasets[0].data = periodData.turnover.data;
    turnoverChart.update();

    // Обновление графика эффективности найма
    hiringChart.data.labels = periodData.hiring.labels;
    hiringChart.data.datasets[0].data = periodData.hiring.data;
    hiringChart.update();

    // Обновление диаграммы распределения по отделам
    departmentChart.data.labels = periodData.departments.labels;
    departmentChart.data.datasets[0].data = periodData.departments.data;
    departmentChart.update();

    // Обновление сводной статистики
    updateSummaryStatistics(period);
}

// Функция обновления описания типа отчета
function updateReportDescription() {
    const reportType = document.getElementById('reportType').value;
    const descriptionElement = document.getElementById('reportDescription');
    if (descriptionElement && reportMetrics[reportType]) {
        descriptionElement.textContent = reportMetrics[reportType].description;
    }
    // Обновляем список метрик при изменении типа отчета
    updateMetricsList(reportType);
}

// Функция обновления сводной статистики
function updateSummaryStatistics(period) {
    const statistics = {
        day: { total: 235, experience: '3.2 года', turnover: '8%' },
        week: { total: 240, experience: '3.3 года', turnover: '9%' },
        month: { total: 245, experience: '3.5 года', turnover: '12%' },
        quarter: { total: 250, experience: '3.7 года', turnover: '11%' },
        year: { total: 260, experience: '4.0 года', turnover: '10%' }
    };

    document.getElementById('totalEmployees').textContent = statistics[period].total;
    document.getElementById('averageExperience').textContent = statistics[period].experience;
    document.getElementById('turnoverRate').textContent = statistics[period].turnover;
}

// Обновление списка метрик
function updateMetricsList(reportType) {
    const metricsContainer = document.getElementById('metricsContainer');
    if (!metricsContainer || !reportMetrics[reportType]) return;

    metricsContainer.innerHTML = '';
    
    reportMetrics[reportType].metrics.forEach(metric => {
        const metricDiv = document.createElement('div');
        metricDiv.className = 'field';
        metricDiv.innerHTML = `
            <label class="checkbox">
                <input type="checkbox" value="${metric.id}" ${metric.default ? 'checked' : ''}>
                ${metric.label}
            </label>
        `;
        metricsContainer.appendChild(metricDiv);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    // Инициализация описания и метрик для выбранного типа отчета
    const reportType = document.getElementById('reportType').value;
    updateReportDescription();
    updateMetricsList(reportType);
});

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', function() {
    const reportTypeSelect = document.getElementById('reportType');
    if (reportTypeSelect) {
        reportTypeSelect.addEventListener('change', function() {
            updateReportDescription(this.value);
            updateMetricsList(this.value);
        });
        
        // Инициализация при загрузке страницы
        updateReportDescription(reportTypeSelect.value);
        updateMetricsList(reportTypeSelect.value);
    }
});