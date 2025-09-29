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
let chatHistory = [];
let threeScene, threeCamera, threeRenderer, threeObjects = [];
let is3DMode = false;

// =============================================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Сначала инициализируем динамический фон
    initDynamicBackground();
    
    // Затем остальные компоненты
    loadProjects();
    checkAuth();
    initTheme();
    initInteractiveElements();
    initProjectModal();
    initClickParticles();
    initAchievements();
    initEventListeners();
    renderProjects();
    
    // Новые функции
    init3DPortfolio();
    initChatAssistant();
    
    // Скрываем прелоадер и ПОСЛЕ этого показываем AI бота и админку
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
                // ПОСЛЕ скрытия прелоадера показываем элементы
                showElementsAfterPreloader();
            }, 500);
        }
    }, 1000);
}

// =============================================
// ПОКАЗ ЭЛЕМЕНТОВ ПОСЛЕ ПРЕЛОАДЕРА
// =============================================
function showElementsAfterPreloader() {
    // Показываем кнопку AI бота с анимацией
    showAIBot();
    
    // Показываем кнопку админки
    showAdminButton();
    
    console.log('All elements shown after preloader');
}

function showAIBot() {
    const chatToggle = document.getElementById('chatToggle');
    if (chatToggle) {
        // Показываем кнопку
        chatToggle.style.display = 'flex';
        chatToggle.style.opacity = '0';
        chatToggle.style.transform = 'scale(0.5)';
        
        // Анимация появления
        setTimeout(() => {
            chatToggle.style.transition = 'all 0.5s ease';
            chatToggle.style.opacity = '1';
            chatToggle.style.transform = 'scale(1)';
            
            // Добавляем пульсацию через секунду
            setTimeout(() => {
                chatToggle.classList.add('pulse');
            }, 1000);
        }, 100);
    }
}

function showAdminButton() {
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    if (adminToggleBtn) {
        // Показываем кнопку
        adminToggleBtn.style.display = 'flex';
        adminToggleBtn.style.opacity = '0';
        adminToggleBtn.style.transform = 'scale(0.5)';
        
        // Анимация появления
        setTimeout(() => {
            adminToggleBtn.style.transition = 'all 0.5s ease';
            adminToggleBtn.style.opacity = '1';
            adminToggleBtn.style.transform = 'scale(1)';
        }, 300);
    }
}

// =============================================
// ДИНАМИЧЕСКИЙ ФОН
// =============================================
function initDynamicBackground() {
    const dynamicBg = document.getElementById('dynamic-bg');
    if (!dynamicBg) {
        console.error('Dynamic background element not found!');
        return;
    }

    // Очищаем существующие элементы
    dynamicBg.innerHTML = '';

    // Создаем контейнер для частиц
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    // Добавляем частицы
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        // Случайные параметры для разнообразия
        const size = Math.random() * 100 + 50;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 30 + 20;
        const opacity = Math.random() * 0.1 + 0.05;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.top = `${top}%`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = opacity;
        
        // Добавляем пульсацию для некоторых частиц
        if (i % 4 === 0) {
            particle.classList.add('bg-pulse');
        }
        
        particlesContainer.appendChild(particle);
    }

    // Добавляем сетку
    const grid = document.createElement('div');
    grid.className = 'bg-grid';
    
    // Добавляем волны
    const wave = document.createElement('div');
    wave.className = 'bg-wave';

    // Добавляем все элементы в фон
    dynamicBg.appendChild(particlesContainer);
    dynamicBg.appendChild(grid);
    dynamicBg.appendChild(wave);

    console.log('Dynamic background initialized with', document.querySelectorAll('.bg-particle').length, 'particles');
}

function updateBackgroundForTheme() {
    const particles = document.querySelectorAll('.bg-particle');
    const grid = document.querySelector('.bg-grid');
    const wave = document.querySelector('.bg-wave');
    
    if (CONFIG.theme.current === 'light') {
        particles.forEach(particle => {
            particle.style.opacity = '0.03';
        });
        if (grid) grid.style.opacity = '0.01';
        if (wave) wave.style.opacity = '0.02';
    } else {
        particles.forEach(particle => {
            particle.style.opacity = '0.08';
        });
        if (grid) grid.style.opacity = '0.03';
        if (wave) wave.style.opacity = '0.05';
    }
}

// =============================================
// 3D PORTFOLIO WITH WEBGL
// =============================================
function init3DPortfolio() {
    const container = document.getElementById('threejs-container');
    if (!container) {
        console.log('3D container not found');
        return;
    }
    
    try {
        // Создаем сцену
        threeScene = new THREE.Scene();
        
        // Создаем камеру
        threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        threeCamera.position.z = 5;
        
        // Создаем рендерер
        threeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        threeRenderer.setSize(window.innerWidth, window.innerHeight);
        threeRenderer.setClearColor(0x000000, 0);
        container.appendChild(threeRenderer.domElement);
        
        // Создаем 3D объекты для проектов
        create3DProjectObjects();
        
        // Добавляем освещение
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        threeScene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x7cfc00, 0.8);
        directionalLight.position.set(1, 1, 1);
        threeScene.add(directionalLight);
        
        // Обработчик изменения размера
        window.addEventListener('resize', onWindowResize);
        
        console.log('3D Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing 3D portfolio:', error);
    }
}

function create3DProjectObjects() {
    if (!threeScene) return;
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    projects.forEach((project, index) => {
        const material = new THREE.MeshPhongMaterial({ 
            color: getProjectColor(project.category),
            transparent: true,
            opacity: 0.8
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Располагаем кубы по кругу
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 3;
        cube.position.x = Math.cos(angle) * radius;
        cube.position.y = Math.sin(angle) * radius;
        cube.position.z = (Math.random() - 0.5) * 2;
        
        // Сохраняем данные проекта
        cube.userData = { 
            project: project, 
            originalY: cube.position.y,
            originalX: cube.position.x,
            originalZ: cube.position.z
        };
        
        threeScene.add(cube);
        threeObjects.push(cube);
    });
}

function getProjectColor(category) {
    const colors = {
        web: 0x7cfc00,    // Green
        app: 0x00bfff,    // Blue
        design: 0xff69b4   // Pink
    };
    return colors[category] || 0xffffff;
}

function animate3DScene() {
    if (!is3DMode || !threeScene || !threeCamera || !threeRenderer) return;
    
    requestAnimationFrame(animate3DScene);
    
    // Анимация вращения и плавания
    threeObjects.forEach((object, index) => {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        
        // Плавающий эффект
        const time = Date.now() * 0.001;
        object.position.y = object.userData.originalY + Math.sin(time + index) * 0.3;
        object.position.x = object.userData.originalX + Math.cos(time * 0.5 + index) * 0.2;
    });
    
    threeRenderer.render(threeScene, threeCamera);
}

function onWindowResize() {
    if (!threeCamera || !threeRenderer) return;
    
    threeCamera.aspect = window.innerWidth / window.innerHeight;
    threeCamera.updateProjectionMatrix();
    threeRenderer.setSize(window.innerWidth, window.innerHeight);
}

function toggle3DMode() {
    is3DMode = !is3DMode;
    const container = document.getElementById('threejs-container');
    const toggleBtn = document.getElementById('toggle3D');
    
    if (is3DMode) {
        container.classList.add('active');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-cube"></i> 2D Режим';
        }
        showNotification('3D режим активирован!', 'success');
        showAchievement('3dMode');
        // Запускаем анимацию
        animate3DScene();
    } else {
        container.classList.remove('active');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Режим';
        }
    }
}

// =============================================
// AI CHAT ASSISTANT
// =============================================
function initChatAssistant() {
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatAssistant = document.getElementById('chat-assistant');
    
    if (!chatToggle) {
        console.log('Chat assistant elements not found');
        return;
    }
    
    // Показываем/скрываем чат
    chatToggle.addEventListener('click', () => {
        const isActive = chatAssistant.classList.contains('active');
        
        if (isActive) {
            chatAssistant.classList.remove('active');
            setTimeout(() => {
                chatAssistant.style.display = 'none';
            }, 300);
        } else {
            chatAssistant.style.display = 'flex';
            setTimeout(() => {
                chatAssistant.classList.add('active');
                chatInput.focus();
                showAchievement('chatOpened');
            }, 10);
        }
    });
    
    chatClose.addEventListener('click', () => {
        chatAssistant.classList.remove('active');
        setTimeout(() => {
            chatAssistant.style.display = 'none';
        }, 300);
    });
    
    // Отправка сообщения
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Показываем индикатор набора
        showTypingIndicator();
        
        // Имитируем задержку ответа AI
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateAIResponse(message);
            addMessage(response, 'bot');
            scrollChatToBottom();
        }, 1000 + Math.random() * 2000);
    }
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Быстрые ответы
    addQuickReplies();
    
    console.log('Chat assistant initialized');
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
    
    // Сохраняем в историю
    chatHistory.push({ sender, text, timestamp: new Date() });
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

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // База знаний AI помощника
    const responses = {
        skills: "Мои ключевые навыки: HTML/CSS (95%), JavaScript (90%), React (85%), Svelte (70%), UI/UX Design (75%). Я специализируюсь на создании современных веб-приложений с использованием передовых технологий.",
        projects: "В моем портфолио представлены различные проекты: интернет-магазины, веб-приложения, UI/UX дизайн. Самые заметные проекты: Moscow RP (интернет-магазин), Pyrometer (веб-приложение), Astra GTA 5 RP (UI/UX дизайн).",
        experience: "Я занимаюсь фронтенд разработкой более 2 лет. За это время завершил 10+ проектов и работал с 6+ довольными клиентами. Специализируюсь на создании отзывчивых и современных пользовательских интерфейсов.",
        contact: "Вы можете связаться со мной через:\n• Email: ert34vh@gmail.com\n• Телефон: +7 (926) 718-55-52\n• Telegram: @districk\n• GitHub: Districkov\nБуду рад обсудить ваш проект!",
        services: "Я предлагаю следующие услуги:\n• Веб-разработка (современные сайты и приложения)\n• Адаптивный дизайн (идеальное отображение на всех устройствах)\n• UI/UX дизайн (интуитивные и привлекательные интерфейсы)",
        technology: "В работе использую: HTML5, CSS3, JavaScript (ES6+), React, Svelte, Three.js, Git. Также имею опыт с различными CSS-фреймворками и инструментами сборки.",
        default: "Я могу рассказать о моих навыках, проектах, опыте работы, услугах или технологиях. Также могу помочь с навигацией по портфолио. Что вас интересует больше всего?"
    };
    
    // Определяем интент сообщения
    if (message.includes('навык') || message.includes('skill') || message.includes('умение') || message.includes('технолог')) {
        return responses.skills;
    } else if (message.includes('проект') || message.includes('работ') || message.includes('portfolio') || message.includes('кейс')) {
        return responses.projects;
    } else if (message.includes('опыт') || message.includes('experience') || message.includes('стаж') || message.includes('лет')) {
        return responses.experience;
    } else if (message.includes('контакт') || message.includes('связать') || message.includes('contact') || message.includes('телефон') || message.includes('email')) {
        return responses.contact;
    } else if (message.includes('услуг') || message.includes('service') || message.includes('предложен') || message.includes('делаешь')) {
        return responses.services;
    } else if (message.includes('технолог') || message.includes('stack') || message.includes('инструмент') || message.includes('используешь')) {
        return responses.technology;
    } else if (message.includes('привет') || message.includes('hello') || message.includes('hi') || message.includes('здравств')) {
        return "Привет! 👋 Рад вас видеть в моем портфолио. Я AI-помощник, готовый рассказать о навыках, проектах и опыте разработчика. Чем могу помочь?";
    } else if (message.includes('спасибо') || message.includes('thanks') || message.includes('thank you')) {
        return "Пожалуйста! 😊 Всегда рад помочь. Если возникнут еще вопросы - обращайтесь!";
    } else if (message.includes('пока') || message.includes('bye') || message.includes('до свидан')) {
        return "До свидания! 👋 Буду рад помочь в будущем. Удачи!";
    } else if (message.includes('помощь') || message.includes('help') || message.includes('что ты умеешь')) {
        return "Я могу:\n• Рассказать о навыках и технологиях\n• Показать проекты из портфолио\n• Рассказать об опыте работы\n• Показать контакты\n• Рассказать об услугах\nЧто вас интересует?";
    } else {
        return responses.default;
    }
}

function addQuickReplies() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const quickReplies = [
        "Расскажи о навыках",
        "Покажи проекты", 
        "Опыт работы",
        "Как связаться?",
        "Какие услуги?",
        "Какие технологии?"
    ];
    
    const quickRepliesDiv = document.createElement('div');
    quickRepliesDiv.className = 'quick-replies';
    
    quickReplies.forEach(reply => {
        const button = document.createElement('button');
        button.className = 'quick-reply';
        button.textContent = reply;
        button.addEventListener('click', () => {
            addMessage(reply, 'user');
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateAIResponse(reply);
                addMessage(response, 'bot');
                scrollChatToBottom();
            }, 800);
        });
        
        quickRepliesDiv.appendChild(button);
    });
    
    chatMessages.appendChild(quickRepliesDiv);
}

// =============================================
// ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ
// =============================================
function initInteractiveElements() {
    // Параллакс эффект для фона
    initParallax();
    
    // Анимация печатающего текста
    initTypewriter();
    
    // Интерактивные навыки
    initInteractiveSkills();
    
    // hover эффекты для карточек
    initCardHoverEffects();
    
    // Прогресс загрузки страницы
    initPageProgress();
    
    // Анимация счетчиков
    initCounters();
}

// Параллакс эффект
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Эффект печатающего текста
function initTypewriter() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--primary)';
    
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            heroTitle.style.borderRight = 'none';
        }
    }
    
    // Запускаем после загрузки
    setTimeout(typeWriter, 1000);
}

// Интерактивные навыки
function initInteractiveSkills() {
    const skills = document.querySelectorAll('.skill-item');
    
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Эффекты при наведении на карточки
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(124, 252, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Прогресс загрузки страницы
function initPageProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// Анимация счетчиков
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
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
        
        // Запускаем когда элемент в зоне видимости
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
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
        
        // Обновляем 3D сцену
        if (is3DMode) {
            update3DScene();
        }
    }
}

function update3DScene() {
    // Очищаем старые объекты
    threeObjects.forEach(object => {
        threeScene.remove(object);
    });
    threeObjects = [];
    
    // Создаем новые объекты
    create3DProjectObjects();
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
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    }
}

function toggleAdminPanel() {
    if (!CONFIG.admin.isLoggedIn) {
        toggleLoginPanel();
        return;
    }
    
    const panel = document.getElementById('admin-panel');
    if (panel) {
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
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
    updateBackgroundForTheme();
    showAchievement('themeChanged');
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
            
            // Обновляем 3D сцену
            if (is3DMode) {
                update3DScene();
            }
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
        showAchievement('contactSent');
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
// МОДАЛЬНОЕ ОКНО ДЛЯ ПРОЕКТОВ
// =============================================
function initProjectModal() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    portfolioGrid.addEventListener('click', function(e) {
        const projectElement = e.target.closest('.portfolio-item');
        if (!projectElement) return;
        
        // Не открываем модалку при клике на ссылки или кнопки удаления
        if (e.target.closest('a') || e.target.closest('.delete-btn')) return;
        
        const projectId = projectElement.querySelector('.project-id')?.textContent.replace('ID: ', '');
        const project = projects.find(p => p.id == projectId);
        
        if (project) {
            showProjectModal(project);
            showAchievement('projectViewed');
        }
    });
}

function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: var(--dark-light);
            padding: 30px;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            border: 2px solid var(--primary);
        ">
            <button class="modal-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: var(--light);
                font-size: 24px;
                cursor: pointer;
            ">&times;</button>
            <h2 style="color: var(--light); margin-bottom: 20px;">${project.title}</h2>
            <div class="modal-image">
                <img src="images/${project.image}" alt="${project.title}" style="width: 100%; border-radius: 10px; margin: 20px 0;">
            </div>
            <p style="color: var(--gray); line-height: 1.6;">${project.description}</p>
            <div class="modal-links" style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn"><i class="fas fa-external-link-alt"></i> Демо</a>` : ''}
                ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-outline"><i class="fab fa-github"></i> GitHub</a>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие модального окна
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });
}

// =============================================
// ЭФФЕКТ ЧАСТИЦ ПРИ КЛИКЕ
// =============================================
function initClickParticles() {
    document.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
    });
}

function createParticles(x, y) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'click-particles';
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const particleX = Math.cos(angle) * distance;
        const particleY = Math.sin(angle) * distance;
        
        particle.style.setProperty('--x', `${particleX}px`);
        particle.style.setProperty('--y', `${particleY}px`);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
    
    setTimeout(() => {
        particlesContainer.remove();
    }, 1000);
}

// =============================================
// СИСТЕМА ДОСТИЖЕНИЙ
// =============================================
function initAchievements() {
    // Проверяем достижения
    checkAchievements();
}

function checkAchievements() {
    if (!localStorage.getItem('firstVisit')) {
        showAchievement('firstVisit');
        localStorage.setItem('firstVisit', 'true');
    }
}

function showAchievement(achievementId) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-notification';
    achievement.innerHTML = `
        <div class="achievement-content">
            <i class="fas fa-trophy"></i>
            <div class="achievement-text">
                <strong>Достижение разблокировано!</strong>
                <span>${getAchievementName(achievementId)}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        achievement.classList.remove('show');
        setTimeout(() => {
            achievement.remove();
        }, 500);
    }, 3000);
}

function getAchievementName(id) {
    const names = {
        firstVisit: 'Первое посещение',
        themeChanged: 'Исследователь тем',
        projectViewed: 'Любознательный',
        contactSent: 'Социальная активность',
        chatOpened: 'Диалог начат',
        '3dMode': '3D Исследователь'
    };
    
    return names[id] || 'Неизвестное достижение';
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
    
    // Обработчик для 3D режима
    const toggle3DBtn = document.getElementById('toggle3D');
    if (toggle3DBtn) {
        toggle3DBtn.addEventListener('click', toggle3DMode);
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        initMobileMenu();
        onWindowResize();
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
window.toggle3DMode = toggle3DMode;