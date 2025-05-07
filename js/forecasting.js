// Инициализация графиков при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
  setupEventListeners();
});

// Инициализация графиков
function initializeCharts() {
  // График прогноза численности
  const headcountCtx = document.getElementById('headcountForecastChart').getContext('2d');
  window.headcountChart = new Chart(headcountCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Фактическая численность',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
        fill: false
      }, {
        label: 'Прогноз',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
        tension: 0.3,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Прогноз численности персонала',
          font: { size: 16 }
        },
        legend: { position: 'bottom' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // График потребности по отделам
  const departmentCtx = document.getElementById('departmentNeedsChart').getContext('2d');
  window.departmentChart = new Chart(departmentCtx, {
    type: 'bar',
    data: {
      labels: ['Разработка', 'Маркетинг', 'Продажи', 'HR'],
      datasets: [{
        label: 'Текущая численность',
        data: [40, 15, 20, 8],
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }, {
        label: 'Прогнозируемая потребность',
        data: [50, 18, 25, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Потребность в персонале по отделам',
          font: { size: 16 }
        },
        legend: { position: 'bottom' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Настройка обработчиков событий
function setupEventListeners() {
  document.getElementById('calculateForecast').addEventListener('click', calculateForecast);
  document.getElementById('exportResults').addEventListener('click', exportResults);
  document.getElementById('department').addEventListener('change', updateDepartmentView);
}

// Расчет прогноза
function calculateForecast() {
  const horizon = parseInt(document.getElementById('forecastHorizon').value);
  const department = document.getElementById('department').value;
  const useProjectGrowth = document.getElementById('projectGrowth').checked;
  const useTurnover = document.getElementById('turnoverRate').checked;
  const useSeasonality = document.getElementById('seasonality').checked;

  // Получение исторических данных (в реальном приложении - запрос к API)
  const historicalData = getHistoricalData();
  
  // Расчет прогноза
  const forecast = generateForecast(historicalData, {
    horizon,
    department,
    useProjectGrowth,
    useTurnover,
    useSeasonality
  });

  // Обновление графиков и таблицы
  updateCharts(forecast);
  updateForecastTable(forecast);
}

// Получение исторических данных (пример)
function getHistoricalData() {
  return {
    headcount: {
      development: [35, 38, 40, 40, 42, 45],
      marketing: [12, 13, 15, 15, 16, 15],
      sales: [18, 19, 20, 22, 22, 20],
      hr: [6, 7, 8, 8, 8, 8]
    },
    projectGrowth: 1.15, // 15% рост проектов
    turnoverRate: 0.12, // 12% текучесть
    seasonalityFactors: [1.0, 1.1, 1.2, 1.1, 1.0, 0.9] // сезонные коэффициенты
  };
}

// Генерация прогноза
function generateForecast(historicalData, params) {
  const { horizon, department, useProjectGrowth, useTurnover, useSeasonality } = params;
  const forecast = {
    labels: [],
    headcount: [],
    departmentNeeds: {}
  };

  // Базовый прогноз на основе текущих трендов
  const baseGrowth = calculateBaseGrowth(historicalData.headcount);
  
  // Расчет прогноза для каждого месяца
  for (let i = 0; i < horizon; i++) {
    let growthFactor = baseGrowth;

    // Учет роста проектов
    if (useProjectGrowth) {
      growthFactor *= historicalData.projectGrowth;
    }

    // Учет текучести
    if (useTurnover) {
      growthFactor *= (1 - historicalData.turnoverRate);
    }

    // Учет сезонности
    if (useSeasonality) {
      growthFactor *= historicalData.seasonalityFactors[i % 6];
    }

    // Расчет прогнозных значений
    for (const dept in historicalData.headcount) {
      if (!forecast.departmentNeeds[dept]) {
        forecast.departmentNeeds[dept] = [];
      }
      const currentHeadcount = historicalData.headcount[dept][historicalData.headcount[dept].length - 1];
      forecast.departmentNeeds[dept].push(Math.round(currentHeadcount * growthFactor));
    }

    forecast.labels.push(`Месяц ${i + 1}`);
  }

  return forecast;
}

// Расчет базового роста на основе исторических данных
function calculateBaseGrowth(headcountData) {
  // Упрощенный расчет среднего роста
  const totalGrowth = Object.values(headcountData).reduce((acc, deptData) => {
    const firstValue = deptData[0];
    const lastValue = deptData[deptData.length - 1];
    return acc + (lastValue - firstValue) / firstValue;
  }, 0);
  
  return 1 + (totalGrowth / Object.keys(headcountData).length);
}

// Обновление графиков
function updateCharts(forecast) {
  // Обновление графика численности
  window.headcountChart.data.labels = forecast.labels;
  window.headcountChart.data.datasets[1].data = Object.values(forecast.departmentNeeds)
    .reduce((acc, curr) => curr.map((val, i) => (acc[i] || 0) + val), []);
  window.headcountChart.update();

  // Обновление графика по отделам
  const departments = Object.keys(forecast.departmentNeeds);
  window.departmentChart.data.labels = departments;
  window.departmentChart.data.datasets[1].data = departments
    .map(dept => forecast.departmentNeeds[dept][forecast.departmentNeeds[dept].length - 1]);
  window.departmentChart.update();
}

// Обновление таблицы прогноза
function updateForecastTable(forecast) {
  const tableBody = document.getElementById('forecastTable');
  tableBody.innerHTML = '';

  const departments = Object.keys(forecast.departmentNeeds);
  departments.forEach(dept => {
    forecast.labels.forEach((period, index) => {
      const currentValue = forecast.departmentNeeds[dept][index];
      const previousValue = index > 0 ? forecast.departmentNeeds[dept][index - 1] : currentValue;
      const difference = currentValue - previousValue;
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${period}</td>
        <td>${dept}</td>
        <td>${previousValue}</td>
        <td>${currentValue}</td>
        <td class="${difference > 0 ? 'has-text-success' : 'has-text-danger'}">${difference > 0 ? '+' : ''}${difference}</td>
        <td>${getPriorityLabel(difference)}</td>
      `;
      tableBody.appendChild(row);
    });
  });
}

// Определение приоритета найма
function getPriorityLabel(difference) {
  if (difference > 5) return 'Высокий';
  if (difference > 0) return 'Средний';
  return 'Низкий';
}

// Экспорт результатов
function exportResults() {
  // Здесь можно реализовать экспорт в CSV или Excel
  alert('Функция экспорта будет доступна в следующей версии');
}

// Обновление представления при смене отдела
function updateDepartmentView() {
  const department = document.getElementById('department').value;
  // Обновление графиков с фильтрацией по выбранному отделу
  calculateForecast();
}