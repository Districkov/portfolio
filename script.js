// =============================================
// КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
// =============================================
const CONFIG = {
    enable3D: false,
    musicEnabled: true,
    particlesEnabled: true,
    customCursor: true
};

let projects = [];
let threeScene = null;

// =============================================
// КАСТОМНЫЙ КУРСОР
// =============================================
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('customCursor');
        this.init();
    }

    init() {
        if (!this.cursor) {
            console.warn('Custom cursor element not found');
            return;
        }

        // Проверяем поддержку fine pointer (не сенсорные устройства)
        if (window.matchMedia('(pointer: fine)').matches && CONFIG.customCursor) {
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

        // Эффекты при наведении на интерактивные элементы
        const hoverElements = document.querySelectorAll(
            'a, button, .btn, .service-card, .portfolio-card, .filter-btn, input, textarea, select, .mobile-menu-btn, .theme-toggle'
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

    // Включение/выключение кастомного курсора
    toggle(enabled) {
        CONFIG.customCursor = enabled;
        if (enabled) {
            this.cursor.style.display = 'block';
        } else {
            this.cursor.style.display = 'none';
        }
    }
}

// =============================================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing portfolio application...');
    
    // Инициализация основных модулей
    initializeApp();
    
    // Загрузка проектов
    loadProjects();
    
    console.log('✅ Portfolio application initialized successfully!');
});

function initializeApp() {
    // Инициализация кастомного курсора
    initCustomCursor();
    
    // Инициализация темы
    initTheme();
    
    // Инициализация музыки
    initMusic();
    
    // Инициализация обработчиков событий
    initEventListeners();
    
    // Инициализация анимаций
    initAnimations();
    
    // Инициализация улучшенного динамического фона
    initEnhancedDynamicBackground();
    
    // Инициализация прогресса страницы
    initPageProgress();
    
    // Инициализация кнопки музыки внизу
    initBottomMusicButton();
    
    // Инициализация AI ассистента
    initEnhancedChatAssistant();
    
    // Инициализация PWA
    initPWA();
    
    // Инициализация мультиязычности
    initI18n();
}

function initCustomCursor() {
    window.customCursor = new CustomCursor();
}

// =============================================
// БУРГЕР МЕНЮ - ПОЛНОСТЬЮ ПЕРЕРАБОТАННОЕ
// =============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    const navList = navbar ? navbar.querySelector('ul') : null;
    
    if (!mobileMenuBtn || !navbar || !navList) {
        console.warn('Mobile menu elements not found');
        return;
    }

    console.log('🍔 Mobile menu initialization started');

    function toggleMenu() {
        const isActive = navList.classList.contains('active');
        
        if (isActive) {
            // Закрытие меню
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
            console.log('📱 Mobile menu closed');
        } else {
            // Открытие меню
            navList.classList.add('active');
            mobileMenuBtn.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
            console.log('📱 Mobile menu opened');
        }
    }

    function closeMenu() {
        navList.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }

    // Обработчик клика по бургер-кнопке
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleMenu();
    });

    // Закрытие меню при клике на ссылку
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Для якорных ссылок даем время на скролл перед закрытием
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Закрываем меню после небольшой задержки
                setTimeout(closeMenu, 300);
            } else {
                closeMenu();
            }
        });
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Закрытие меню при изменении размера окна (на десктоп)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    console.log('✅ Mobile menu initialized successfully');
}

// =============================================
// НАВИГАЦИЯ И ПРОКРУТКА
// =============================================
function initNavigation() {
    // Инициализация мобильного меню
    initMobileMenu();

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Активная навигация при скролле
    function updateActiveNavLink() {
        let current = '';
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, href);
            }
        });
    });

    // Обновление активной ссылки при скролле
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Инициализация при загрузке
}

// =============================================
// PWA ФУНКЦИОНАЛ
// =============================================
function initPWA() {
    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker зарегистрирован:', registration);
            })
            .catch(error => {
                console.log('❌ Ошибка регистрации Service Worker:', error);
            });
    }

    // Обработка установки PWA
    let deferredPrompt;
    const installBtn = document.getElementById('pwaInstallBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        if (installBtn) {
            installBtn.style.display = 'flex';
            installBtn.addEventListener('click', installPWA);
        }
    });

    function installPWA() {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ Пользователь принял установку');
                if (installBtn) installBtn.style.display = 'none';
            }
            deferredPrompt = null;
        });
    }

    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA установлено');
        if (installBtn) installBtn.style.display = 'none';
        showNotification('Приложение успешно установлено!', 'success');
    });
}

// =============================================
// МУЛЬТИЯЗЫЧНОСТЬ
// =============================================
function initI18n() {
    const langSwitcher = document.getElementById('languageSwitcher');
    if (!langSwitcher) return;

    const currentLang = localStorage.getItem('portfolioLang') || 'ru';
    
    // Устанавливаем активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });

    // Применяем текущий язык
    applyLanguage(currentLang);
}

function switchLanguage(lang) {
    localStorage.setItem('portfolioLang', lang);
    applyLanguage(lang);
    showNotification(`Язык изменен на ${getLanguageName(lang)}`, 'success');
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Обновляем активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Загружаем и применяем переводы
    updateUITexts(lang);
}

function getLanguageName(lang) {
    const names = {
        'ru': 'Русский',
        'en': 'English',
        'es': 'Español'
    };
    return names[lang] || lang;
}

function updateUITexts(lang) {
    const translations = {
        ru: {
            'loading': 'Загрузка...',
            'nav.home': 'Главная',
            'nav.about': 'Обо мне',
            'nav.services': 'Услуги',
            'nav.portfolio': 'Портфолио',
            'nav.contact': 'Контакты',
            'nav.admin': 'Админка',
            'hero.title': 'Привет, я ',
            'hero.subtitle': 'Фронтенд разработчик с опытом создания современных веб-приложений',
            'hero.works': 'Мои работы',
            'hero.contact': 'Связаться со мной'
        },
        en: {
            'loading': 'Loading...',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.portfolio': 'Portfolio',
            'nav.contact': 'Contact',
            'nav.admin': 'Admin',
            'hero.title': 'Hello, I\'m ',
            'hero.subtitle': 'Frontend developer with experience in creating modern web applications',
            'hero.works': 'My Works',
            'hero.contact': 'Contact Me'
        },
        es: {
            'loading': 'Cargando...',
            'nav.home': 'Inicio',
            'nav.about': 'Sobre Mí',
            'nav.services': 'Servicios',
            'nav.portfolio': 'Portafolio',
            'nav.contact': 'Contacto',
            'nav.admin': 'Admin',
            'hero.title': 'Hola, soy ',
            'hero.subtitle': 'Desarrollador frontend con experiencia en crear aplicaciones web modernas',
            'hero.works': 'Mis Trabajos',
            'hero.contact': 'Contáctame'
        }
    };

    const texts = translations[lang] || translations.ru;
    
    // Обновляем тексты
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });

    // Обновляем placeholder'ы
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (texts[key]) {
            element.placeholder = texts[key];
        }
    });
}

// =============================================
// ЗАГРУЗКА И ОТОБРАЖЕНИЕ ПРОЕКТОВ
// =============================================
function loadProjects() {
    console.log('🔄 Loading projects...');
    
    const savedProjects = localStorage.getItem('portfolioProjects');
    
    if (savedProjects && savedProjects !== 'null' && savedProjects !== 'undefined') {
        try {
            projects = JSON.parse(savedProjects);
            console.log(`📁 Loaded ${projects.length} projects from localStorage`, projects);
            
            if (!Array.isArray(projects) || projects.length === 0) {
                throw new Error('Invalid projects data');
            }
        } catch (error) {
            console.error('❌ Error loading projects from localStorage:', error);
            projects = getDefaultProjects();
            localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        }
    } else {
        console.log('📁 No saved projects found, loading defaults');
        projects = getDefaultProjects();
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    }
    
    console.log(`✅ Final projects count: ${projects.length}`);
    renderProjects();
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

function renderProjects() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) {
        console.error('❌ Portfolio grid element not found!');
        return;
    }

    console.log('🎨 Rendering projects:', projects);

    if (!projects || projects.length === 0) {
        portfolioGrid.innerHTML = `
            <div class="empty-portfolio">
                <i class="fas fa-folder-open"></i>
                <h3>Нет проектов</h3>
                <p>Проекты не загружены. Попробуйте восстановить данные.</p>
                <button class="btn" onclick="restoreDefaultProjects()">
                    <i class="fas fa-history"></i> Восстановить проекты
                </button>
            </div>
        `;
        return;
    }

    portfolioGrid.innerHTML = projects.map(project => `
        <div class="portfolio-item ${project.category}" data-category="${project.category}">
            <div class="portfolio-card">
                <div class="portfolio-img">
                    <img src="images/${project.image}" alt="${project.title}" onerror="this.src='images/default-project.png'">
                    <div class="portfolio-overlay">
                        <div class="portfolio-links">
                            ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="portfolio-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="portfolio-link"><i class="fab fa-github"></i></a>` : ''}
                            <a href="#" class="portfolio-link view-details" data-project="${project.id}"><i class="fas fa-eye"></i></a>
                        </div>
                    </div>
                </div>
                <div class="portfolio-content">
                    <span class="portfolio-category">${getCategoryName(project.category)}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="portfolio-tech">
                        ${project.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    initProjectFilter();
    initProjectDetails();
    console.log('✅ Projects rendered successfully');
}

function getCategoryName(category) {
    const names = {
        web: 'Веб-сайт',
        app: 'Приложение', 
        design: 'Дизайн'
    };
    return names[category] || category;
}

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initProjectDetails() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-details')) {
            e.preventDefault();
            const projectId = parseInt(e.target.closest('.view-details').getAttribute('data-project'));
            showProjectDetails(projectId);
        }
    });
}

function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-header">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h2>${project.title}</h2>
            </div>
            <div class="modal-body">
                <div class="project-image">
                    <img src="images/${project.image}" alt="${project.title}" onerror="this.src='images/default-project.png'">
                </div>
                <div class="project-info">
                    <div class="project-description">
                        <h3>Описание проекта</h3>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-technologies">
                        <h3>Технологии</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-features">
                        <h3>Основные возможности</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-links">
                        ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn"><i class="fas fa-external-link-alt"></i> Демо</a>` : ''}
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-outline"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });
}

// =============================================
// ВОССТАНОВЛЕНИЕ ПРОЕКТОВ
// =============================================
function restoreDefaultProjects() {
    if (confirm('Восстановить стандартные проекты? Текущие данные будут заменены.')) {
        projects = getDefaultProjects();
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        renderProjects();
        showNotification('Проекты восстановлены!', 'success');
        console.log('✅ Default projects restored');
    }
}

// =============================================
// ТЕМА И НАСТРОЙКИ
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
    console.log(`🎨 Theme changed to: ${theme}`);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// =============================================
// МУЗЫКА И АУДИО
// =============================================
function initMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!music) {
        console.warn('Background music element not found');
        CONFIG.musicEnabled = false;
        return;
    }

    const musicSettings = JSON.parse(localStorage.getItem('portfolioMusicSettings') || '{"enabled":true,"volume":0.3}');
    CONFIG.musicEnabled = musicSettings.enabled;
    
    music.volume = musicSettings.volume;

    function updateMusicIcon() {
        const icon = musicToggle?.querySelector('i');
        
        if (CONFIG.musicEnabled) {
            icon?.classList.replace('fa-volume-mute', 'fa-volume-up');
        } else {
            icon?.classList.replace('fa-volume-up', 'fa-volume-mute');
        }
    }

    function toggleMusic() {
        CONFIG.musicEnabled = !CONFIG.musicEnabled;
        
        if (CONFIG.musicEnabled) {
            music.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
            music.pause();
        }
        
        const musicSettings = {
            enabled: CONFIG.musicEnabled,
            volume: music.volume
        };
        localStorage.setItem('portfolioMusicSettings', JSON.stringify(musicSettings));
        
        updateMusicIcon();
        showNotification(CONFIG.musicEnabled ? 'Музыка включена' : 'Музыка выключена', 'info');
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    if (CONFIG.musicEnabled) {
        document.addEventListener('click', function startMusic() {
            music.play().catch(e => console.log('Autoplay prevented:', e));
            document.removeEventListener('click', startMusic);
        }, { once: true });
    }

    updateMusicIcon();
}

function initBottomMusicButton() {
    if (!document.getElementById('musicToggle')) {
        const musicButton = document.createElement('button');
        musicButton.id = 'musicToggle';
        musicButton.className = 'music-toggle-bottom';
        musicButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicButton.title = 'Включить/выключить музыку';
        
        musicButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--primary);
            border: none;
            color: var(--dark);
            font-size: 20px;
            cursor: pointer;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(124, 252, 0, 0.3);
        `;

        musicButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(124, 252, 0, 0.5)';
        });

        musicButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(124, 252, 0, 0.3)';
        });

        document.body.appendChild(musicButton);

        musicButton.addEventListener('click', function() {
            const music = document.getElementById('backgroundMusic');
            if (!music) return;

            CONFIG.musicEnabled = !CONFIG.musicEnabled;
            
            if (CONFIG.musicEnabled) {
                music.play().catch(e => console.log('Autoplay prevented:', e));
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                music.pause();
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
            
            const musicSettings = {
                enabled: CONFIG.musicEnabled,
                volume: music.volume
            };
            localStorage.setItem('portfolioMusicSettings', JSON.stringify(musicSettings));
        });

        console.log('✅ Bottom music button initialized');
    }
}

// =============================================
// АНИМАЦИИ И ЭФФЕКТЫ
// =============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .service-card, .portfolio-item').forEach(el => {
        observer.observe(el);
    });

    initCounters();
    initSkillsAnimation();
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
                skillsObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillsObserver.observe(bar));
}

function initPageProgress() {
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
// ДИНАМИЧЕСКИЙ ФОН
// =============================================
function initEnhancedDynamicBackground() {
    const bgContainer = document.getElementById('dynamic-bg');
    if (!bgContainer) return;

    bgContainer.innerHTML = '';
    
    // Создаем градиентный фон
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    `;
    bgContainer.appendChild(gradientOverlay);

    // Создаем сетку из линий
    createGridLines(bgContainer);
    
    // Создаем улучшенные частицы
    createEnhancedParticles(bgContainer);
    
    // Создаем пульсирующие круги
    createPulsingCircles(bgContainer);
    
    console.log('🎨 Enhanced dynamic background initialized');
}

function createGridLines(container) {
    const gridSize = 50;
    const gridLines = document.createElement('div');
    gridLines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(124, 252, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 252, 0, 0.03) 1px, transparent 1px);
        background-size: ${gridSize}px ${gridSize}px;
        z-index: 0;
    `;
    container.appendChild(gridLines);
}

function createEnhancedParticles(container) {
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.4 + 0.1};
            animation: enhancedFloat ${duration}s linear infinite ${delay}s;
            filter: blur(${Math.random() * 2}px);
        `;
        
        container.appendChild(particle);
    }
}

function createPulsingCircles(container) {
    const circleCount = 3;
    
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        const size = Math.random() * 200 + 100;
        const duration = Math.random() * 8 + 4;
        const delay = Math.random() * 2;
        
        circle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border: 1px solid rgba(124, 252, 0, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: pulseCircle ${duration}s ease-in-out infinite ${delay}s;
            z-index: 0;
        `;
        
        container.appendChild(circle);
    }
}

// =============================================
// AI ЧАТ-АССИСТЕНТ
// =============================================
function initEnhancedChatAssistant() {
    createChatAssistantElements();
    
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatAssistant = document.getElementById('chat-assistant');
    
    if (!chatToggle) return;
    
    // Убедимся, что чат изначально скрыт
    if (chatAssistant) {
        chatAssistant.style.display = 'none';
        chatAssistant.classList.remove('active');
    }
    
    // Показываем/скрываем чат
    chatToggle.addEventListener('click', () => {
        const isActive = chatAssistant.classList.contains('active');
        
        if (isActive) {
            closeChatAssistant();
        } else {
            chatAssistant.style.display = 'flex';
            setTimeout(() => {
                chatAssistant.classList.add('active');
                chatInput.focus();
            }, 10);
        }
    });
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            closeChatAssistant();
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateEnhancedAIResponse(message);
            addMessage(response, 'bot');
            scrollChatToBottom();
        }, 1000 + Math.random() * 2000);
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatAssistant.classList.contains('active')) {
            closeChatAssistant();
        }
    });
    
    addEnhancedQuickReplies();
    
    console.log('🤖 Enhanced chat assistant initialized');
}

function createChatAssistantElements() {
    if (document.getElementById('chat-assistant')) return;
    
    const chatHTML = `
        <div class="chat-toggle" id="chatToggle">
            <i class="fas fa-robot"></i>
        </div>
        
        <div class="chat-assistant" id="chat-assistant">
            <div class="chat-header">
                <div class="chat-title">
                    <i class="fas fa-robot"></i>
                    <span>AI Помощник</span>
                </div>
                <button class="chat-close" id="chatClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="chat-messages" id="chatMessages">
                <div class="message bot-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Привет! 👋 Я ваш AI-помощник. Могу рассказать о навыках, проектах, опыте работы и многом другом. Чем могу помочь?</p>
                    </div>
                </div>
            </div>
            
            <div class="chat-input-container">
                <input type="text" id="chatInput" placeholder="Задайте вопрос...">
                <button class="chat-send" id="chatSend">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = chatHTML;
    document.body.appendChild(chatContainer);
    
    addChatStyles();
}

function addChatStyles() {
    if (document.querySelector('#chat-styles')) return;
    
    const chatStyles = `
        .chat-toggle {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: var(--primary);
            color: var(--dark);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: var(--shadow);
        }
        
        .chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: var(--glow);
        }
        
        .chat-assistant {
            position: fixed;
            bottom: 170px;
            right: 30px;
            width: 400px;
            height: 500px;
            background: var(--dark-light);
            border: 1px solid rgba(124, 252, 0, 0.2);
            border-radius: var(--border-radius);
            display: none;
            flex-direction: column;
            z-index: 101;
            box-shadow: var(--shadow);
            transform: translateY(20px) scale(0.9);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .chat-assistant.active {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        
        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid rgba(124, 252, 0, 0.1);
            background: rgba(10, 10, 10, 0.8);
            border-radius: var(--border-radius) var(--border-radius) 0 0;
        }
        
        .chat-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            color: var(--light);
        }
        
        .chat-title i {
            color: var(--primary);
        }
        
        .chat-close {
            background: none;
            border: none;
            color: var(--gray);
            cursor: pointer;
            padding: 5px;
            border-radius: 3px;
            transition: var(--transition);
        }
        
        .chat-close:hover {
            color: var(--light);
            background: rgba(255,255,255,0.1);
        }
        
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .message {
            display: flex;
            gap: 10px;
            align-items: flex-start;
        }
        
        .user-message {
            flex-direction: row-reverse;
        }
        
        .message-avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: var(--primary);
            color: var(--dark);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            flex-shrink: 0;
        }
        
        .user-message .message-avatar {
            background: var(--gray);
        }
        
        .message-content {
            max-width: 70%;
            background: rgba(124, 252, 0, 0.1);
            padding: 12px 15px;
            border-radius: 15px;
            border: 1px solid rgba(124, 252, 0, 0.2);
        }
        
        .user-message .message-content {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
        }
        
        .message-content p {
            margin: 0;
            color: var(--light);
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .typing-indicator {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        
        .typing-dot {
            width: 6px;
            height: 6px;
            background: var(--primary);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        .quick-replies.enhanced {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 10px;
        }
        
        .quick-reply.enhanced {
            background: rgba(124, 252, 0, 0.1);
            border: 1px solid rgba(124, 252, 0, 0.3);
            color: var(--primary);
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 5px;
            justify-content: center;
            text-align: center;
        }
        
        .quick-reply.enhanced:hover {
            background: rgba(124, 252, 0, 0.2);
            transform: translateY(-2px);
        }
        
        .chat-input-container {
            display: flex;
            padding: 20px;
            border-top: 1px solid rgba(124, 252, 0, 0.1);
            gap: 10px;
        }
        
        #chatInput {
            flex: 1;
            padding: 12px 15px;
            background: var(--dark);
            border: 1px solid rgba(124, 252, 0, 0.2);
            border-radius: 25px;
            color: var(--light);
            font-size: 0.9rem;
        }
        
        #chatInput:focus {
            outline: none;
            border-color: var(--primary);
        }
        
        .chat-send {
            width: 45px;
            height: 45px;
            background: var(--primary);
            color: var(--dark);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chat-send:hover {
            transform: scale(1.1);
            box-shadow: var(--glow);
        }
        
        @keyframes typingBounce {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'chat-styles';
    styleSheet.textContent = chatStyles;
    document.head.appendChild(styleSheet);
}

function closeChatAssistant() {
    const chatAssistant = document.getElementById('chat-assistant');
    if (chatAssistant) {
        chatAssistant.classList.remove('active');
        setTimeout(() => {
            chatAssistant.style.display = 'none';
        }, 300);
    }
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${avatar}
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollChatToBottom();
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function scrollChatToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function addEnhancedQuickReplies() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const quickReplies = [
        { text: "Расскажи о навыках", icon: "fas fa-code" },
        { text: "Покажи проекты", icon: "fas fa-briefcase" },
        { text: "Опыт работы", icon: "fas fa-history" },
        { text: "Как связаться?", icon: "fas fa-phone" },
        { text: "Какие услуги?", icon: "fas fa-cogs" },
        { text: "Управление музыкой", icon: "fas fa-music" }
    ];
    
    const quickRepliesDiv = document.createElement('div');
    quickRepliesDiv.className = 'quick-replies enhanced';
    
    quickReplies.forEach(reply => {
        const button = document.createElement('button');
        button.className = 'quick-reply enhanced';
        button.innerHTML = `<i class="${reply.icon}"></i> ${reply.text}`;
        button.addEventListener('click', () => {
            handleQuickReply(reply.text);
        });
        
        quickRepliesDiv.appendChild(button);
    });
    
    const existingReplies = chatMessages.querySelector('.quick-replies.enhanced');
    if (!existingReplies) {
        chatMessages.appendChild(quickRepliesDiv);
    }
}

function handleQuickReply(replyText) {
    addMessage(replyText, 'user');
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateEnhancedAIResponse(replyText);
        addMessage(response, 'bot');
        scrollChatToBottom();
    }, 800);
}

function generateEnhancedAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    const responses = {
        skills: `Мои ключевые навыки включают:
• HTML/CSS (95%) - Семантическая верстка, адаптивный дизайн
• JavaScript (90%) - ES6+, асинхронное программирование
• React (85%) - Хуки, Context API, React Router
• Svelte (70%) - Современный компилируемый фреймворк
• UI/UX Design (75%) - Прототипирование, дизайн-системы

Также имею опыт работы с различными API.`,

        projects: `В моем портфолио представлены различные проекты:

🏪 **Moscow RP** - Интернет-магазин для GTA 5 RP
• Технологии: HTML, CSS, JavaScript
• Особенности: Корзина, фильтры, адаптивный дизайн

📱 **Pyrometer** - Веб-приложение для управления задачами
• Технологии: React, Node.js
• Особенности: Совместная работа, уведомления

🎨 **Astra GTA 5 RP** - UI/UX дизайн
• Инструменты: Figma, Adobe XD
• Особенности: Современный интерфейс, пользовательские flow`,

        experience: `Мой опыт во фронтенд разработке:

⏳ **2+ года** коммерческого опыта
✅ **10+ завершенных проектов**
👥 **6+ довольных клиентов**
🎯 **Специализация**: Современные веб-приложения

Работал над проектами различной сложности - от лендингов до сложных веб-приложений.`,

        contact: `📧 **Email**: districkov@yandex.ru
✈️ **Telegram**: @districkov
💻 **GitHub**: Districkov

📍 **Локация**: Москва
🕒 **Доступность**: В течение 1-2 часов

Буду рад обсудить ваш проект!`,

        services: `🎯 **Мои услуги**:

💻 **Веб-разработка**
Создание современных веб-сайтов и приложений

📱 **Адаптивный дизайн**
Идеальное отображение на всех устройствах

🎨 **UI/UX Дизайн**
Интуитивные и привлекательные интерфейсы

⚡ **Оптимизация**
Ускорение загрузки и улучшение производительности`,

        music: `🎵 **Управление музыкой**:

Вы можете управлять фоновой музыкой с помощью кнопки в правом нижнем углу:

🔊 **Включение/выключение** - кнопка с иконкой динамика
🎵 **Функционал**: Автоповтор, регулировка громкости

Музыка создает приятную атмосферу при просмотре портфолио!`
    };
    
    if (message.includes('навык') || message.includes('skill') || message.includes('умение') || message.includes('технолог') || message.includes('stack')) {
        return responses.skills;
    } else if (message.includes('проект') || message.includes('работ') || message.includes('portfolio') || message.includes('кейс') || message.includes('moscow') || message.includes('pyrometer')) {
        return responses.projects;
    } else if (message.includes('опыт') || message.includes('experience') || message.includes('стаж') || message.includes('лет') || message.includes('год')) {
        return responses.experience;
    } else if (message.includes('контакт') || message.includes('связать') || message.includes('contact') || message.includes('телефон') || message.includes('email') || message.includes('telegram')) {
        return responses.contact;
    } else if (message.includes('услуг') || message.includes('service') || message.includes('предложен') || message.includes('делаешь') || message.includes('предлагаешь')) {
        return responses.services;
    } else if (message.includes('музык') || message.includes('sound') || message.includes('audio') || message.includes('звук') || message.includes('плеер')) {
        return responses.music;
    } else if (message.includes('привет') || message.includes('hello') || message.includes('hi') || message.includes('здравств') || message.includes('начать')) {
        return `Привет! 👋 

Я ваш AI-помощник в портфолио Districk. Рад вас видеть!

Я могу рассказать о:
• Навыках и технологиях 🛠
• Проектах из портфолио 💼
• Опыте работы 📈
• Контактах для связи 📞
• Предлагаемых услугах 🎯

Также могу помочь с управлением музыкой 🎵 и навигацией по сайту.

Что вас интересует?`;
    } else if (message.includes('спасибо') || message.includes('thanks') || message.includes('thank you') || message.includes('благодар')) {
        return `Пожалуйста! 😊 
Всегда рад помочь. Если возникнут еще вопросы - обращайтесь!

Не забудьте посмотреть мои проекты в разделе "Портфолио" 🚀`;
    } else if (message.includes('пока') || message.includes('bye') || message.includes('до свидан') || message.includes('выход')) {
        return `До свидания! 👋 
Буду рад помочь в будущем. Удачи!`;
    } else {
        return `🤔 Кажется, я не совсем понял ваш вопрос.

Я могу рассказать о:
• Моих навыках и технологиях
• Проектах в портфолио  
• Опыте работы
• Контактных данных
• Предлагаемых услугах
• Управлении музыкой на сайте

Попробуйте задать вопрос по-другому или используйте кнопки быстрых ответов ниже!`;
    }
}

// =============================================
// ОСНОВНЫЕ ОБРАБОТЧИКИ СОБЫТИЙ
// =============================================
function initEventListeners() {
    initNavigation();
    initContactForm();
    initNetworkMonitoring();
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 1000);
    });
}

function initNetworkMonitoring() {
    const networkStatus = document.createElement('div');
    networkStatus.className = 'network-status';
    networkStatus.id = 'networkStatus';
    document.body.appendChild(networkStatus);

    function updateNetworkStatus() {
        if (navigator.onLine) {
            networkStatus.textContent = 'Онлайн';
            networkStatus.className = 'network-status online';
            setTimeout(() => {
                networkStatus.style.display = 'none';
            }, 3000);
        } else {
            networkStatus.textContent = 'Офлайн';
            networkStatus.className = 'network-status offline';
            networkStatus.style.display = 'block';
        }
    }

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    updateNetworkStatus();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        console.log('Contact form submitted:', formData);
        
        showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
        
        this.reset();
    });
}

// =============================================
// УВЕДОМЛЕНИЯ
// =============================================
function showNotification(message, type = 'info') {
    removeExistingNotifications();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function removeExistingNotifications() {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notification => {
        if (notification.classList.contains('show')) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        } else {
            notification.remove();
        }
    });
}

// =============================================
// ГЛОБАЛЬНЫЕ ФУНКЦИИ
// =============================================
window.toggleCustomCursor = function(enabled) {
    if (window.customCursor) {
        window.customCursor.toggle(enabled);
    }
};

window.switchLanguage = switchLanguage;
window.restoreDefaultProjects = restoreDefaultProjects;

// Отладка
window.debugProjects = function() {
    console.log('=== PROJECTS DEBUG INFO ===');
    console.log('Projects array:', projects);
    console.log('LocalStorage data:', localStorage.getItem('portfolioProjects'));
    console.log('Portfolio grid element:', document.getElementById('portfolioGrid'));
    console.log('==========================');
};

console.log('🎨 Enhanced features loaded successfully!');