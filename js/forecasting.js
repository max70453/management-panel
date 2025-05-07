// Инициализация графиков
let headcountChart = null;
let departmentChart = null;

// Функция для генерации случайных данных (для демонстрации)
function generateMockData(months) {
    const data = [];
    let currentHeadcount = 100;
    const departments = ['IT', 'HR', 'Финансы', 'Маркетинг', 'Продажи'];
    
    for (let i = 0; i < months; i++) {
        const growth = Math.random() * 10 - 5; // Случайное изменение от -5 до +5
        currentHeadcount += growth;
        departments.forEach(department => {
            data.push({
                period: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
                department: department,
                current: Math.round(currentHeadcount / departments.length),
                forecast: Math.round((currentHeadcount / departments.length) * (1 + Math.random() * 0.1)),
                priority: Math.random() > 0.7 ? 'Высокий' : Math.random() > 0.4 ? 'Средний' : 'Низкий'
            });
        });
    }
    return data;
}

// Функция для обновления графика численности персонала
function updateHeadcountChart(data) {
    const ctx = document.getElementById('headcountForecastChart').getContext('2d');
    
    if (headcountChart) {
        headcountChart.destroy();
    }
    
    headcountChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.period),
            datasets: [
                {
                    label: 'Текущая численность',
                    data: data.map(d => d.current),
                    borderColor: '#36a2eb',
                    tension: 0.1
                },
                {
                    label: 'Прогноз',
                    data: data.map(d => d.forecast),
                    borderColor: '#ff6384',
                    tension: 0.1,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Динамика численности персонала'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Количество сотрудников'
                    }
                }
            }
        }
    });
}

// Функция для обновления графика потребностей по отделам
function updateDepartmentChart(data) {
    const ctx = document.getElementById('departmentNeedsChart').getContext('2d');
    
    // Генерируем данные по отделам
    const departments = ['IT', 'HR', 'Финансы', 'Маркетинг', 'Продажи'];
    const needs = departments.map(() => Math.floor(Math.random() * 20));
    
    if (departmentChart) {
        departmentChart.destroy();
    }
    
    departmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: departments,
            datasets: [{
                label: 'Требуемое количество сотрудников',
                data: needs,
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#ffce56',
                    '#4bc0c0',
                    '#9966ff'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Потребность в персонале по отделам'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Количество требуемых сотрудников'
                    }
                }
            }
        }
    });
}

// Функция для обновления таблицы прогноза
function updateForecastTable(data) {
    const tableBody = document.getElementById('forecastTable');
    tableBody.innerHTML = '';
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Период">${row.period}</td>
            <td data-label="Отдел">${row.department}</td>
            <td data-label="Текущая численность">${row.current}</td>
            <td data-label="Прогнозируемая численность">${row.forecast}</td>
            <td data-label="Разница">${row.forecast - row.current}</td>
            <td data-label="Приоритетность">
                <span class="tag ${row.priority === 'Высокий' ? 'is-danger' : 
                                  row.priority === 'Средний' ? 'is-warning' : 
                                  'is-success'}">
                    ${row.priority}
                </span>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Функция для обновления всех визуализаций
function updateForecasts() {
    const horizon = parseInt(document.getElementById('forecastHorizon').value);
    const data = generateMockData(horizon);
    
    updateHeadcountChart(data);
    updateDepartmentChart(data);
    updateForecastTable(data);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Привязка обработчика к кнопке расчета прогноза
    document.getElementById('calculateForecast').addEventListener('click', updateForecasts);
    
    // Первоначальное обновление прогнозов
    updateForecasts();
})