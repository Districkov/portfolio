
// =============================================
// КОНФИГУРАЦИЯ АДМИН ПАНЕЛИ
// =============================================
const ADMIN_CONFIG = {
    password: "admin123",
    isLoggedIn: false
};

let projects = [];

// =============================================
// ИНИЦИАЛИЗАЦИЯ АДМИН ПАНЕЛИ
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
});

function initializeAdminPanel() {
    console.log('🛠 Initializing admin panel...');
    
    // Загружаем проекты
    loadProjects();
    
    // Инициализируем тему
    initTheme();
    
    // Инициализируем обработчики событий
    initAdminEventListeners();
    
    // Проверяем авторизацию
    checkAdminAuth();
    
    console.log('✅ Admin panel initialized');
}

// =============================================
// АУТЕНТИФИКАЦИЯ
// =============================================
function checkAdminAuth() {
    const savedAuth = localStorage.getItem('portfolioAdminAuth');
    if (savedAuth) {
        ADMIN_CONFIG.isLoggedIn = true;
        showAdminSections();
    } else {
        showLoginSection();
    }
}

function showLoginSection() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('projects').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
}

function showAdminSections() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('projects').style.display = 'block';
    document.getElementById('settings').style.display = 'block';
    
    // Загружаем и отображаем проекты
    renderProjectsList();
    updateStatistics();
}

function loginAdmin(password) {
    if (password === ADMIN_CONFIG.password) {
        ADMIN_CONFIG.isLoggedIn = true;
        localStorage.setItem('portfolioAdminAuth', 'true');
        showAdminSections();
        showNotification('Успешный вход в админ панель!', 'success');
        return true;
    } else {
        showNotification('Неверный пароль!', 'error');
        return false;
    }
}

function logoutAdmin() {
    ADMIN_CONFIG.isLoggedIn = false;
    localStorage.removeItem('portfolioAdminAuth');
    showLoginSection();
    showNotification('Вы вышли из системы.', 'info');
}

// =============================================
// УПРАВЛЕНИЕ ПРОЕКТАМИ
// =============================================
function loadProjects() {
    const saved = localStorage.getItem('portfolioProjects');
    projects = saved ? JSON.parse(saved) : getDefaultProjects();
    console.log(`📁 Loaded ${projects.length} projects in admin`);
}

function saveProjects() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    updateStatistics();
}

function getDefaultProjects() {
    return [
        {
            "id": 1,
            "category": "web",
            "title": "Интернет-магазин Moscow RP",
            "description": "Разработка современного интернет-магазина с корзиной, фильтрами и системой оплаты для проекта GTA 5 RP.",
            "image": "project1.png",
            "demoLink": "https://districkov.github.io/Moscow___RP/",
            "githubLink": "https://github.com/Districkov/Moscow___RP",
            "technologies": ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            "features": ["Корзина покупок", "Фильтрация товаров", "Адаптивный дизайн", "Быстрый поиск"]
        },
        {
            "id": 2,
            "category": "app", 
            "title": "Приложение Pyrometer",
            "description": "Веб-приложение для управления задачами и проектами с возможностью совместной работы.",
            "image": "project2.png",
            "demoLink": "https://pyrometer.tilda.ws/",
            "githubLink": "",
            "technologies": ["React", "Node.js", "WebSocket", "REST API"],
            "features": ["Управление задачами", "Совместная работа", "Аналитика", "Уведомления"]
        },
        {
            "id": 3,
            "category": "design",
            "title": "Дизайн проекта Astra GTA 5 RP", 
            "description": "Создание UI/UX дизайна для проекта по GTA 5 RP с современным интерфейсом.",
            "image": "project3.png",
            "demoLink": "https://www.figma.com/design/XbDdfTxHWDtniMplxhkvcu/Astra-Project-%7C-Figma?node-id=310-3098&p=f&t=t1uig8AF5IQqlOv7-0",
            "githubLink": "",
            "technologies": ["Figma", "UI/UX Design", "Prototyping", "Design Systems"],
            "features": ["Дизайн-система", "Прототипы", "User Flow", "Адаптивный дизайн"]
        }
    ];
}

function renderProjectsList() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;

    if (projects.length === 0) {
        projectsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>Пока нет проектов</h3>
                <p>Добавьте первый проект с помощью формы выше</p>
            </div>
        `;
        return;
    }

    projectsList.innerHTML = projects.map(project => `
        <div class="project-item" data-id="${project.id}">
            <div class="project-header">
                <h4>${project.title}</h4>
                <span class="project-category badge ${project.category}">${getCategoryName(project.category)}</span>
            </div>
            <div class="project-content">
                <p>${project.description}</p>
                <div class="project-meta">
                    <span><i class="fas fa-image"></i> ${project.image}</span>
                    ${project.technologies && project.technologies.length > 0 ? 
                        `<span><i class="fas fa-code"></i> ${project.technologies.slice(0, 3).join(', ')}</span>` : ''
                    }
                </div>
            </div>
            <div class="project-actions">
                <button class="btn btn-small btn-outline" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i> Редактировать
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i> Удалить
                </button>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        web: 'Веб-сайт',
        app: 'Приложение',
        design: 'Дизайн'
    };
    return names[category] || category;
}

function addProject(projectData) {
    const newProject = {
        id: Date.now(),
        title: projectData.title,
        category: projectData.category,
        description: projectData.description,
        image: projectData.image,
        demoLink: projectData.demoLink || '',
        githubLink: projectData.githubLink || '',
        technologies: projectData.technologies ? projectData.technologies.split(',').map(tech => tech.trim()) : [],
        features: []
    };

    projects.push(newProject);
    saveProjects();
    renderProjectsList();
    document.getElementById('projectForm').reset();
    showNotification('Проект успешно добавлен!', 'success');
}

function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // Заполняем форму данными проекта
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectTechnologies').value = project.technologies.join(', ');
    document.getElementById('projectDemo').value = project.demoLink || '';
    document.getElementById('projectGithub').value = project.githubLink || '';

    // Удаляем старый проект
    deleteProject(projectId, false);

    showNotification('Редактирование проекта. Заполните форму и нажмите "Добавить проект" для сохранения.', 'info');
}

function deleteProject(projectId, showNotification = true) {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;

    projects = projects.filter(project => project.id !== projectId);
    saveProjects();
    renderProjectsList();
    
    if (showNotification) {
        showNotification('Проект удален!', 'success');
    }
}

function updateStatistics() {
    document.getElementById('totalProjects').textContent = projects.length;
    document.getElementById('webProjects').textContent = projects.filter(p => p.category === 'web').length;
    document.getElementById('appProjects').textContent = projects.filter(p => p.category === 'app').length;
    document.getElementById('designProjects').textContent = projects.filter(p => p.category === 'design').length;
}

// =============================================
// ФОРМЫ
// =============================================
function initAdminEventListeners() {
    // Форма входа
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            loginAdmin(password);
            this.reset();
        });
    }

    // Форма добавления проекта
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!ADMIN_CONFIG.isLoggedIn) {
                showNotification('Сначала войдите в систему!', 'error');
                return;
            }

            const formData = {
                title: document.getElementById('projectTitle').value.trim(),
                category: document.getElementById('projectCategory').value,
                description: document.getElementById('projectDescription').value.trim(),
                image: document.getElementById('projectImage').value.trim(),
                technologies: document.getElementById('projectTechnologies').value,
                demoLink: document.getElementById('projectDemo').value.trim(),
                githubLink: document.getElementById('projectGithub').value.trim()
            };

            // Валидация
            if (!formData.title || !formData.category || !formData.description || !formData.image) {
                showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
                return;
            }

            addProject(formData);
        });
    }

    // Форма настроек
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPassword = document.getElementById('adminPasswordChange').value;
            const musicEnabled = document.getElementById('musicEnabled').checked;

            if (newPassword) {
                ADMIN_CONFIG.password = newPassword;
                showNotification('Пароль успешно изменен!', 'success');
            }

            // Сохраняем настройки музыки
            const musicSettings = {
                enabled: musicEnabled,
                volume: 0.3
            };
            localStorage.setItem('portfolioMusicSettings', JSON.stringify(musicSettings));

            showNotification('Настройки сохранены!', 'success');
            this.reset();
        });
    }

    // Навигация
    initAdminNavigation();
}

// =============================================
// ТЕМА
// =============================================
function initTheme() {
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
    setTheme(savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon(savedTheme);
    }
}

function toggleTheme() {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolioTheme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// =============================================
// НАВИГАЦИЯ
// =============================================
function initAdminNavigation() {
    // Мобильное меню
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    
    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuBtn.innerHTML = navbar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =============================================
// УВЕДОМЛЕНИЯ
// =============================================
function showNotification(message, type = 'info') {
    // Удаляем существующие уведомления
    removeExistingNotifications();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type} slide-in`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">${message}</div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Закрытие по клику
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function removeExistingNotifications() {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notification => notification.remove());
}

// =============================================
// ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ АДМИН ПАНЕЛИ
// =============================================
const adminStyles = `
    .admin-main {
        padding: 120px 0 50px;
        min-height: 100vh;
    }

    .admin-section {
        margin-bottom: 60px;
    }

    .admin-card {
        background: var(--dark-light);
        border-radius: var(--border-radius);
        padding: 30px;
        margin-bottom: 30px;
        border: 1px solid rgba(124, 252, 0, 0.1);
    }

    .admin-card h3 {
        color: var(--primary);
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }

    .admin-login-form {
        max-width: 400px;
        margin: 0 auto;
    }

    .projects-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .project-item {
        background: var(--dark);
        border-radius: var(--border-radius);
        padding: 20px;
        border: 1px solid rgba(124, 252, 0, 0.1);
        transition: var(--transition);
    }

    .project-item:hover {
        border-color: var(--primary);
        transform: translateY(-2px);
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .project-header h4 {
        color: var(--light);
        margin: 0;
    }

    .badge {
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .badge.web {
        background: rgba(124, 252, 0, 0.2);
        color: var(--primary);
    }

    .badge.app {
        background: rgba(0, 191, 255, 0.2);
        color: #00bfff;
    }

    .badge.design {
        background: rgba(255, 105, 180, 0.2);
        color: #ff69b4;
    }

    .project-content p {
        color: var(--gray);
        margin-bottom: 15px;
    }

    .project-meta {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }

    .project-meta span {
        color: var(--gray);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .project-actions {
        display: flex;
        gap: 10px;
    }

    .btn-small {
        padding: 8px 16px;
        font-size: 0.9rem;
    }

    .btn-danger {
        background: var(--error);
        color: white;
    }

    .btn-danger:hover {
        background: #ff3333;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }

    .stat-card {
        background: var(--dark);
        padding: 20px;
        border-radius: var(--border-radius);
        text-align: center;
        border: 1px solid rgba(124, 252, 0, 0.1);
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--primary);
        margin-bottom: 5px;
    }

    .stat-label {
        color: var(--gray);
        font-size: 0.9rem;
    }

    .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--gray);
    }

    .empty-state i {
        font-size: 3rem;
        margin-bottom: 15px;
        opacity: 0.5;
    }

    .empty-state h3 {
        margin-bottom: 10px;
        color: var(--light);
    }
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = adminStyles;
document.head.appendChild(styleSheet);

console.log('🛠 Admin panel JavaScript loaded successfully!');
