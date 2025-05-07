// Инициализация компонентов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    loadRecruitmentData();
    loadOnboardingData();
    loadTimesheetData();
    loadPerformanceData();
});

// Инициализация вкладок
function initializeTabs() {
    const tabSections = ['recruitment', 'onboarding', 'timesheet', 'performance'];
    
    tabSections.forEach(section => {
        const tabs = document.querySelectorAll(`#${section}-tabs ul li`);
        const contentDiv = document.querySelector(`#${section}-content`);
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Активация выбранной вкладки
                tabs.forEach(t => t.classList.remove('is-active'));
                tab.classList.add('is-active');
                
                // Загрузка контента для выбранной вкладки
                const tabId = tab.querySelector('a').getAttribute('href').substring(1);
                loadTabContent(section, tabId, contentDiv);
            });
        });
        
        // Загрузка начального контента
        const activeTab = document.querySelector(`#${section}-tabs ul li.is-active a`);
        const initialTabId = activeTab.getAttribute('href').substring(1);
        loadTabContent(section, initialTabId, contentDiv);
    });
}

// Загрузка контента для вкладок
function loadTabContent(section, tabId, container) {
    const contentMap = {
        // Подбор персонала
        vacancies: createVacanciesContent(),
        candidates: createCandidatesContent(),
        interviews: createInterviewsContent(),
        
        // Прием сотрудников
        documents: createDocumentsContent(),
        workspace: createWorkspaceContent(),
        training: createTrainingContent(),
        
        // Учет рабочего времени
        attendance: createAttendanceContent(),
        overtime: createOvertimeContent(),
        leaves: createLeavesContent(),
        
        // Контроль производительности
        kpi: createKPIContent(),
        reviews: createReviewsContent(),
        reports: createReportsContent()
    };
    
    container.innerHTML = contentMap[tabId] || '';
    initializeTabHandlers(section, tabId);
}

// Подбор персонала
function loadRecruitmentData() {
    // Здесь будет логика загрузки данных о вакансиях и кандидатах
}

function createVacanciesContent() {
    return `
        <div class="field">
            <label class="label">Новая вакансия</label>
            <div class="control">
                <input class="input" type="text" id="vacancy-title" placeholder="Название должности">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <textarea class="textarea" id="vacancy-description" placeholder="Описание вакансии"></textarea>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-primary" id="add-vacancy">Добавить вакансию</button>
            </div>
        </div>
        <div id="vacancies-list" class="mt-4"></div>
    `;
}

function createCandidatesContent() {
    return `
        <div class="field">
            <label class="label">Поиск кандидатов</label>
            <div class="control">
                <input class="input" type="text" id="candidate-search" placeholder="Поиск по имени или навыкам">
            </div>
        </div>
        <div id="candidates-list" class="mt-4"></div>
    `;
}

function createInterviewsContent() {
    return `
        <div class="field">
            <label class="label">Планирование собеседования</label>
            <div class="control">
                <input class="input" type="datetime-local" id="interview-datetime">
            </div>
        </div>
        <div id="interviews-schedule" class="mt-4"></div>
    `;
}

// Прием сотрудников
function loadOnboardingData() {
    // Здесь будет логика загрузки данных о процессе приема сотрудников
}

function createDocumentsContent() {
    return `
        <div class="field">
            <label class="label">Документы для оформления</label>
            <div class="control">
                <div class="file has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" id="document-upload">
                        <span class="file-cta">
                            <span class="file-icon"><i class="mdi mdi-upload"></i></span>
                            <span class="file-label">Загрузить документ</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
        <div id="documents-list" class="mt-4"></div>
    `;
}

function createWorkspaceContent() {
    return `
        <div class="field">
            <label class="label">Настройка рабочего места</label>
            <div class="control">
                <div class="select">
                    <select id="workspace-equipment">
                        <option>Выберите оборудование</option>
                        <option>Компьютер</option>
                        <option>Телефон</option>
                        <option>Доступ к системам</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="workspace-setup-list" class="mt-4"></div>
    `;
}

function createTrainingContent() {
    return `
        <div class="field">
            <label class="label">Программа обучения</label>
            <div class="control">
                <div class="select">
                    <select id="training-program">
                        <option>Выберите программу</option>
                        <option>Базовое обучение</option>
                        <option>Специализированные курсы</option>
                        <option>Техника безопасности</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="training-progress" class="mt-4"></div>
    `;
}

// Учет рабочего времени
function loadTimesheetData() {
    // Здесь будет логика загрузки данных об учете рабочего времени
}

function createAttendanceContent() {
    return `
        <div class="field">
            <label class="label">Отметка присутствия</label>
            <div class="control">
                <button class="button is-primary" id="check-in">Начать рабочий день</button>
                <button class="button is-danger" id="check-out">Завершить рабочий день</button>
            </div>
        </div>
        <div id="attendance-log" class="mt-4"></div>
    `;
}

function createOvertimeContent() {
    return `
        <div class="field">
            <label class="label">Учет переработок</label>
            <div class="control">
                <input class="input" type="number" id="overtime-hours" placeholder="Количество часов">
            </div>
        </div>
        <div id="overtime-log" class="mt-4"></div>
    `;
}

function createLeavesContent() {
    return `
        <div class="field">
            <label class="label">Заявка на отпуск/больничный</label>
            <div class="control">
                <input class="input" type="date" id="leave-start">
                <input class="input mt-2" type="date" id="leave-end">
                <div class="select mt-2">
                    <select id="leave-type">
                        <option>Тип отсутствия</option>
                        <option>Отпуск</option>
                        <option>Больничный</option>
                        <option>Отгул</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="leaves-log" class="mt-4"></div>
    `;
}

// Контроль производительности
function loadPerformanceData() {
    // Здесь будет логика загрузки данных о производительности
}

function createKPIContent() {
    return `
        <div class="field">
            <label class="label">Показатели эффективности</label>
            <div class="control">
                <div class="select">
                    <select id="kpi-metric">
                        <option>Выберите показатель</option>
                        <option>Выполнение задач</option>
                        <option>Качество работы</option>
                        <option>Соблюдение сроков</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="kpi-chart" class="mt-4"></div>
    `;
}

function createReviewsContent() {
    return `
        <div class="field">
            <label class="label">Оценка сотрудника</label>
            <div class="control">
                <textarea class="textarea" id="review-text" placeholder="Комментарий к оценке"></textarea>
                <div class="rating mt-2">
                    <input type="number" id="review-rating" min="1" max="5" placeholder="Оценка (1-5)">
                </div>
            </div>
        </div>
        <div id="reviews-list" class="mt-4"></div>
    `;
}

function createReportsContent() {
    return `
        <div class="field">
            <label class="label">Формирование отчета</label>
            <div class="control">
                <div class="select">
                    <select id="report-type">
                        <option>Выберите тип отчета</option>
                        <option>Общая производительность</option>
                        <option>Индивидуальные показатели</option>
                        <option>Динамика развития</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="report-preview" class="mt-4"></div>
    `;
}

// Инициализация обработчиков событий для вкладок
function initializeTabHandlers(section, tabId) {
    switch(tabId) {
        case 'vacancies':
            initVacanciesHandlers();
            break;
        case 'attendance':
            initAttendanceHandlers();
            break;
        case 'kpi':
            initKPIHandlers();
            break;
        // Добавьте обработчики для других вкладок по мере необходимости
    }
}

// Обработчики событий для различных функций
function initVacanciesHandlers() {
    const addButton = document.getElementById('add-vacancy');
    if (addButton) {
        addButton.addEventListener('click', () => {
            const title = document.getElementById('vacancy-title').value;
            const description = document.getElementById('vacancy-description').value;
            // Здесь будет логика добавления вакансии
            console.log('Добавление вакансии:', { title, description });
        });
    }
}

function initAttendanceHandlers() {
    const checkInButton = document.getElementById('check-in');
    const checkOutButton = document.getElementById('check-out');
    
    if (checkInButton && checkOutButton) {
        checkInButton.addEventListener('click', () => {
            // Логика отметки начала рабочего дня
            console.log('Начало рабочего дня:', new Date());
        });
        
        checkOutButton.addEventListener('click', () => {
            // Логика отметки конца рабочего дня
            console.log('Конец рабочего дня:', new Date());
        });
    }
}

function initKPIHandlers() {
    const metricSelect = document.getElementById('kpi-metric');
    if (metricSelect) {
        metricSelect.addEventListener('change', () => {
            // Логика обновления графика KPI
            console.log('Выбран показатель KPI:', metricSelect.value);
        });
    }
}