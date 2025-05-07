document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const resetFilters = document.getElementById('resetFilters');
    const table = document.querySelector('.table');
    const tbody = table.querySelector('tbody');
    const rows = tbody.getElementsByTagName('tr');

    // Функция фильтрации таблицы
    function filterTable() {
        const searchText = searchInput.value.toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedDate = dateFilter.value;

        Array.from(rows).forEach(row => {
            const employeeName = row.querySelector('td:first-child div:last-child').textContent.toLowerCase();
            const department = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const date = row.querySelector('td:nth-child(3)').textContent;
            const status = row.querySelector('td:last-child span').textContent;

            const matchesSearch = employeeName.includes(searchText) || department.includes(searchText);
            const matchesStatus = !selectedStatus || status === selectedStatus;
            const matchesDate = !selectedDate || date === selectedDate;

            row.style.display = matchesSearch && matchesStatus && matchesDate ? '' : 'none';
        });
    }

    // Обработчики событий
    searchInput.addEventListener('input', filterTable);
    statusFilter.addEventListener('change', filterTable);
    dateFilter.addEventListener('change', filterTable);

    // Сброс фильтров
    resetFilters.addEventListener('click', function() {
        searchInput.value = '';
        statusFilter.value = '';
        dateFilter.value = '';
        filterTable();
    });
});