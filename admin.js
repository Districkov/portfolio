// admin.js
// =============================================
// АДМИН ПАНЕЛЬ - УЛУЧШЕННАЯ ВЕРСИЯ С КАСТОМНЫМ КУРСОРОМ
// =============================================

class AdminPanel {
    constructor() {
        this.isAuthenticated = false;
        this.projects = [];
        this.currentEditingId = null;
        this.categoryChart = null;
        this.customCursor = null;
        this.init();
    }

    init() {
        this.initCustomCursor();
        this.initTheme();
        this.initNavigation();
        this.initLogin();
        this.loadProjects();
        this.initProjectForm();
        this.initSettings();
        this.initPageProgress();
        this.updateAdminStatus();
        console.log('🚀 Admin panel initialized');
    }

    // =============================================
    // КАСТОМНЫЙ КУРСОР ДЛЯ АДМИНКИ
    // =============================================
    initCustomCursor() {
        // Создаем элемент курсора если его нет
        if (!document.getElementById('customCursor')) {
            const cursor = document.createElement('div');
            cursor.id = 'customCursor';
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);
        }
        
        this.customCursor = new AdminCustomCursor();
    }

    // =============================================
    // УПРАВЛЕНИЕ ТЕМОЙ
    // =============================================
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
            this.showNotification(`Тема изменена на ${newTheme === 'dark' ? 'тёмную' : 'светлую'}!`, 'success');
        });
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // =============================================
    // НАВИГАЦИЯ С ИСПРАВЛЕННЫМ БУРГЕР МЕНЮ
    // =============================================
    initNavigation() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        if (mobileMenuBtn && navbar) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navbar.classList.toggle('active');
                mobileMenuBtn.innerHTML = navbar.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            // Закрытие меню при клике на ссылку
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });

            // Закрытие меню при клике вне его области
            document.addEventListener('click', (e) => {
                if (navbar.classList.contains('active') && 
                    !navbar.contains(e.target) && 
                    !mobileMenuBtn.contains(e.target)) {
                    navbar.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });

            // Закрытие меню при изменении размера окна
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') === 'index.html') return;
                
                if (!this.isAuthenticated && !link.getAttribute('href').includes('login')) {
                    e.preventDefault();
                    this.showNotification('Пожалуйста, войдите в систему', 'warning');
                    this.showSection('login');
                    return;
                }

                const target = link.getAttribute('href').substring(1);
                this.showSection(target);
                
                // Обновляем статистику при переходе в раздел статистики
                if (target === 'statistics') {
                    this.updateStatistics();
                    this.initCharts();
                }
                
                if (navbar) {
                    navbar.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });

        // Показываем секцию логина по умолчанию
        this.showSection('login');
    }

    // =============================================
    // ПРОГРЕСС БАР СТРАНИЦЫ
    // =============================================
    initPageProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            
            progressBar.style.width = progress + '%';
        });
    }

    // =============================================
    // АУТЕНТИФИКАЦИЯ
    // =============================================
    initLogin() {
        const loginForm = document.getElementById('adminLoginForm');
        const adminPassword = localStorage.getItem('adminPassword') || 'admin123';

        // Обновляем отображение текущего пароля
        const currentPasswordElement = document.getElementById('currentPassword');
        if (currentPasswordElement) {
            currentPasswordElement.textContent = adminPassword;
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = document.getElementById('adminPassword').value;
            
            if (password === adminPassword) {
                this.isAuthenticated = true;
                this.showSection('projects');
                this.showNotification('Успешный вход в админ панель!', 'success');
                this.updateAdminStatus();
                loginForm.reset();
                
                // Обновляем статистику после входа
                this.updateStatistics();
            } else {
                this.showNotification('Неверный пароль! Попробуйте снова.', 'error');
                document.getElementById('adminPassword').value = '';
                document.getElementById('adminPassword').focus();
            }
        });
    }

    updateAdminStatus() {
        const statusElement = document.getElementById('adminStatus');
        if (statusElement) {
            if (this.isAuthenticated) {
                statusElement.className = 'status-online';
                statusElement.innerHTML = '<i class="fas fa-circle"></i> Авторизован';
            } else {
                statusElement.className = 'status-offline';
                statusElement.innerHTML = '<i class="fas fa-circle"></i> Не авторизован';
            }
        }
    }

    // =============================================
    // УПРАВЛЕНИЕ СЕКЦИЯМИ
    // =============================================
    showSection(sectionName) {
        // Скрываем все секции
        document.querySelectorAll('.admin-section').forEach(section => {
            section.style.display = 'none';
        });

        // Показываем выбранную секцию
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Плавное появление
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 50);
        }

        // Обновляем активные ссылки
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionName}`) {
                link.classList.add('active');
            }
        });

        // Прокрутка к верху
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =============================================
    // ФОРМА ПРОЕКТОВ
    // =============================================
    initProjectForm() {
        const projectForm = document.getElementById('projectForm');
        
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!this.isAuthenticated) {
                this.showNotification('Пожалуйста, войдите в систему', 'warning');
                this.showSection('login');
                return;
            }

            const projectData = {
                id: this.currentEditingId || Date.now(),
                title: document.getElementById('projectTitle').value,
                category: document.getElementById('projectCategory').value,
                description: document.getElementById('projectDescription').value,
                image: document.getElementById('projectImage').value,
                technologies: document.getElementById('projectTechnologies').value.split(',').map(tech => tech.trim()),
                demoLink: document.getElementById('projectDemo').value,
                githubLink: document.getElementById('projectGithub').value,
                features: ["Адаптивный дизайн", "Современные технологии", "Оптимизированная производительность"]
            };

            if (this.currentEditingId) {
                this.updateProject(projectData);
            } else {
                this.addProject(projectData);
            }
            
            projectForm.reset();
            this.currentEditingId = null;
            
            // Обновляем текст кнопки
            const submitBtn = projectForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-plus"></i> Добавить проект';
        });
    }

    // =============================================
    // УПРАВЛЕНИЕ ПРОЕКТАМИ
    // =============================================
    async loadProjects() {
        try {
            const savedProjects = localStorage.getItem('portfolioProjects');
            
            if (savedProjects && savedProjects !== 'null' && savedProjects !== 'undefined') {
                try {
                    this.projects = JSON.parse(savedProjects);
                    console.log(`📁 Loaded ${this.projects.length} projects from localStorage`);
                    
                    if (!Array.isArray(this.projects) || this.projects.length === 0) {
                        throw new Error('Invalid projects data');
                    }
                } catch (error) {
                    console.error('❌ Error loading projects from localStorage:', error);
                    this.projects = this.getDefaultProjects();
                    this.saveProjects();
                }
            } else {
                console.log('📁 No saved projects found, loading defaults');
                this.projects = this.getDefaultProjects();
                this.saveProjects();
            }
            
            this.renderProjects();
            this.updateStatistics();
            
        } catch (error) {
            console.error('Ошибка загрузки проектов:', error);
            this.projects = this.getDefaultProjects();
            this.renderProjects();
            this.updateStatistics();
        }
    }

    getDefaultProjects() {
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

    renderProjects() {
        const projectsList = document.getElementById('projectsList');
        const projectsCount = document.getElementById('projectsCount');
        
        if (!projectsList) return;

        if (this.projects.length === 0) {
            projectsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h4>Нет проектов</h4>
                    <p>Добавьте первый проект, используя форму выше</p>
                </div>
            `;
        } else {
            projectsList.innerHTML = this.projects.map(project => `
                <div class="project-item" data-project-id="${project.id}">
                    <div class="project-info">
                        <div class="project-main">
                            <h4>${project.title}</h4>
                            <span class="project-category">${this.getCategoryName(project.category)}</span>
                        </div>
                        <div class="project-meta">
                            <small>Технологии: ${project.technologies.slice(0, 3).join(', ')}</small>
                            <small>Изображение: ${project.image}</small>
                        </div>
                    </div>
                    <div class="project-actions">
                        <button class="btn btn-small" onclick="admin.editProject(${project.id})" title="Редактировать">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-outline" onclick="admin.deleteProject(${project.id})" title="Удалить">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        if (projectsCount) {
            projectsCount.textContent = this.projects.length;
        }

        // ВАЖНО: Обновляем статистику после рендеринга проектов
        this.updateStatistics();
    }

    addProject(projectData) {
        const formattedProject = {
            id: projectData.id,
            category: projectData.category,
            title: projectData.title,
            description: projectData.description,
            image: projectData.image,
            demoLink: projectData.demoLink || '',
            githubLink: projectData.githubLink || '',
            technologies: projectData.technologies || [],
            features: projectData.features || []
        };

        this.projects.unshift(formattedProject);
        this.saveProjects();
        this.renderProjects();
        this.showNotification('Проект успешно добавлен!', 'success');
    }

    updateProject(projectData) {
        const index = this.projects.findIndex(p => p.id === projectData.id);
        if (index !== -1) {
            this.projects[index] = {
                id: projectData.id,
                category: projectData.category,
                title: projectData.title,
                description: projectData.description,
                image: projectData.image,
                demoLink: projectData.demoLink || '',
                githubLink: projectData.githubLink || '',
                technologies: projectData.technologies || [],
                features: this.projects[index].features || []
            };
            
            this.saveProjects();
            this.renderProjects();
            this.showNotification('Проект успешно обновлен!', 'success');
        }
    }

    editProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.image;
        document.getElementById('projectTechnologies').value = project.technologies.join(', ');
        document.getElementById('projectDemo').value = project.demoLink || '';
        document.getElementById('projectGithub').value = project.githubLink || '';

        this.currentEditingId = projectId;

        const submitBtn = document.querySelector('#projectForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Сохранить изменения';

        this.showNotification('Режим редактирования проекта', 'info');
        
        document.getElementById('projectForm').scrollIntoView({ behavior: 'smooth' });
    }

    deleteProject(projectId) {
        if (!confirm('Вы уверены, что хотите удалить этот проект?')) {
            return;
        }

        this.projects = this.projects.filter(p => p.id !== projectId);
        this.saveProjects();
        this.renderProjects();
        this.showNotification('Проект удален!', 'success');
    }

    saveProjects() {
        localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
        console.log('💾 Projects saved to localStorage:', this.projects.length);
    }

    getCategoryName(category) {
        const categories = {
            'web': '🌐 Веб-сайт',
            'app': '📱 Приложение',
            'design': '🎨 Дизайн'
        };
        return categories[category] || category;
    }

    // =============================================
    // СТАТИСТИКА И ГРАФИКИ
    // =============================================
    updateStatistics() {
        console.log('📊 Updating statistics...');
        
        const totalProjects = this.projects.length;
        const webProjects = this.projects.filter(p => p.category === 'web').length;
        const appProjects = this.projects.filter(p => p.category === 'app').length;
        const designProjects = this.projects.filter(p => p.category === 'design').length;

        // Обновляем основную статистику в разделе проектов
        const totalEl = document.getElementById('totalProjects');
        const webEl = document.getElementById('webProjects');
        const appEl = document.getElementById('appProjects');
        const designEl = document.getElementById('designProjects');

        if (totalEl) totalEl.textContent = totalProjects;
        if (webEl) webEl.textContent = webProjects;
        if (appEl) appEl.textContent = appProjects;
        if (designEl) designEl.textContent = designProjects;

        // Обновляем статистику в разделе статистики
        const statsTotalEl = document.getElementById('statsTotalProjects');
        const statsWebEl = document.getElementById('statsWebProjects');
        const statsAppEl = document.getElementById('statsAppProjects');
        const statsDesignEl = document.getElementById('statsDesignProjects');

        if (statsTotalEl) statsTotalEl.textContent = totalProjects;
        if (statsWebEl) statsWebEl.textContent = webProjects;
        if (statsAppEl) statsAppEl.textContent = appProjects;
        if (statsDesignEl) statsDesignEl.textContent = designProjects;

        console.log('📊 Statistics updated:', { totalProjects, webProjects, appProjects, designProjects });
    }

    initCharts() {
        this.updateCategoryChart();
    }

    updateCategoryChart() {
        const ctx = document.getElementById('categoryChartCanvas');
        if (!ctx) return;

        // Удаляем предыдущий график если существует
        if (this.categoryChart) {
            this.categoryChart.destroy();
        }

        const webProjects = this.projects.filter(p => p.category === 'web').length;
        const appProjects = this.projects.filter(p => p.category === 'app').length;
        const designProjects = this.projects.filter(p => p.category === 'design').length;

        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Веб-сайты', 'Приложения', 'Дизайн'],
                datasets: [{
                    data: [webProjects, appProjects, designProjects],
                    backgroundColor: [
                        'rgba(124, 252, 0, 0.8)',
                        'rgba(124, 252, 0, 0.6)',
                        'rgba(124, 252, 0, 0.4)'
                    ],
                    borderColor: [
                        'rgba(124, 252, 0, 1)',
                        'rgba(124, 252, 0, 1)',
                        'rgba(124, 252, 0, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'var(--light)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Распределение проектов по категориям',
                        color: 'var(--light)',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }

    // =============================================
    // НАСТРОЙКИ
    // =============================================
    initSettings() {
        const settingsForm = document.getElementById('settingsForm');
        const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
        const notificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false';
        
        document.getElementById('musicEnabled').checked = musicEnabled;
        document.getElementById('notificationsEnabled').checked = notificationsEnabled;

        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPassword = document.getElementById('adminPasswordChange').value;
            if (newPassword) {
                localStorage.setItem('adminPassword', newPassword);
                document.getElementById('adminPasswordChange').value = '';
                document.getElementById('currentPassword').textContent = newPassword;
                this.showNotification('Пароль успешно изменен!', 'success');
            }

            const musicEnabled = document.getElementById('musicEnabled').checked;
            const notificationsEnabled = document.getElementById('notificationsEnabled').checked;
            
            localStorage.setItem('musicEnabled', musicEnabled.toString());
            localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());

            this.showNotification('Настройки сохранены!', 'success');
        });
    }

    // =============================================
    // ЭКСПОРТ/ИМПОРТ ДАННЫХ
    // =============================================
    exportProjects() {
        if (!this.isAuthenticated) {
            this.showNotification('Пожалуйста, войдите в систему', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.projects, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `portfolio-projects-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Проекты экспортированы!', 'success');
    }

    importProjects() {
        if (!this.isAuthenticated) {
            this.showNotification('Пожалуйста, войдите в систему', 'warning');
            return;
        }

        const fileInput = document.getElementById('importFile');
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedProjects = JSON.parse(event.target.result);
                    
                    if (Array.isArray(importedProjects)) {
                        if (confirm(`Импортировать ${importedProjects.length} проектов? Существующие проекты будут заменены.`)) {
                            this.projects = importedProjects;
                            this.saveProjects();
                            this.renderProjects();
                            this.showNotification(`Успешно импортировано ${importedProjects.length} проектов!`, 'success');
                        }
                    } else {
                        this.showNotification('Неверный формат файла', 'error');
                    }
                } catch (error) {
                    this.showNotification('Ошибка при чтении файла', 'error');
                    console.error('Import error:', error);
                }
            };
            reader.readAsText(file);
        };
        
        fileInput.click();
    }

    restoreProjects() {
        if (!this.isAuthenticated) {
            this.showNotification('Пожалуйста, войдите в систему', 'warning');
            return;
        }

        if (confirm('Восстановить стандартные проекты? Текущие данные будут заменены.')) {
            this.projects = this.getDefaultProjects();
            this.saveProjects();
            this.renderProjects();
            this.showNotification('Проекты восстановлены!', 'success');
        }
    }

    clearAllData() {
        if (!this.isAuthenticated) {
            this.showNotification('Пожалуйста, войдите в систему', 'warning');
            return;
        }

        if (confirm('ВНИМАНИЕ! Это действие удалит все проекты и настройки. Продолжить?')) {
            localStorage.removeItem('portfolioProjects');
            localStorage.removeItem('adminPassword');
            localStorage.removeItem('musicEnabled');
            localStorage.removeItem('notificationsEnabled');
            
            this.projects = this.getDefaultProjects();
            this.saveProjects();
            this.renderProjects();
            
            this.showNotification('Все данные сброшены!', 'success');
        }
    }

    // =============================================
    // СИСТЕМА УВЕДОМЛЕНИЙ
    // =============================================
    showNotification(message, type = 'info') {
        const notificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false';
        if (!notificationsEnabled && type !== 'error') return;

        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// =============================================
// КАСТОМНЫЙ КУРСОР ДЛЯ АДМИНКИ
// =============================================
class AdminCustomCursor {
    constructor() {
        this.cursor = document.getElementById('customCursor');
        this.init();
    }

    init() {
        if (!this.cursor) {
            console.warn('Custom cursor element not found in admin');
            return;
        }

        // Проверяем поддержку fine pointer (не сенсорные устройства)
        if (window.matchMedia('(pointer: fine)').matches) {
            this.bindEvents();
            this.cursor.style.display = 'block';
        } else {
            this.cursor.style.display = 'none';
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.moveCursor(e);
        });

        // Эффекты при наведении на интерактивные элементы в админке
        const hoverElements = document.querySelectorAll(
            'a, button, .btn, .admin-card, .project-item, .filter-btn, input, textarea, select, .mobile-menu-btn, .theme-toggle, .lang-btn, .form-group input, .form-group textarea, .form-group select'
        );
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Клик эффект
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });

        // Скрываем курсор когда мышь покидает окно
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
    }

    moveCursor(e) {
        if (this.cursor.style.display !== 'none') {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        }
    }
}

// =============================================
// ИНИЦИАЛИЗАЦИЯ АДМИН ПАНЕЛИ
// =============================================
let admin;

document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});

// Добавляем глобальные функции для кнопок
window.admin = admin;