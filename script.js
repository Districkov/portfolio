// Настройки администратора
const ADMIN_CONFIG = {
    password: "admin123", // Пароль для входа (можете поменять)
    isLoggedIn: false
};

// Функция для работы с localStorage
function getProjectsFromStorage() {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
        return JSON.parse(savedProjects);
    }
    // Если нет сохраненных проектов, возвращаем стандартные
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

function saveProjectsToStorage(projects) {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

// Загружаем проекты
let projects = getProjectsFromStorage();

// Проверяем авторизацию при загрузке
function checkAuth() {
    const savedAuth = localStorage.getItem('portfolioAuth');
    if (savedAuth) {
        ADMIN_CONFIG.isLoggedIn = true;
        updateAdminButton();
    }
}

// Обновление кнопки администратора
function updateAdminButton() {
    const adminBtn = document.querySelector('.admin-toggle-btn');
    if (!adminBtn) return;
    
    const icon = adminBtn.querySelector('i');
    
    if (ADMIN_CONFIG.isLoggedIn) {
        adminBtn.classList.remove('locked');
        adminBtn.classList.add('unlocked');
        icon.className = 'fas fa-plus';
        adminBtn.onclick = toggleAdmin;
    } else {
        adminBtn.classList.remove('unlocked');
        adminBtn.classList.add('locked');
        icon.className = 'fas fa-lock';
        adminBtn.onclick = toggleLogin;
    }
}

// Форма входа
function toggleLogin() {
    console.log('Toggle login called');
    const loginPanel = document.getElementById('login-panel');
    if (loginPanel) {
        loginPanel.style.display = loginPanel.style.display === 'none' ? 'block' : 'none';
        console.log('Login panel display:', loginPanel.style.display);
    } else {
        console.error('Login panel not found');
    }
}

// Форма добавления проектов
function toggleAdmin() {
    console.log('Toggle admin called');
    if (!ADMIN_CONFIG.isLoggedIn) {
        toggleLogin();
        return;
    }
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
        console.log('Admin panel display:', adminPanel.style.display);
    } else {
        console.error('Admin panel not found');
    }
}

// Выход из системы
function logout() {
    ADMIN_CONFIG.isLoggedIn = false;
    localStorage.removeItem('portfolioAuth');
    updateAdminButton();
    
    // Закрываем админ-панель если открыта
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
    
    // Перерисовываем проекты (убираем кнопки удаления)
    renderProjects(projects);
    
    alert('Вы вышли из системы.');
}

// Функция для отрисовки проектов
function renderProjects(projects) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) {
        console.error('Portfolio grid not found');
        return;
    }
    
    if (projects.length === 0) {
        portfolioGrid.innerHTML = `
            <div style="text-align: center; color: var(--gray); padding: 60px 20px;">
                <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3 style="margin-bottom: 10px;">Пока нет проектов</h3>
                <p style="margin-bottom: 20px;">${ADMIN_CONFIG.isLoggedIn ? 'Добавьте первый проект' : 'Свяжитесь с администратором'}</p>
                ${ADMIN_CONFIG.isLoggedIn ? 
                    '<button class="btn" onclick="toggleAdmin()"><i class="fas fa-plus"></i> Добавить проект</button>' : 
                    ''
                }
            </div>
        `;
        return;
    }
    
    portfolioGrid.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item';
        projectElement.setAttribute('data-category', project.category);

        let icon = 'code';
        if (project.category === 'web') icon = 'globe';
        if (project.category === 'app') icon = 'mobile-alt';
        if (project.category === 'design') icon = 'palette';

        projectElement.innerHTML = `
            <div class="portfolio-image ${project.image ? 'has-image' : ''}">
                ${project.image ? 
                    `<img src="images/${project.image}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'">` : 
                    ''
                }
                <i class="fas fa-${icon} fa-icon"></i>
                <div class="portfolio-overlay">
                    <div class="portfolio-links">
                        ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="portfolio-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="portfolio-link">
                            <i class="fab fa-github"></i>
                        </a>` : ''}
                        ${ADMIN_CONFIG.isLoggedIn ? `
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
                ${ADMIN_CONFIG.isLoggedIn ? `
                    <small style="color: var(--primary); font-size: 12px;">ID: ${project.id}</small>
                ` : ''}
            </div>
        `;

        portfolioGrid.appendChild(projectElement);
    });
}

// Функция удаления проекта
function deleteProject(projectId) {
    if (!ADMIN_CONFIG.isLoggedIn) {
        alert('Сначала войдите в систему!');
        return;
    }
    
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
        projects = projects.filter(project => project.id !== projectId);
        saveProjectsToStorage(projects);
        renderProjects(projects);
        initPortfolioFilters();
        alert('Проект удален!');
    }
}

// Инициализация фильтров портфолио
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileMenuBtn.innerHTML = navbar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
}

// Закрытие меню при клике на ссылку
function initNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbar = document.getElementById('navbar');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (navbar) {
                navbar.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Активная навигация при прокрутке
function initScrollSpy() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
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

// Анимация появления элементов при прокрутке
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Запускаем сразу для видимых элементов
}

// Анимация прогресс-баров
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            const elementTop = bar.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight - 100) {
                bar.style.width = width + '%';
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
}

// Обработка формы входа
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const passwordInput = document.getElementById('login-password');
            if (!passwordInput) return;
            
            const password = passwordInput.value;
            
            if (password === ADMIN_CONFIG.password) {
                ADMIN_CONFIG.isLoggedIn = true;
                localStorage.setItem('portfolioAuth', 'true');
                updateAdminButton();
                toggleLogin();
                this.reset();
                alert('Успешный вход! Теперь вы можете добавлять проекты.');
            } else {
                alert('Неверный пароль!');
            }
        });
    }
}

// Обработка формы добавления проекта
function initProjectForm() {
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!ADMIN_CONFIG.isLoggedIn) {
                alert('Сначала войдите в систему!');
                toggleLogin();
                return;
            }
            
            const titleInput = document.getElementById('project-title');
            const categoryInput = document.getElementById('project-category');
            const descriptionInput = document.getElementById('project-description');
            const imageInput = document.getElementById('project-image');
            const demoInput = document.getElementById('project-demo');
            const githubInput = document.getElementById('project-github');
            
            if (!titleInput || !categoryInput || !descriptionInput || !imageInput) return;
            
            const newProject = {
                id: Date.now(),
                title: titleInput.value,
                category: categoryInput.value,
                description: descriptionInput.value,
                image: imageInput.value,
                demoLink: demoInput ? demoInput.value || '' : '',
                githubLink: githubInput ? githubInput.value || '' : ''
            };
            
            // Добавляем проект в массив
            projects.push(newProject);
            
            // Сохраняем в localStorage
            saveProjectsToStorage(projects);
            
            // Перерисовываем проекты
            renderProjects(projects);
            initPortfolioFilters();
            
            this.reset();
            toggleAdmin();
            alert('Проект успешно добавлен!');
        });
    }
}

// Обработка формы контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }
}

// Закрытие админ-панелей при клике вне их
function initClickOutside() {
    document.addEventListener('click', function(e) {
        const loginPanel = document.getElementById('login-panel');
        const adminPanel = document.getElementById('admin-panel');
        const adminToggleBtn = document.querySelector('.admin-toggle-btn');
        
        if (loginPanel && loginPanel.style.display === 'block' && 
            !loginPanel.contains(e.target) && 
            (!adminToggleBtn || !adminToggleBtn.contains(e.target))) {
            loginPanel.style.display = 'none';
        }
        
        if (adminPanel && adminPanel.style.display === 'block' && 
            !adminPanel.contains(e.target) && 
            (!adminToggleBtn || !adminToggleBtn.contains(e.target))) {
            adminPanel.style.display = 'none';
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // Проверяем авторизацию
    checkAuth();
    
    // Инициализируем все компоненты
    initMobileMenu();
    initNavLinks();
    initSmoothScroll();
    initScrollSpy();
    initFadeAnimations();
    initSkillBars();
    initLoginForm();
    initProjectForm();
    initContactForm();
    initClickOutside();
    
    // Загружаем и отображаем проекты
    renderProjects(projects);
    initPortfolioFilters();
    
    console.log('Portfolio initialized successfully!');
    console.log('Projects count:', projects.length);
    console.log('Admin logged in:', ADMIN_CONFIG.isLoggedIn);
});

// Делаем функции глобальными для вызова из HTML
window.toggleLogin = toggleLogin;
window.toggleAdmin = toggleAdmin;
window.logout = logout;
window.deleteProject = deleteProject;