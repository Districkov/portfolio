// admin.js
// =============================================
// АДМИН ПАНЕЛЬ
// =============================================

class AdminPanel {
    constructor() {
        this.isAuthenticated = false;
        this.projects = [];
        this.init();
    }

    init() {
        this.initTheme();
        this.initNavigation();
        this.initLogin();
        this.loadProjects();
        this.initProjectForm();
        this.initSettings();
        this.updateStatistics();
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
            this.showNotification('Тема изменена!', 'success');
        });
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // =============================================
    // НАВИГАЦИЯ
    // =============================================
    initNavigation() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileMenuBtn.innerHTML = navbar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (!this.isAuthenticated && link.getAttribute('href') !== '#login') {
                    e.preventDefault();
                    this.showNotification('Пожалуйста, войдите в систему', 'warning');
                    return;
                }

                const target = link.getAttribute('href').substring(1);
                this.showSection(target);
                
                navbar.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // =============================================
    // АУТЕНТИФИКАЦИЯ
    // =============================================
    initLogin() {
        const loginForm = document.getElementById('adminLoginForm');
        const adminPassword = localStorage.getItem('adminPassword') || 'admin123';

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = document.getElementById('adminPassword').value;
            
            if (password === adminPassword) {
                this.isAuthenticated = true;
                this.showSection('projects');
                this.showNotification('Успешный вход!', 'success');
                loginForm.reset();
            } else {
                this.showNotification('Неверный пароль!', 'error');
            }
        });
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
        }

        // Обновляем активные ссылки
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionName}`) {
                link.classList.add('active');
            }
        });
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
                return;
            }

            const projectData = {
                id: Date.now(),
                title: document.getElementById('projectTitle').value,
                category: document.getElementById('projectCategory').value,
                description: document.getElementById('projectDescription').value,
                image: document.getElementById('projectImage').value,
                technologies: document.getElementById('projectTechnologies').value.split(',').map(tech => tech.trim()),
                demo: document.getElementById('projectDemo').value,
                github: document.getElementById('projectGithub').value
            };

            this.addProject(projectData);
            projectForm.reset();
        });
    }

    // =============================================
    // УПРАВЛЕНИЕ ПРОЕКТАМИ
    // =============================================
    async loadProjects() {
        try {
            const response = await fetch('projects.json');
            this.projects = await response.json();
            this.renderProjects();
        } catch (error) {
            console.error('Ошибка загрузки проектов:', error);
            this.projects = this.getDefaultProjects();
            this.renderProjects();
        }
    }

    getDefaultProjects() {
        return [
            {
                "id": 1,
                "title": "Интернет-магазин",
                "category": "web",
                "description": "Современный интернет-магазин с корзиной и системой оплаты",
                "image": "project1.jpg",
                "technologies": ["HTML", "CSS", "JavaScript", "React"],
                "demo": "https://example.com",
                "github": "https://github.com/username/project1"
            }
        ];
    }

    renderProjects() {
        const projectsList = document.getElementById('projectsList');
        if (!projectsList) return;

        projectsList.innerHTML = this.projects.map(project => `
            <div class="project-item">
                <div class="project-info">
                    <h4>${project.title}</h4>
                    <span class="project-category">${this.getCategoryName(project.category)}</span>
                </div>
                <div class="project-actions">
                    <button class="btn btn-small" onclick="admin.editProject(${project.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small btn-outline" onclick="admin.deleteProject(${project.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        this.updateStatistics();
    }

    addProject(projectData) {
        this.projects.push(projectData);
        this.saveProjects();
        this.renderProjects();
        this.showNotification('Проект успешно добавлен!', 'success');
    }

    editProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Заполняем форму данными проекта
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.image;
        document.getElementById('projectTechnologies').value = project.technologies.join(', ');
        document.getElementById('projectDemo').value = project.demo || '';
        document.getElementById('projectGithub').value = project.github || '';

        // Удаляем старый проект
        this.deleteProject(projectId, false);

        this.showNotification('Редактирование проекта', 'info');
    }

    deleteProject(projectId, showNotification = true) {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.saveProjects();
        this.renderProjects();
        
        if (showNotification) {
            this.showNotification('Проект удален!', 'success');
        }
    }

    async saveProjects() {
        // В реальном приложении здесь был бы запрос к серверу
        console.log('Сохраненные проекты:', this.projects);
        localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
    }

    getCategoryName(category) {
        const categories = {
            'web': 'Веб-сайт',
            'app': 'Приложение',
            'design': 'Дизайн'
        };
        return categories[category] || category;
    }

    // =============================================
    // НАСТРОЙКИ
    // =============================================
    initSettings() {
        const settingsForm = document.getElementById('settingsForm');
        const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
        
        document.getElementById('musicEnabled').checked = musicEnabled;

        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPassword = document.getElementById('adminPasswordChange').value;
            if (newPassword) {
                localStorage.setItem('adminPassword', newPassword);
                document.getElementById('adminPasswordChange').value = '';
            }

            const musicEnabled = document.getElementById('musicEnabled').checked;
            localStorage.setItem('musicEnabled', musicEnabled.toString());

            this.showNotification('Настройки сохранены!', 'success');
        });
    }

    // =============================================
    // СТАТИСТИКА
    // =============================================
    updateStatistics() {
        const totalProjects = this.projects.length;
        const webProjects = this.projects.filter(p => p.category === 'web').length;
        const appProjects = this.projects.filter(p => p.category === 'app').length;
        const designProjects = this.projects.filter(p => p.category === 'design').length;

        document.getElementById('totalProjects').textContent = totalProjects;
        document.getElementById('webProjects').textContent = webProjects;
        document.getElementById('appProjects').textContent = appProjects;
        document.getElementById('designProjects').textContent = designProjects;
    }

    // =============================================
    // СИСТЕМА УВЕДОМЛЕНИЙ
    // =============================================
    showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
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

        // Показываем уведомление
        setTimeout(() => notification.classList.add('show'), 100);

        // Автоматическое скрытие
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
// ИНИЦИАЛИЗАЦИЯ АДМИН ПАНЕЛИ
// =============================================
let admin;

document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});