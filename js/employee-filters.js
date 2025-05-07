// Функция для фильтрации таблицы сотрудников
function filterEmployees() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const statusValue = document.getElementById('statusFilter').value;
    const dateValue = document.getElementById('dateFilter').value;

    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const name = row.querySelector('[data-label="ФИО"]').textContent.toLowerCase();
        const position = row.querySelector('[data-label="Должность"]').textContent.toLowerCase();
        const department = row.querySelector('[data-label="Отдел"]').textContent.toLowerCase();
        const status = row.querySelector('[data-label="Статус"] span').textContent;
        const date = row.querySelector('[data-label="Дата изменения"] small').getAttribute('title');

        const matchesSearch = name.includes(searchValue) || 
                            position.includes(searchValue) || 
                            department.includes(searchValue);
        const matchesStatus = !statusValue || status === statusValue;
        const matchesDate = !dateValue || date === dateValue;

        row.style.display = (matchesSearch && matchesStatus && matchesDate) ? '' : 'none';
    });
}

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const resetButton = document.getElementById('resetFilters');

    // Добавляем обработчики событий для фильтров
    searchInput.addEventListener('input', filterEmployees);
    statusFilter.addEventListener('change', filterEmployees);
    dateFilter.addEventListener('change', filterEmployees);

    // Обработчик для кнопки сброса фильтров
    resetButton.addEventListener('click', function() {
        searchInput.value = '';
        statusFilter.value = '';
        dateFilter.value = '';
        filterEmployees();
    });
});