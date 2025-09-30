// =============================================
// КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
// =============================================
const CONFIG = {
    enable3D: false,
    musicEnabled: true,
    particlesEnabled: true
};

let projects = [];
let threeScene = null;

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
}

// =============================================
// ЗАГРУЗКА ПРОЕКТОВ - ИСПРАВЛЕННАЯ
// =============================================
function loadProjects() {
    console.log('🔄 Loading projects...');
    
    const savedProjects = localStorage.getItem('portfolioProjects');
    
    if (savedProjects && savedProjects !== 'null' && savedProjects !== 'undefined') {
        try {
            projects = JSON.parse(savedProjects);
            console.log(`📁 Loaded ${projects.length} projects from localStorage`, projects);
            
            // Проверяем, что проекты загружены корректно
            if (!Array.isArray(projects) || projects.length === 0) {
                throw new Error('Invalid projects data');
            }
        } catch (error) {
            console.error('❌ Error loading projects from localStorage:', error);
            console.log('🔄 Loading default projects...');
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

// =============================================
// ОТОБРАЖЕНИЕ ПРОЕКТОВ - ИСПРАВЛЕННОЕ
// =============================================
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
// ОТЛАДКА
// =============================================
function debugProjects() {
    console.log('=== PROJECTS DEBUG INFO ===');
    console.log('Projects array:', projects);
    console.log('LocalStorage data:', localStorage.getItem('portfolioProjects'));
    console.log('Portfolio grid element:', document.getElementById('portfolioGrid'));
    console.log('==========================');
}

// Добавим глобальные функции для тестирования
window.restoreProjects = restoreDefaultProjects;
window.debugProjects = debugProjects;

// =============================================
// ОСТАЛЬНЫЕ ФУНКЦИИ (без изменений)
// =============================================
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
}

// =============================================
// УЛУЧШЕННЫЙ ДИНАМИЧЕСКИЙ ФОН
// =============================================
function initEnhancedDynamicBackground() {
    const bgContainer = document.getElementById('dynamic-bg');
    if (!bgContainer) return;

    // Очищаем контейнер
    bgContainer.innerHTML = '';
    
    // Создаем градиентный фон
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 30% 30%, rgba(124, 252, 0, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 70% 70%, rgba(124, 252, 0, 0.05) 0%, transparent 50%);
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
// УЛУЧШЕННЫЙ AI CHAT ASSISTANT
// =============================================
function initEnhancedChatAssistant() {
    // Создаем элементы чата если их нет
    createChatAssistantElements();
    
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
    
    console.log('🤖 Enhanced chat assistant initialized');
}

function createChatAssistantElements() {
    // Проверяем, есть ли уже чат
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
    
    // Добавляем стили для чата
    addChatStyles();
}

function addChatStyles() {
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
        
        @keyframes enhancedFloat {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
                transform: translateY(-30px) translateX(15px) rotate(90deg);
            }
            50% {
                transform: translateY(-15px) translateX(30px) rotate(180deg);
            }
            75% {
                transform: translateY(-25px) translateX(-15px) rotate(270deg);
            }
        }
        
        @keyframes pulseCircle {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            50% {
                opacity: 0.3;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .chat-assistant {
                width: 350px;
                height: 450px;
                right: 20px;
                bottom: 150px;
            }
            
            .chat-toggle {
                right: 20px;
                bottom: 90px;
            }
            
            .quick-replies.enhanced {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 480px) {
            .chat-assistant {
                width: 300px;
                height: 400px;
                right: 10px;
                left: 10px;
                bottom: 140px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = chatStyles;
    document.head.appendChild(styleSheet);
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

        technology: `🛠 **Мой технический стек**:

• **Frontend**: HTML5, CSS3, JavaScript (ES6+), React, Svelte
• **Styling**: CSS Modules, Styled Components, SASS
• **Tools**: Git, Webpack, Vite, Figma
• **Libraries**: Chart.js, различные API
• **Methodologies**: БЭМ, Mobile First, Responsive Design`,

        music: `🎵 **Управление музыкой**:

Вы можете управлять фоновой музыкой с помощью кнопки в правом нижнем углу:

🔊 **Включение/выключение** - кнопка с иконкой динамика
🎵 **Функционал**: Автоповтор, регулировка громкости

Музыка создает приятную атмосферу при просмотре портфолио!`
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
Буду рад помочь в будущем. Удачи!`;
    } else if (message.includes('помощь') || message.includes('help') || message.includes('что ты умеешь') || message.includes('команды')) {
        return `🆘 **Что я умею**:

• Рассказать о **навыках** и технологиях 🛠
• Показать **проекты** из портфолио 💼
• Рассказать об **опыте** работы 📈
• Показать **контакты** для связи 📞
• Рассказать об **услугах** 🎯
• Помочь с **управлением музыкой** 🎵

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
// МУЗЫКА И ОСНОВНЫЕ ФУНКЦИИ
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

function initEventListeners() {
    initNavigation();
    initContactForm();
    
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

function initNavigation() {
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

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
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
                
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
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

function showNotification(message, type = 'info') {
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
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
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

// Добавляем CSS анимации для нового фона
const additionalStyles = `
    @keyframes enhancedFloat {
        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
        25% { transform: translateY(-30px) translateX(15px) rotate(90deg); }
        50% { transform: translateY(-15px) translateX(30px) rotate(180deg); }
        75% { transform: translateY(-25px) translateX(-15px) rotate(270deg); }
    }
    
    @keyframes pulseCircle {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .slide-in {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--dark-light);
        border: 1px solid var(--primary);
        border-radius: var(--border-radius);
        padding: 15px 20px;
        min-width: 300px;
        max-width: 500px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .notification.success {
        border-color: #00ff00;
    }
    
    .notification.error {
        border-color: #ff4444;
    }
    
    .notification.info {
        border-color: #4444ff;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }
    
    .notification-message {
        color: var(--light);
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray);
        cursor: pointer;
        padding: 5px;
        border-radius: 3px;
        transition: var(--transition);
    }
    
    .notification-close:hover {
        color: var(--light);
        background: rgba(255,255,255,0.1);
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 20px;
    }
    
    .modal-content {
        background: var(--dark-light);
        border-radius: var(--border-radius);
        padding: 30px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        border: 1px solid var(--primary);
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 24px;
        color: var(--gray);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        color: var(--light);
    }
    
    .modal-header {
        margin-bottom: 20px;
        padding-right: 30px;
    }
    
    .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }
    
    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
        }
    }
    
    .project-image img {
        width: 100%;
        border-radius: var(--border-radius);
        border: 1px solid rgba(124, 252, 0, 0.2);
    }
    
    .project-info h3 {
        color: var(--primary);
        margin-bottom: 10px;
    }
    
    .project-description,
    .project-technologies,
    .project-features {
        margin-bottom: 20px;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .tech-tag {
        background: rgba(124, 252, 0, 0.1);
        color: var(--primary);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        border: 1px solid rgba(124, 252, 0, 0.2);
    }
    
    .project-features ul {
        list-style: none;
        padding: 0;
    }
    
    .project-features li {
        padding: 5px 0;
        color: var(--gray);
        position: relative;
        padding-left: 15px;
    }
    
    .project-features li:before {
        content: '▸';
        color: var(--primary);
        position: absolute;
        left: 0;
    }
    
    .project-links {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .music-toggle-bottom {
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
    }
    
    .music-toggle-bottom:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(124, 252, 0, 0.5);
    }
    
    .empty-portfolio {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: var(--gray);
    }
    
    .empty-portfolio i {
        font-size: 4rem;
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    .empty-portfolio h3 {
        color: var(--gray);
        margin-bottom: 15px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('🎨 Enhanced features loaded successfully!');