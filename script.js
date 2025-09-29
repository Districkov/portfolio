// =============================================
// КОНФИГУРАЦИЯ И ПЕРЕМЕННЫЕ
// =============================================
const CONFIG = {
    admin: {
        password: "admin123",
        isLoggedIn: false
    },
    theme: {
        current: 'dark'
    }
};

let projects = [];

// =============================================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProjects();
    checkAuth();
    initTheme();
    initEventListeners();
    renderProjects();
    
    // Скрываем прелоадер
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 500);
        }
    }, 1000);
}

// =============================================
// УПРАВЛЕНИЕ ПРОЕКТАМИ
// =============================================
function loadProjects() {
    const saved = localStorage.getItem('portfolioProjects');
    projects = saved ? JSON.parse(saved) : getDefaultProjects();
}

function saveProjects() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
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
            "githubLink": "https://github.com/Districkov/Moscow___RP"
        },
        {
            "id": 2,
            "category": "app", 
            "title": "Приложение Pyrometer",
            "description": "Веб-приложение для управления задачами и проектами с возможностью совместной работы.",
            "image": "project2.png",
            "demoLink": "https://pyrometer.tilda.ws/",
            "githubLink": ""
        },
        {
            "id": 3,
            "category": "design",
            "title": "Дизайн проекта Astra GTA 5 RP", 
            "description": "Создание UI/UX дизайна для проекта по GTA 5 RP с современным интерфейсом.",
            "image": "project3.png",
            "demoLink": "https://www.figma.com/design/XbDdfTxHWDtniMplxhkvcu/Astra-Project-%7C-Figma?node-id=310-3098&p=f&t=t1uig8AF5IQqlOv7-0",
            "githubLink": ""
        }
    ];
}

function renderProjects() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    if (projects.length === 0) {
        grid.innerHTML = createEmptyState();
        return;
    }

    grid.innerHTML = projects.map(project => createProjectCard(project)).join('');
    initFadeAnimations();
}

function createEmptyState() {
    return `
        <div class="empty-state">
            <i class="fas fa-folder-open"></i>
            <h3>Пока нет проектов</h3>
            <p>${CONFIG.admin.isLoggedIn ? 'Добавьте первый проект' : 'Свяжитесь с администратором'}</p>
            ${CONFIG.admin.isLoggedIn ? 
                '<button class="btn" onclick="toggleAdminPanel()"><i class="fas fa-plus"></i> Добавить проект</button>' : 
                ''
            }
        </div>
    `;
}

function createProjectCard(project) {
    const icon = getCategoryIcon(project.category);
    
    return `
        <div class="portfolio-item fade-in" data-category="${project.category}">
            <div class="portfolio-image ${project.image ? 'has-image' : ''}">
                ${project.image ? 
                    `<img src="images/${project.image}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'">` : 
                    ''
                }
                <i class="fas fa-${icon} fa-icon"></i>
                <div class="portfolio-overlay">
                    <div class="portfolio-links">
                        ${project.demoLink ? `
                            <a href="${project.demoLink}" target="_blank" class="portfolio-link" title="Демо">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                        ${project.githubLink ? `
                            <a href="${project.githubLink}" target="_blank" class="portfolio-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                        ` : ''}
                        ${CONFIG.admin.isLoggedIn ? `
                            <button class="portfolio-link delete-btn" onclick="deleteProject(${project.id})" title="Удалить проект">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${CONFIG.admin.isLoggedIn ? `
                    <small class="project-id">ID: ${project.id}</small>
                ` : ''}
            </div>
        </div>
    `;
}

function getCategoryIcon(category) {
    const icons = {
        web: 'globe',
        app: 'mobile-alt',
        design: 'palette'
    };
    return icons[category] || 'code';
}

function deleteProject(projectId) {
    if (!CONFIG.admin.isLoggedIn) {
        showNotification('Сначала войдите в систему!', 'error');
        return;
    }
    
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
        projects = projects.filter(project => project.id !== projectId);
        saveProjects();
        renderProjects();
        initPortfolioFilters();
        showNotification('Проект удален!', 'success');
    }
}

// =============================================
// АДМИН ПАНЕЛЬ И АУТЕНТИФИКАЦИЯ
// =============================================
function checkAuth() {
    const savedAuth = localStorage.getItem('portfolioAuth');
    if (savedAuth) {
        CONFIG.admin.isLoggedIn = true;
        updateAdminButton();
    }
}

function updateAdminButton() {
    const btn = document.getElementById('adminToggleBtn');
    if (!btn) return;
    
    const icon = btn.querySelector('i');
    
    if (CONFIG.admin.isLoggedIn) {
        btn.classList.remove('locked');
        btn.classList.add('unlocked');
        icon.className = 'fas fa-plus';
        btn.title = 'Добавить проект';
    } else {
        btn.classList.remove('unlocked');
        btn.classList.add('locked');
        icon.className = 'fas fa-lock';
        btn.title = 'Войти как администратор';
    }
}

function toggleLoginPanel() {
    const panel = document.getElementById('login-panel');
    if (panel) {
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
}

function toggleAdminPanel() {
    if (!CONFIG.admin.isLoggedIn) {
        toggleLoginPanel();
        return;
    }
    const panel = document.getElementById('admin-panel');
    if (panel) {
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
}

function logout() {
    CONFIG.admin.isLoggedIn = false;
    localStorage.removeItem('portfolioAuth');
    updateAdminButton();
    
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
    
    renderProjects();
    showNotification('Вы вышли из системы.', 'success');
}

// =============================================
// ТЕМЫ
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
    const newTheme = CONFIG.theme.current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showNotification(`Тема изменена на ${newTheme === 'dark' ? 'тёмную' : 'светлую'}`, 'success');
}

function setTheme(theme) {
    CONFIG.theme.current = theme;
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
// УВЕДОМЛЕНИЯ
// =============================================
function showNotification(message, type = 'info') {
    removeExistingNotifications();
    
    const notification = createNotification(message, type);
    document.body.appendChild(notification);
    
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

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">${message}</div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    return notification;
}

// =============================================
// ФОРМЫ
// =============================================
function initForms() {
    initLoginForm();
    initProjectForm();
    initContactForm();
}

function initLoginForm() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('login-password').value;
            
            if (password === CONFIG.admin.password) {
                CONFIG.admin.isLoggedIn = true;
                localStorage.setItem('portfolioAuth', 'true');
                updateAdminButton();
                toggleLoginPanel();
                this.reset();
                showNotification('Успешный вход! Теперь вы можете добавлять проекты.', 'success');
            } else {
                showNotification('Неверный пароль!', 'error');
            }
        });
    }
}

function initProjectForm() {
    const form = document.getElementById('project-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!CONFIG.admin.isLoggedIn) {
                showNotification('Сначала войдите в систему!', 'error');
                toggleLoginPanel();
                return;
            }
            
            const formData = getFormData(this);
            const newProject = createProjectFromForm(formData);
            
            if (!validateProject(newProject)) {
                showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
                return;
            }
            
            projects.push(newProject);
            saveProjects();
            renderProjects();
            initPortfolioFilters();
            
            this.reset();
            toggleAdminPanel();
            showNotification('Проект успешно добавлен!', 'success');
        });
    }
}

function getFormData(form) {
    const data = {};
    const elements = form.elements;
    
    for (let element of elements) {
        if (element.name && element.type !== 'submit') {
            data[element.name] = element.value.trim();
        }
    }
    
    return data;
}

function createProjectFromForm(data) {
    return {
        id: Date.now(),
        title: data['project-title'],
        category: data['project-category'],
        description: data['project-description'],
        image: data['project-image'],
        demoLink: data['project-demo'] || '',
        githubLink: data['project-github'] || ''
    };
}

function validateProject(project) {
    return project.title && project.category && project.description && project.image;
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (!validateContactForm(data)) {
                showNotification('Пожалуйста, заполните все поля формы.', 'error');
                return;
            }
            
            simulateFormSubmission(this);
        });
    }
}

function validateContactForm(data) {
    return data.name && data.email && data.subject && data.message;
}

function simulateFormSubmission(form) {
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
        showNotification('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.', 'success');
    }, 2000);
}

// =============================================
// ФИЛЬТРЫ ПОРТФОЛИО
// =============================================
function initPortfolioFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            filterProjects(items, filterValue);
        });
    });
}

function filterProjects(items, filter) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// =============================================
// НАВИГАЦИЯ И АНИМАЦИИ
// =============================================
function initNavigation() {
    initMobileMenu();
    initNavLinks();
    initSmoothScroll();
    initScrollSpy();
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    
    if (menuBtn && navbar) {
        // Показываем/скрываем меню только на мобильных устройствах
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'flex';
            
            menuBtn.addEventListener('click', () => {
                navbar.classList.toggle('active');
                menuBtn.innerHTML = navbar.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        } else {
            // На десктопе скрываем бургер-меню
            menuBtn.style.display = 'none';
            navbar.classList.remove('active');
        }
    }
}

function initNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbar = document.getElementById('navbar');
            const menuBtn = document.getElementById('mobileMenuBtn');
            
            if (navbar && window.innerWidth <= 768) {
                navbar.classList.remove('active');
                if (menuBtn) {
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollSpy() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initFadeAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const checkVisibility = () => {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
}

function initSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    
    const animateBars = () => {
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            const elementTop = bar.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight - 100) {
                bar.style.width = width + '%';
            }
        });
    };
    
    window.addEventListener('scroll', animateBars);
    setTimeout(animateBars, 100);
}

// =============================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// =============================================
function initEventListeners() {
    initNavigation();
    initForms();
    initPortfolioFilters();
    initSkillBars();
    initAdminButton();
    initClickOutside();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        initMobileMenu();
    });
}

function initAdminButton() {
    const btn = document.getElementById('adminToggleBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            if (CONFIG.admin.isLoggedIn) {
                toggleAdminPanel();
            } else {
                toggleLoginPanel();
            }
        });
    }
}

function initClickOutside() {
    document.addEventListener('click', function(e) {
        const loginPanel = document.getElementById('login-panel');
        const adminPanel = document.getElementById('admin-panel');
        const adminBtn = document.getElementById('adminToggleBtn');
        
        if (loginPanel && loginPanel.style.display === 'block' && 
            !loginPanel.contains(e.target) && 
            (!adminBtn || !adminBtn.contains(e.target))) {
            loginPanel.style.display = 'none';
        }
        
        if (adminPanel && adminPanel.style.display === 'block' && 
            !adminPanel.contains(e.target) && 
            (!adminBtn || !adminBtn.contains(e.target))) {
            adminPanel.style.display = 'none';
        }
    });
}

// =============================================
// ГЛОБАЛЬНЫЕ ФУНКЦИИ
// =============================================
window.toggleLoginPanel = toggleLoginPanel;
window.toggleAdminPanel = toggleAdminPanel;
window.logout = logout;
window.deleteProject = deleteProject;