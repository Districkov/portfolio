// script.js
// =============================================
// ОСНОВНОЙ СКРИПТ ПОРТФОЛИО
// =============================================

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Инициализация всех компонентов
        this.initTheme();
        this.initNavigation();
        this.initSmoothScroll();
        this.initPageProgress();
        this.initPreloader();
        this.initAnimations();
        this.initCounters();
        this.initSkillsAnimation();
        this.initPortfolioFilter();
        this.initContactForm();
        this.initDynamicBackground();
        this.initMusicToggle();
        this.loadProjects();
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

        // Мобильное меню
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileMenuBtn.innerHTML = navbar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Активная ссылка при скролле
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
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

        // Закрытие мобильного меню при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // =============================================
    // ПЛАВНЫЙ СКРОЛЛ
    // =============================================
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
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
    // ПРОГРЕСС БАР СТРАНИЦЫ
    // =============================================
    initPageProgress() {
        const progressBar = document.querySelector('.progress-bar');
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    // =============================================
    // ЗАГРУЗЧИК
    // =============================================
    initPreloader() {
        const preloader = document.getElementById('preloader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1000);
        });
    }

    // =============================================
    // АНИМАЦИИ ПРИ СКРОЛЛЕ
    // =============================================
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Наблюдаем за элементами для анимации
        document.querySelectorAll('.service-card, .portfolio-item, .about-content > *').forEach(el => {
            observer.observe(el);
        });
    }

    // =============================================
    // АНИМАЦИЯ СЧЕТЧИКОВ
    // =============================================
    initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
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
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // =============================================
    // АНИМАЦИЯ НАВЫКОВ
    // =============================================
    initSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = `${width}%`;
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // =============================================
    // ФИЛЬТР ПОРТФОЛИО
    // =============================================
    initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убираем активный класс у всех кнопок
                filterBtns.forEach(b => b.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
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

    // =============================================
    // ФОРМА КОНТАКТОВ
    // =============================================
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                
                // Здесь должна быть логика отправки формы
                console.log('Данные формы:', formData);
                
                this.showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
                contactForm.reset();
            });
        }
    }

    // =============================================
    // ДИНАМИЧЕСКИЙ ФОН
    // =============================================
    initDynamicBackground() {
        const dynamicBg = document.getElementById('dynamic-bg');
        if (!dynamicBg) return;

        // Создаем дополнительные элементы для фона
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary);
                border-radius: 50%;
                opacity: ${Math.random() * 0.3};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${10 + Math.random() * 20}s linear infinite;
            `;
            dynamicBg.appendChild(dot);
        }
    }

    // =============================================
    // УПРАВЛЕНИЕ МУЗЫКОЙ
    // =============================================
    initMusicToggle() {
        const musicToggle = document.getElementById('musicToggle');
        const audio = document.getElementById('backgroundMusic');
        
        if (!musicToggle || !audio) return;

        // Проверяем настройки музыки
        const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
        
        if (musicEnabled) {
            audio.play().catch(e => console.log('Автовоспроизведение заблокировано'));
        }

        musicToggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                localStorage.setItem('musicEnabled', 'true');
                this.showNotification('Музыка включена', 'info');
            } else {
                audio.pause();
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                localStorage.setItem('musicEnabled', 'false');
                this.showNotification('Музыка выключена', 'info');
            }
        });
    }

    // =============================================
    // ЗАГРУЗКА ПРОЕКТОВ
    // =============================================
    async loadProjects() {
        try {
            const response = await fetch('projects.json');
            const projects = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            console.error('Ошибка загрузки проектов:', error);
            this.renderProjects(this.getDefaultProjects());
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
            },
            {
                "id": 2,
                "title": "Мобильное приложение",
                "category": "app",
                "description": "Кроссплатформенное мобильное приложение для управления задачами",
                "image": "project2.jpg",
                "technologies": ["React Native", "Firebase", "Redux"],
                "demo": "https://example.com",
                "github": "https://github.com/username/project2"
            },
            {
                "id": 3,
                "title": "Корпоративный сайт",
                "category": "web",
                "description": "Сайт для IT компании с анимациями и современным дизайном",
                "image": "project3.jpg",
                "technologies": ["Vue.js", "Sass", "Webpack"],
                "demo": "https://example.com",
                "github": "https://github.com/username/project3"
            }
        ];
    }

    renderProjects(projects) {
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (!portfolioGrid) return;

        portfolioGrid.innerHTML = projects.map(project => `
            <div class="portfolio-item" data-category="${project.category}">
                <div class="portfolio-card">
                    <div class="portfolio-img">
                        <img src="images/${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZmNmY2ZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPiR7cHJvamVjdC50aXRsZX08L3RleHQ+PC9zdmc+'">
                        <div class="portfolio-overlay">
                            <div class="portfolio-links">
                                ${project.demo ? `<a href="${project.demo}" class="portfolio-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                ${project.github ? `<a href="${project.github}" class="portfolio-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-content">
                        <span class="portfolio-category">${this.getCategoryName(project.category)}</span>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="portfolio-technologies">
                            ${project.technologies.map(tech => `<span class="portfolio-tech">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Переинициализируем фильтр после загрузки проектов
        this.initPortfolioFilter();
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
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// =============================================
// THREE.JS 3D СЦЕНА (опционально)
// =============================================
class ThreeJSScene {
    constructor() {
        this.init();
    }

    init() {
        const container = document.getElementById('threejs-container');
        if (!container) return;

        // Базовые настройки сцены
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Создание 3D объектов
        this.createObjects();
        
        // Настройка камеры
        this.camera.position.z = 5;

        // Анимация
        this.animate();

        // Обработчик изменения размера окна
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createObjects() {
        // Создаем геометрию и материалы
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0x7cfc00,
            shininess: 100,
            transparent: true,
            opacity: 0.1
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Добавляем освещение
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x7cfc00, 0.6);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mesh) {
            this.mesh.rotation.x += 0.005;
            this.mesh.rotation.y += 0.008;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Инициализация Three.js сцены при полной загрузке страницы
window.addEventListener('load', () => {
    // new ThreeJSScene(); // Раскомментировать для включения 3D сцены
});