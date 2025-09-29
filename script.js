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
    },
    music: {
        enabled: true,
        volume: 0.3,
        currentTime: 0
    }
};

let projects = [];
let chatHistory = [];
let threeScene, threeCamera, threeRenderer, threeObjects = [];
let is3DMode = false;
let musicProgressInterval;

// Состояние приложения
const APP_STATE = {
    isInitialized: false,
    components: {
        music: false,
        chat: false,
        threejs: false,
        background: false
    }
};

// =============================================
// УЛУЧШЕННАЯ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedApp();
});

async function initializeEnhancedApp() {
    try {
        console.log('🚀 Starting enhanced portfolio initialization...');
        
        // Инициализируем компоненты последовательно
        await initializeCoreComponents();
        
        // Инициализируем интерактивные компоненты
        await initializeInteractiveComponents();
        
        // Загружаем данные
        await loadApplicationData();
        
        // Запускаем анимации
        initializeAnimations();
        
        // Показываем интерфейс
        showUserInterface();
        
        APP_STATE.isInitialized = true;
        console.log('✅ Portfolio initialized successfully');
        
    } catch (error) {
        console.error('❌ Error during initialization:', error);
        handleInitializationError(error);
    }
}

// Инициализация основных компонентов
async function initializeCoreComponents() {
    return new Promise((resolve) => {
        console.log('🔄 Initializing core components...');
        
        // Динамический фон (самый первый)
        initDynamicBackground();
        APP_STATE.components.background = true;
        
        // Загрузка проектов
        loadEnhancedProjects();
        
        // Инициализация темы
        initTheme();
        
        setTimeout(resolve, 100);
    });
}

// Инициализация интерактивных компонентов
async function initializeInteractiveComponents() {
    return new Promise((resolve) => {
        console.log('🔄 Initializing interactive components...');
        
        // Инициализация в правильном порядке
        initInteractiveElements();
        init3DPortfolio();
        initEnhancedChatAssistant();
        initEnhancedMusicPlayer();
        initEventListeners();
        initProjectModal();
        initClickParticles();
        initAchievements();
        
        setTimeout(resolve, 200);
    });
}

// Загрузка данных приложения
async function loadApplicationData() {
    return new Promise((resolve) => {
        console.log('📦 Loading application data...');
        
        renderEnhancedProjects();
        initPortfolioFilters();
        initEnhancedFadeAnimations();
        
        setTimeout(resolve, 150);
    });
}

// Инициализация анимаций
function initializeAnimations() {
    console.log('🎬 Initializing animations...');
    
    // Запускаем анимацию счетчиков
    initCounters();
    
    // Запускаем параллакс эффект
    initParallax();
    
    // Запускаем печатающий текст
    initTypewriter();
}

// Показ пользовательского интерфейса
function showUserInterface() {
    console.log('👤 Showing user interface...');
    
    // Скрываем прелоадер
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
                showButtonsAfterPreloader();
                showWelcomeNotification();
            }, 500);
        }
    }, 1000);
}

// Обработка ошибок инициализации
function handleInitializationError(error) {
    console.error('Initialization error:', error);
    
    // Показываем сообщение об ошибке
    showNotification('Произошла ошибка при загрузке портфолио. Пожалуйста, обновите страницу.', 'error');
    
    // Все равно пытаемся показать интерфейс
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    showButtonsAfterPreloader();
}

// Приветственное уведомление
function showWelcomeNotification() {
    setTimeout(() => {
        showNotification('Добро пожаловать в мое портфолио! 🚀', 'success');
        
        // Показываем подсказку про AI помощника
        setTimeout(() => {
            const chatToggle = document.getElementById('chatToggle');
            if (chatToggle) {
                showNotification('Нажмите на робота в правом нижнем углу для помощи!', 'info');
            }
        }, 2000);
    }, 500);
}

// =============================================
// ФУНКЦИИ ДЛЯ УПРАВЛЕНИЯ ВИДИМОСТЬЮ КНОПОК
// =============================================
function hideButtonsBeforeLoad() {
    const chatToggle = document.getElementById('chatToggle');
    const adminLinkBtn = document.getElementById('adminLinkBtn');
    
    if (chatToggle) {
        chatToggle.style.opacity = '0';
        chatToggle.style.visibility = 'hidden';
        chatToggle.classList.remove('visible', 'pulse');
    }
    
    if (adminLinkBtn) {
        adminLinkBtn.style.opacity = '0';
        adminLinkBtn.style.visibility = 'hidden';
        adminLinkBtn.classList.remove('visible');
    }
    
    console.log('Buttons hidden before preloader');
}

function showButtonsAfterPreloader() {
    const chatToggle = document.getElementById('chatToggle');
    const adminLinkBtn = document.getElementById('adminLinkBtn');
    
    // Показываем AI кнопку
    if (chatToggle) {
        chatToggle.style.display = 'flex';
        setTimeout(() => {
            chatToggle.classList.add('visible');
            // Добавляем пульсацию через секунду
            setTimeout(() => {
                chatToggle.classList.add('pulse');
            }, 1000);
        }, 100);
    }
    
    // Показываем админ кнопку
    if (adminLinkBtn) {
        adminLinkBtn.style.display = 'flex';
        setTimeout(() => {
            adminLinkBtn.classList.add('visible');
        }, 300);
    }
    
    console.log('All buttons shown after preloader');
}

// =============================================
// УЛУЧШЕННЫЙ МУЗЫКАЛЬНЫЙ ПЛЕЙЕР В HEADER
// =============================================
function initEnhancedMusicPlayer() {
    const musicToggleHeader = document.getElementById('musicToggleHeader');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (!musicToggleHeader || !backgroundMusic) {
        console.warn('Music player elements not found');
        return;
    }
    
    // Загружаем настройки музыки из localStorage
    loadMusicSettings();
    
    // Устанавливаем начальную громкость
    backgroundMusic.volume = CONFIG.music.volume;
    
    // Автоматически запускаем музыку при загрузке
    setTimeout(() => {
        if (CONFIG.music.enabled) {
            backgroundMusic.play().catch(e => {
                console.log('Auto-play failed, waiting for user interaction:', e);
                // Показываем подсказку для пользователя
                showNotification('Нажмите на кнопку музыки в шапке для включения звука', 'info');
            });
            updateMusicIcon(true);
        }
    }, 1000);
    
    // Переключение музыки
    musicToggleHeader.addEventListener('click', function() {
        CONFIG.music.enabled = !CONFIG.music.enabled;
        
        if (CONFIG.music.enabled) {
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                CONFIG.music.enabled = false;
                showNotification('Для воспроизведения музыки требуется взаимодействие с сайтом', 'error');
            });
            updateMusicIcon(true);
            showNotification('Фоновая музыка включена 🎵', 'success');
            showAchievement('musicEnabled');
        } else {
            backgroundMusic.pause();
            updateMusicIcon(false);
            showNotification('Фоновая музыка выключена 🔇', 'info');
        }
        
        saveMusicSettings();
    });
    
    // Автоповтор при окончании трека
    backgroundMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        if (CONFIG.music.enabled) {
            this.play().catch(e => {
                console.log('Auto-play after ended failed:', e);
            });
        }
    });
    
    // Улучшенная обработка ошибок
    backgroundMusic.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        handleMusicError();
    });
    
    APP_STATE.components.music = true;
    console.log('🎵 Enhanced music player initialized in header');
}

// Обновление иконки музыки
function updateMusicIcon(isPlaying) {
    const musicToggleHeader = document.getElementById('musicToggleHeader');
    if (!musicToggleHeader) return;
    
    const icon = musicToggleHeader.querySelector('i');
    if (isPlaying) {
        icon.className = 'fas fa-volume-up';
        musicToggleHeader.classList.remove('muted');
    } else {
        icon.className = 'fas fa-volume-mute';
        musicToggleHeader.classList.add('muted');
    }
}

// Обработка ошибок музыки
function handleMusicError() {
    CONFIG.music.enabled = false;
    updateMusicIcon(false);
    showNotification('Не удалось загрузить музыку', 'error');
}

function loadMusicSettings() {
    const savedSettings = localStorage.getItem('portfolioMusicSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        CONFIG.music.enabled = settings.enabled !== undefined ? settings.enabled : true;
        CONFIG.music.volume = settings.volume || 0.3;
    }
}

function saveMusicSettings() {
    localStorage.setItem('portfolioMusicSettings', JSON.stringify({
        enabled: CONFIG.music.enabled,
        volume: CONFIG.music.volume
    }));
}

function toggleMusic() {
    const musicToggleHeader = document.getElementById('musicToggleHeader');
    if (musicToggleHeader) {
        musicToggleHeader.click();
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
        // Проверяем наличие Three.js
        if (typeof THREE === 'undefined') {
            console.error('Three.js library not loaded');
            return;
        }
        
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
        
        APP_STATE.components.threejs = true;
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
// УЛУЧШЕННЫЙ AI CHAT ASSISTANT
// =============================================
function initEnhancedChatAssistant() {
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatAssistant = document.getElementById('chat-assistant');
    
    if (!chatToggle) {
        console.log('Chat assistant elements not found');
        return;
    }
    
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
                showAchievement('chatOpened');
            }, 10);
        }
    });
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            closeChatAssistant();
        });
    }
    
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
    
    // Добавляем обработчик для Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatAssistant.classList.contains('active')) {
            closeChatAssistant();
        }
    });
    
    // Быстрые ответы
    addEnhancedQuickReplies();
    
    APP_STATE.components.chat = true;
    console.log('🤖 Enhanced chat assistant initialized');
}

// Закрытие чата
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

// Улучшенные быстрые ответы
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
    
    // Добавляем только если нет других быстрых ответов
    const existingReplies = chatMessages.querySelector('.quick-replies.enhanced');
    if (!existingReplies) {
        chatMessages.appendChild(quickRepliesDiv);
    }
}

// Обработка быстрых ответов
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

// Улучшенный AI ответ
function generateEnhancedAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Расширенная база знаний
    const responses = {
        skills: `Мои ключевые навыки включают:
• HTML/CSS (95%) - Семантическая верстка, адаптивный дизайн
• JavaScript (90%) - ES6+, асинхронное программирование
• React (85%) - Хуки, Context API, React Router
• Svelte (70%) - Современный компилируемый фреймворк
• UI/UX Design (75%) - Прототипирование, дизайн-системы

Также имею опыт работы с Three.js, WebGL и различными API.`,

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

        contact: `📧 **Email**: ert34vh@gmail.com
📞 **Телефон**: +7 (926) 718-55-52
✈️ **Telegram**: @districk
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

        technology: `🛠 **Мой технический стек**:

• **Frontend**: HTML5, CSS3, JavaScript (ES6+), React, Svelte
• **Styling**: CSS Modules, Styled Components, SASS
• **Tools**: Git, Webpack, Vite, Figma
• **Libraries**: Three.js, Chart.js, различные API
• **Methodologies**: БЭМ, Mobile First, Responsive Design`,

        music: `🎵 **Управление музыкой**:

Вы можете управлять фоновой музыкой с помощью кнопки в шапке сайта:

🔊 **Включение/выключение** - кнопка с иконкой динамика в правом верхнем углу

Музыка автоматически запускается при загрузке сайта и создает приятную атмосферу!`
    };
    
    // Улучшенное определение интента
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
    } else if (message.includes('технолог') || message.includes('stack') || message.includes('инструмент') || message.includes('используешь') || message.includes('библиотек')) {
        return responses.technology;
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
Буду рад помочь в будущем. Удачи!

P.S. Не забудьте посмотреть 3D режим - это довольно круто! 🎮`;
    } else if (message.includes('помощь') || message.includes('help') || message.includes('что ты умеешь') || message.includes('команды')) {
        return `🆘 **Что я умею**:

• Рассказать о **навыках** и технологиях 🛠
• Показать **проекты** из портфолио 💼
• Рассказать об **опыте** работы 📈
• Показать **контакты** для связи 📞
• Рассказать об **услугах** 🎯
• Помочь с **управлением музыкой** 🎵
• Объяснить про **3D режим** 🎮

Просто спросите о чем-нибудь из этого списка!`;
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
// УЛУЧШЕННОЕ УПРАВЛЕНИЕ ПРОЕКТАМИ
// =============================================
function loadEnhancedProjects() {
    const saved = localStorage.getItem('portfolioProjects');
    projects = saved ? JSON.parse(saved) : getEnhancedDefaultProjects();
    
    // Добавляем проверку на валидность данных
    projects = projects.filter(project => 
        project && 
        project.id && 
        project.title && 
        project.category
    );
    
    console.log(`📁 Loaded ${projects.length} projects`);
}

function saveProjects() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

function getEnhancedDefaultProjects() {
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

function renderEnhancedProjects() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    if (projects.length === 0) {
        grid.innerHTML = createEnhancedEmptyState();
        return;
    }

    grid.innerHTML = projects.map(project => createEnhancedProjectCard(project)).join('');
    initEnhancedFadeAnimations();
}

function createEnhancedEmptyState() {
    return `
        <div class="empty-state">
            <i class="fas fa-folder-open"></i>
            <h3>Пока нет проектов</h3>
            <p>Свяжитесь с администратором для добавления проектов</p>
        </div>
    `;
}

function createEnhancedProjectCard(project) {
    const icon = getCategoryIcon(project.category);
    const technologies = project.technologies ? project.technologies.slice(0, 3).join(', ') : '';
    
    return `
        <div class="portfolio-item fade-in-enhanced" data-category="${project.category}">
            <div class="portfolio-image ${project.image ? 'has-image' : ''}">
                ${project.image ? 
                    `<img src="images/${project.image}" alt="${project.title}" loading="lazy" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDQwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjMmEyYTJhIi8+CjxwYXRoIGQ9Ik0yMDAgMTQwTDE2MCAxMDBIMTIwTDIwMCAxODBMMjgwIDEwMEgyNDBMMjAwIDE0MFoiIGZpbGw9IiM3Y2ZjMDAiLz4KPC9zdmc+'; this.alt='Изображение не загружено'">` : 
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
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${technologies ? `
                    <div class="project-technologies">
                        <small>Технологии: ${technologies}${project.technologies.length > 3 ? '...' : ''}</small>
                    </div>
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

// Улучшенная анимация появления
function initEnhancedFadeAnimations() {
    const elements = document.querySelectorAll('.fade-in-enhanced');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
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
    notification.className = `notification ${type} slide-in`;
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
    initContactForm();
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
        
        // Не открываем модалку при клике на ссылки
        if (e.target.closest('a')) return;
        
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
            ${project.technologies && project.technologies.length > 0 ? `
                <div style="margin: 20px 0;">
                    <h4 style="color: var(--light); margin-bottom: 10px;">Технологии:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${project.technologies.map(tech => `<span style="background: var(--primary); color: var(--dark); padding: 5px 10px; border-radius: 15px; font-size: 0.8rem;">${tech}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
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
        '3dMode': '3D Исследователь',
        musicEnabled: 'Меломания'
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

function initClickOutside() {
    document.addEventListener('click', function(e) {
        // Закрытие чата при клике вне его
        const chatAssistant = document.getElementById('chat-assistant');
        if (chatAssistant && chatAssistant.classList.contains('active') && 
            !chatAssistant.contains(e.target) && 
            !e.target.closest('#chatToggle')) {
            closeChatAssistant();
        }
    });
}

// =============================================
// ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ОБРАТНОЙ СОВМЕСТИМОСТИ
// =============================================
window.toggle3DMode = toggle3DMode;
window.toggleMusic = toggleMusic;

// Для обратной совместимости
window.initializeApp = initializeEnhancedApp;
window.initChatAssistant = initEnhancedChatAssistant;
window.initMusicPlayer = initEnhancedMusicPlayer;
window.loadProjects = loadEnhancedProjects;
window.renderProjects = renderEnhancedProjects;

console.log('🚀 Portfolio JavaScript loaded successfully!');
