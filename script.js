// =============================================
// КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
// =============================================
const CONFIG = {
    enable3D: false,
    musicEnabled: true,
    particlesEnabled: true,
    autoOpenChat: true
};

let projects = [];
let threeScene = null;
let currentAudio = null;

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
    
    // Автоматическое открытие чата через 20 секунд
    if (CONFIG.autoOpenChat) {
        setTimeout(() => {
            const chatToggle = document.getElementById('chatToggle');
            if (chatToggle && !document.getElementById('chat-assistant').classList.contains('active')) {
                chatToggle.click();
                showNotification('🤖 AI помощник готов помочь! Задайте любой вопрос о моих навыках и проектах.', 'info');
            }
        }, 20000);
    }
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
        background: 
            radial-gradient(circle at 20% 20%, rgba(124, 252, 0, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(124, 252, 0, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(124, 252, 0, 0.08) 0%, transparent 30%);
        z-index: 1;
    `;
    bgContainer.appendChild(gradientOverlay);

    // Создаем сетку из линий
    createGridLines(bgContainer);
    
    // Создаем улучшенные частицы
    createEnhancedParticles(bgContainer);
    
    // Создаем пульсирующие круги
    createPulsingCircles(bgContainer);
    
    // Создаем соединительные линии
    createConnectionLines(bgContainer);
    
    console.log('🎨 Enhanced dynamic background initialized');
}

function createGridLines(container) {
    const gridSize = 60;
    const gridLines = document.createElement('div');
    gridLines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(124, 252, 0, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 252, 0, 0.04) 1px, transparent 1px);
        background-size: ${gridSize}px ${gridSize}px;
        z-index: 0;
        animation: gridMove 20s linear infinite;
    `;
    container.appendChild(gridLines);
}

function createEnhancedParticles(container) {
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 1;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        const colorVariation = Math.random() * 40 - 20;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: hsl(${120 + colorVariation}, 100%, 65%);
            border-radius: ${Math.random() > 0.5 ? '50%' : '30%'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: enhancedFloat ${duration}s linear infinite ${delay}s;
            filter: blur(${Math.random() * 3}px);
            box-shadow: 0 0 ${size * 2}px currentColor;
        `;
        
        container.appendChild(particle);
    }
}

function createPulsingCircles(container) {
    const circleCount = 5;
    
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        const size = Math.random() * 300 + 150;
        const duration = Math.random() * 10 + 6;
        const delay = Math.random() * 5;
        
        circle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border: 2px solid rgba(124, 252, 0, 0.15);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: pulseCircle ${duration}s ease-in-out infinite ${delay}s;
            z-index: 0;
            box-shadow: 0 0 50px rgba(124, 252, 0, 0.1);
        `;
        
        container.appendChild(circle);
    }
}

function createConnectionLines(container) {
    const lineCount = 8;
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        const length = Math.random() * 200 + 100;
        const angle = Math.random() * 360;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        line.style.cssText = `
            position: absolute;
            width: ${length}px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(124, 252, 0, 0.3), transparent);
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transform: rotate(${angle}deg);
            opacity: ${Math.random() * 0.4 + 0.1};
            animation: linePulse ${duration}s ease-in-out infinite ${delay}s;
            z-index: 0;
        `;
        
        container.appendChild(line);
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
                // Добавляем быстрые ответы при открытии
                addEnhancedQuickReplies();
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
            
            // Добавляем новые быстрые ответы после ответа бота
            setTimeout(() => {
                addEnhancedQuickReplies();
            }, 500);
        }, 1000 + Math.random() * 1500);
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Авто-рост текстового поля
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Добавляем обработчик для Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatAssistant.classList.contains('active')) {
            closeChatAssistant();
        }
    });
    
    console.log('🤖 Enhanced chat assistant initialized');
}

function createChatAssistantElements() {
    // Проверяем, есть ли уже чат
    if (document.getElementById('chat-assistant')) return;
    
    const chatHTML = `
        <div class="chat-toggle" id="chatToggle">
            <i class="fas fa-robot"></i>
            <div class="chat-pulse"></div>
        </div>
        
        <div class="chat-assistant" id="chat-assistant">
            <div class="chat-header">
                <div class="chat-title">
                    <i class="fas fa-robot"></i>
                    <span>AI Помощник Districk</span>
                    <div class="chat-status">
                        <div class="status-dot"></div>
                        <span>Online</span>
                    </div>
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
                        <div class="message-time">${getCurrentTime()}</div>
                    </div>
                </div>
            </div>
            
            <div class="chat-input-container">
                <div class="chat-input-wrapper">
                    <input type="text" id="chatInput" placeholder="Задайте вопрос..." maxlength="500">
                    <div class="char-counter">0/500</div>
                </div>
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
    
    // Инициализируем счетчик символов
    initCharCounter();
}

function initCharCounter() {
    const chatInput = document.getElementById('chatInput');
    const charCounter = document.querySelector('.char-counter');
    
    if (chatInput && charCounter) {
        chatInput.addEventListener('input', function() {
            charCounter.textContent = `${this.value.length}/500`;
            
            if (this.value.length > 450) {
                charCounter.style.color = '#ff4757';
            } else if (this.value.length > 400) {
                charCounter.style.color = '#ffa502';
            } else {
                charCounter.style.color = 'var(--gray)';
            }
        });
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
}

function addChatStyles() {
    const chatStyles = `
        .chat-toggle {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, var(--primary), #6be000);
            color: var(--dark);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            box-shadow: 0 8px 25px rgba(124, 252, 0, 0.4);
            animation: chatBounce 3s ease-in-out infinite;
        }
        
        .chat-toggle:hover {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 12px 35px rgba(124, 252, 0, 0.6);
        }
        
        .chat-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: var(--primary);
            animation: chatPulse 2s ease-out infinite;
            z-index: -1;
        }
        
        .chat-assistant {
            position: fixed;
            bottom: 180px;
            right: 30px;
            width: 420px;
            height: 550px;
            background: var(--dark-light);
            border: 2px solid rgba(124, 252, 0, 0.3);
            border-radius: 20px;
            display: none;
            flex-direction: column;
            z-index: 101;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            backdrop-filter: blur(10px);
        }
        
        .chat-assistant.active {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        
        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid rgba(124, 252, 0, 0.2);
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.9), rgba(26, 26, 26, 0.9));
            border-radius: 20px 20px 0 0;
        }
        
        .chat-title {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 600;
            color: var(--light);
        }
        
        .chat-title i {
            color: var(--primary);
            font-size: 1.2rem;
        }
        
        .chat-status {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            color: var(--gray);
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: #00d26a;
            border-radius: 50%;
            animation: statusPulse 2s infinite;
        }
        
        .chat-close {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: var(--gray);
            cursor: pointer;
            padding: 8px;
            border-radius: 10px;
            transition: var(--transition);
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chat-close:hover {
            color: var(--light);
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
        
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: rgba(10, 10, 10, 0.5);
        }
        
        .message {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            animation: messageSlide 0.3s ease-out;
        }
        
        .user-message {
            flex-direction: row-reverse;
        }
        
        .message-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), #6be000);
            color: var(--dark);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(124, 252, 0, 0.3);
        }
        
        .user-message .message-avatar {
            background: linear-gradient(135deg, #667eea, #764ba2);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .message-content {
            max-width: 75%;
            background: rgba(124, 252, 0, 0.1);
            padding: 15px 18px;
            border-radius: 18px;
            border: 1px solid rgba(124, 252, 0, 0.2);
            position: relative;
            backdrop-filter: blur(5px);
        }
        
        .user-message .message-content {
            background: rgba(102, 126, 234, 0.15);
            border-color: rgba(102, 126, 234, 0.3);
        }
        
        .message-content p {
            margin: 0;
            color: var(--light);
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        .message-time {
            font-size: 0.75rem;
            color: var(--gray);
            margin-top: 8px;
            text-align: right;
        }
        
        .typing-indicator {
            display: flex;
            gap: 5px;
            align-items: center;
            padding: 5px 0;
        }
        
        .typing-dot {
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        .quick-replies.enhanced {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 15px;
            animation: quickRepliesSlide 0.4s ease-out;
        }
        
        .quick-reply.enhanced {
            background: rgba(124, 252, 0, 0.1);
            border: 1px solid rgba(124, 252, 0, 0.4);
            color: var(--primary);
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
            text-align: center;
            backdrop-filter: blur(5px);
        }
        
        .quick-reply.enhanced:hover {
            background: rgba(124, 252, 0, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(124, 252, 0, 0.3);
        }
        
        .quick-reply.enhanced:active {
            transform: translateY(0);
        }
        
        .chat-input-container {
            display: flex;
            padding: 20px;
            border-top: 1px solid rgba(124, 252, 0, 0.1);
            gap: 12px;
            align-items: flex-end;
            background: rgba(10, 10, 10, 0.8);
            border-radius: 0 0 20px 20px;
        }
        
        .chat-input-wrapper {
            flex: 1;
            position: relative;
        }
        
        #chatInput {
            width: 100%;
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(124, 252, 0, 0.2);
            border-radius: 25px;
            color: var(--light);
            font-size: 0.95rem;
            resize: none;
            transition: var(--transition);
            min-height: 50px;
            max-height: 120px;
        }
        
        #chatInput:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(124, 252, 0, 0.1);
        }
        
        .char-counter {
            position: absolute;
            bottom: 8px;
            right: 15px;
            font-size: 0.75rem;
            color: var(--gray);
            background: rgba(10, 10, 10, 0.8);
            padding: 2px 6px;
            border-radius: 10px;
        }
        
        .chat-send {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary), #6be000);
            color: var(--dark);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            box-shadow: 0 4px 15px rgba(124, 252, 0, 0.4);
        }
        
        .chat-send:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 6px 20px rgba(124, 252, 0, 0.6);
        }
        
        .chat-send:active {
            transform: scale(0.95);
        }
        
        @keyframes chatBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes chatPulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
        
        @keyframes statusPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
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
        
        @keyframes messageSlide {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes quickRepliesSlide {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes enhancedFloat {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
                transform: translateY(-40px) translateX(20px) rotate(90deg);
            }
            50% {
                transform: translateY(-20px) translateX(40px) rotate(180deg);
            }
            75% {
                transform: translateY(-30px) translateX(-20px) rotate(270deg);
            }
        }
        
        @keyframes pulseCircle {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            50% {
                opacity: 0.4;
            }
            100% {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        
        @keyframes gridMove {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 60px 60px;
            }
        }
        
        @keyframes linePulse {
            0%, 100% {
                opacity: 0.1;
            }
            50% {
                opacity: 0.4;
            }
        }
        
        @media (max-width: 768px) {
            .chat-assistant {
                width: 90vw;
                height: 70vh;
                right: 5vw;
                left: 5vw;
                bottom: 100px;
            }
            
            .chat-toggle {
                right: 20px;
                bottom: 80px;
                width: 60px;
                height: 60px;
                font-size: 1.5rem;
            }
            
            .quick-replies.enhanced {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 480px) {
            .chat-assistant {
                width: 95vw;
                height: 75vh;
                right: 2.5vw;
                left: 2.5vw;
                bottom: 90px;
            }
            
            .message-content {
                max-width: 85%;
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
    
    const avatar = sender === 'user' ? 
        '<i class="fas fa-user"></i>' : 
        '<i class="fas fa-robot"></i>';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${avatar}
        </div>
        <div class="message-content">
            <p>${text}</p>
            <div class="message-time">${getCurrentTime()}</div>
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
    
    // Удаляем старые быстрые ответы
    const existingReplies = chatMessages.querySelector('.quick-replies.enhanced');
    if (existingReplies) {
        existingReplies.remove();
    }
    
    const quickReplies = [
        { text: "💻 О навыках", icon: "fas fa-code" },
        { text: "🚀 Мои проекты", icon: "fas fa-briefcase" },
        { text: "📈 Опыт работы", icon: "fas fa-history" },
        { text: "📞 Контакты", icon: "fas fa-phone" },
        { text: "🎯 Услуги", icon: "fas fa-cogs" },
        { text: "🛠 Технологии", icon: "fas fa-tools" },
        { text: "🎵 Музыка", icon: "fas fa-music" },
        { text: "❓ Помощь", icon: "fas fa-question" }
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
    
    chatMessages.appendChild(quickRepliesDiv);
    scrollChatToBottom();
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
        skills: `💻 **Мои ключевые навыки**:

🎨 **Frontend Development:**
• HTML5/CSS3 (95%) - Семантическая верстка, адаптивный дизайн
• JavaScript (90%) - ES6+, асинхронное программирование, модули
• React (85%) - Хуки, Context API, React Router, Redux
• Svelte (70%) - Современный компилируемый фреймворк

🛠 **Технологии и инструменты:**
• TypeScript (75%) - Статическая типизация
• SASS/SCSS (80%) - Препроцессоры CSS
• Webpack/Vite (70%) - Сборка проектов
• Git (85%) - Контроль версий
• Figma (75%) - UI/UX дизайн и прототипирование

🚀 **Дополнительные навыки:**
• PWA (65%) - Прогрессивные веб-приложения
• SEO (70%) - Оптимизация для поисковых систем
• Performance (75%) - Оптимизация производительности`,

        projects: `🚀 **Мои проекты**:

🏪 **Moscow RP** - Интернет-магазин для GTA 5 RP
• **Технологии**: HTML5, CSS3, JavaScript, Responsive Design
• **Особенности**: Корзина покупок, фильтрация товаров, адаптивный дизайн
• **Ссылка**: [Посмотреть проект](${getDefaultProjects()[0].demoLink})

📱 **Pyrometer** - Веб-приложение для управления задачами
• **Технологии**: React, Node.js, WebSocket, REST API
• **Особенности**: Совместная работа, уведомления, аналитика
• **Ссылка**: [Посмотреть проект](${getDefaultProjects()[1].demoLink})

🎨 **Astra GTA 5 RP** - UI/UX дизайн
• **Инструменты**: Figma, Adobe XD, Prototyping
• **Особенности**: Современный интерфейс, пользовательские flow, дизайн-система
• **Ссылка**: [Посмотреть проект](${getDefaultProjects()[2].demoLink})`,

        experience: `📈 **Мой опыт**:

⏳ **2+ года** коммерческого опыта во фронтенд разработке
✅ **15+ завершенных проектов** различной сложности
👥 **8+ довольных клиентов** и долгосрочных партнеров
🎯 **Специализация**: Современные веб-приложения и интерфейсы

💼 **Основные направления:**
• Разработка SPA и PWA приложений
• Создание адаптивных интерфейсов
• UI/UX дизайн и прототипирование
• Оптимизация производительности
• Интеграция с REST API`,

        contact: `📞 **Контакты для связи**:

📧 **Email**: districkov@yandex.ru
✈️ **Telegram**: @districkov
💻 **GitHub**: github.com/Districkov

📍 **Локация**: Москва, Россия
🕒 **Доступность**: В течение 1-2 часов в рабочее время
💬 **Предпочтительный способ связи**: Telegram или Email

📋 **Готов к обсуждению:**
• Новых проектов и сотрудничества
• Технических консультаций
• Удаленной работы
• Фриланс заказов`,

        services: `🎯 **Мои услуги**:

💻 **Веб-разработка под ключ**
Создание современных веб-сайтов и приложений любой сложности

📱 **Адаптивная верстка**
Идеальное отображение на всех устройствах и браузерах

🎨 **UI/UX Дизайн**
Проектирование интуитивных и привлекательных интерфейсов

⚡ **Оптимизация производительности**
Ускорение загрузки и улучшение пользовательского опыта

🔧 **Техническая поддержка**
Обслуживание и доработка существующих проектов

📊 **Консультации**
Помощь в выборе технологий и архитектурных решений`,

        technology: `🛠 **Мой технический стек**:

**Frontend:**
• HTML5, CSS3, JavaScript (ES6+)
• React, Svelte, TypeScript
• Redux, Context API, React Router

**Styling:**
• CSS Modules, Styled Components
• SASS/SCSS, Tailwind CSS
• Bootstrap, Material-UI

**Tools & Other:**
• Git, Webpack, Vite
• Figma, Adobe XD
• REST API, GraphQL
• Jest, Testing Library

**Methodologies:**
• БЭМ, Mobile First
• Responsive Design
• Component-Driven Development`,

        music: `🎵 **Управление музыкой**:

Вы можете управлять фоновой музыкой с помощью кнопки в правом нижнем углу экрана:

🔊 **Включение/выключение** - кнопка с иконкой динамика
🎵 **Функционал**: Автоповтор, плавное переключение
🎶 **Назначение**: Создание приятной атмосферы при просмотре портфолио

Музыка помогает создать правильное настроение и делает просмотр более комфортным!`,

        help: `❓ **Что я умею**:

• Рассказать о **навыках** и технологиях 💻
• Показать **проекты** из портфолио 🚀
• Рассказать об **опыте** работы 📈
• Показать **контакты** для связи 📞
• Рассказать об **услугах** 🎯
• Показать **технологический стек** 🛠
• Помочь с **управлением музыкой** 🎵

💡 **Совет**: Используйте кнопки быстрых ответов для быстрой навигации или просто задайте любой вопрос!`
    };
    
    // Улучшенное определение интента
    if (message.includes('навык') || message.includes('skill') || message.includes('умение') || message.match(/что.*умеешь/)) {
        return responses.skills;
    } else if (message.includes('проект') || message.includes('работ') || message.includes('portfolio') || message.includes('кейс') || message.includes('moscow') || message.includes('pyrometer') || message.includes('astra')) {
        return responses.projects;
    } else if (message.includes('опыт') || message.includes('experience') || message.includes('стаж') || message.includes('лет') || message.includes('год')) {
        return responses.experience;
    } else if (message.includes('контакт') || message.includes('связать') || message.includes('contact') || message.includes('телефон') || message.includes('email') || message.includes('telegram') || message.includes('github')) {
        return responses.contact;
    } else if (message.includes('услуг') || message.includes('service') || message.includes('предложен') || message.includes('делаешь') || message.includes('предлагаешь')) {
        return responses.services;
    } else if (message.includes('технолог') || message.includes('stack') || message.includes('инструмент') || message.includes('используешь') || message.includes('библиотек') || message.includes('стек')) {
        return responses.technology;
    } else if (message.includes('музык') || message.includes('sound') || message.includes('audio') || message.includes('звук') || message.includes('плеер')) {
        return responses.music;
    } else if (message.includes('помощь') || message.includes('help') || message.includes('что ты умеешь') || message.includes('команды') || message.includes('функции')) {
        return responses.help;
    } else if (message.includes('привет') || message.includes('hello') || message.includes('hi') || message.includes('здравств') || message.includes('начать') || message.includes('start')) {
        return `Привет! 👋 

Я ваш AI-помощник в портфолио **Districk**. Рад вас видеть! 

Я могу подробно рассказать о:
• 💻 **Навыках и технологиях** 
• 🚀 **Проектах из портфолио**
• 📈 **Опыте работы**
• 📞 **Контактах для связи**
• 🎯 **Предлагаемых услугах**
• 🛠 **Технологическом стеке**

Также могу помочь с управлением музыкой 🎵 и навигацией по сайту.

Что вас интересует в первую очередь?`;
    } else if (message.includes('спасибо') || message.includes('thanks') || message.includes('thank you') || message.includes('благодар')) {
        return `Пожалуйста! 😊 
Всегда рад помочь. Если возникнут еще вопросы - не стесняйтесь обращаться!

Не забудьте посмотреть мои проекты в разделе "Портфолио" 🚀

Хорошего дня! ✨`;
    } else if (message.includes('пока') || message.includes('bye') || message.includes('до свидан') || message.includes('выход') || message.includes('close')) {
        return `До свидания! 👋 
Буду рад помочь в будущем. Удачи в ваших проектах! 

Не забудьте сохранить контакты для связи 📞`;
    } else {
        return `🤔 Кажется, я не совсем понял ваш вопрос.

Я могу рассказать о:
• 💻 Моих навыках и технологиях
• 🚀 Проектах в портфолио  
• 📈 Опыте работы
• 📞 Контактных данных
• 🎯 Предлагаемых услугах
• 🛠 Технологическом стеке
• 🎵 Управлении музыкой на сайте

Попробуйте задать вопрос по-другому или используйте кнопки быстрых ответов ниже для удобной навигации!`;
    }
}

// =============================================
// ОСТАЛЬНЫЕ ФУНКЦИИ (ОБНОВЛЕННЫЕ)
// =============================================
function loadProjects() {
    const savedProjects = localStorage.getItem('portfolioProjects');
    
    if (savedProjects) {
        try {
            projects = JSON.parse(savedProjects);
            console.log(`📁 Loaded ${projects.length} projects from localStorage`);
        } catch (e) {
            console.error('Error loading projects from localStorage:', e);
            projects = getDefaultProjects();
        }
    } else {
        projects = getDefaultProjects();
    }
    
    console.log(`📁 Loaded ${projects.length} projects`);
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
            "features": ["Корзина покупок", "Фильтрация товаров", "Адаптивный дизайн", "Быстрый поиск", "Система оплаты"],
            "status": "Завершен"
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
            "features": ["Управление задачами", "Совместная работа", "Аналитика", "Уведомления", "Дашборд"],
            "status": "В разработке"
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
            "features": ["Дизайн-система", "Прототипы", "User Flow", "Адаптивный дизайн", "UI Kit"],
            "status": "Завершен"
        }
    ];
}

function renderProjects() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = projects.map(project => `
        <div class="portfolio-item ${project.category}" data-category="${project.category}">
            <div class="portfolio-card">
                <div class="portfolio-img">
                    <img src="images/${project.image}" alt="${project.title}" onerror="this.src='images/default-project.png'">
                    <div class="portfolio-overlay">
                        <div class="project-status ${project.status === 'Завершен' ? 'completed' : 'in-progress'}">
                            ${project.status}
                        </div>
                        <div class="portfolio-links">
                            ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="portfolio-link" title="Демо"><i class="fas fa-external-link-alt"></i></a>` : ''}
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="portfolio-link" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
                            <a href="#" class="portfolio-link view-details" data-project="${project.id}" title="Подробнее"><i class="fas fa-eye"></i></a>
                        </div>
                    </div>
                </div>
                <div class="portfolio-content">
                    <span class="portfolio-category">${getCategoryName(project.category)}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="portfolio-tech">
                        ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        ${project.technologies.length > 4 ? `<span class="tech-tag-more">+${project.technologies.length - 4}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    initProjectFilter();
    initProjectDetails();
}

function getCategoryName(category) {
    const names = {
        web: '🌐 Веб-сайт',
        app: '📱 Приложение', 
        design: '🎨 Дизайн'
    };
    return names[category] || category;
}

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Анимация кнопки
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
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
                <div class="project-meta">
                    <span class="project-category">${getCategoryName(project.category)}</span>
                    <span class="project-status-badge ${project.status === 'Завершен' ? 'completed' : 'in-progress'}">${project.status}</span>
                </div>
                <h2>${project.title}</h2>
            </div>
            <div class="modal-body">
                <div class="project-image">
                    <img src="images/${project.image}" alt="${project.title}" onerror="this.src='images/default-project.png'">
                </div>
                <div class="project-info">
                    <div class="project-description">
                        <h3>📋 Описание проекта</h3>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-technologies">
                        <h3>🛠 Технологии</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-features">
                        <h3>⭐ Основные возможности</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-links">
                        ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Посмотреть демо</a>` : ''}
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-outline"><i class="fab fa-github"></i> Исходный код</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Анимация появления
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);

    modal.querySelector('.modal-close').addEventListener('click', () => {
        closeModal(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
    }, 300);
}

// =============================================
// УЛУЧШЕННАЯ СИСТЕМА МУЗЫКИ
// =============================================
function initMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (!musicToggle || !backgroundMusic) {
        console.warn('Music elements not found');
        CONFIG.musicEnabled = false;
        return;
    }

    // Загружаем настройки
    const musicSettings = JSON.parse(localStorage.getItem('portfolioMusicSettings') || '{"enabled":true,"volume":0.4}');
    CONFIG.musicEnabled = musicSettings.enabled;
    
    backgroundMusic.volume = musicSettings.volume;
    backgroundMusic.loop = true;

    function updateMusicIcon() {
        const icon = musicToggle.querySelector('i');
        if (CONFIG.musicEnabled) {
            icon.className = 'fas fa-volume-up';
            musicToggle.style.background = 'linear-gradient(135deg, var(--primary), #6be000)';
        } else {
            icon.className = 'fas fa-volume-mute';
            musicToggle.style.background = 'linear-gradient(135deg, #666, #888)';
        }
    }

    function toggleMusic() {
        CONFIG.musicEnabled = !CONFIG.musicEnabled;
        
        if (CONFIG.musicEnabled) {
            backgroundMusic.play().catch(e => {
                console.log('Autoplay prevented, waiting for user interaction');
            });
            showMusicNotification('Фоновая музыка включена 🎵', true);
        } else {
            backgroundMusic.pause();
            showMusicNotification('Музыка выключена 🔇', false);
        }
        
        // Сохраняем настройки
        const musicSettings = {
            enabled: CONFIG.musicEnabled,
            volume: backgroundMusic.volume
        };
        localStorage.setItem('portfolioMusicSettings', JSON.stringify(musicSettings));
        
        updateMusicIcon();
    }

    musicToggle.addEventListener('click', toggleMusic);

    // Пробуем запустить музыку при первом взаимодействии
    if (CONFIG.musicEnabled) {
        document.addEventListener('click', function startMusicOnInteraction() {
            backgroundMusic.play().catch(e => {
                console.log('Autoplay prevented');
            });
            document.removeEventListener('click', startMusicOnInteraction);
        }, { once: true });
    }

    updateMusicIcon();
    console.log('🎵 Music system initialized');
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
            background: linear-gradient(135deg, var(--primary), #6be000);
            border: none;
            color: var(--dark);
            font-size: 1.3rem;
            cursor: pointer;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(124, 252, 0, 0.4);
        `;

        musicButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(124, 252, 0, 0.6)';
        });

        musicButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 6px 20px rgba(124, 252, 0, 0.4)';
        });

        document.body.appendChild(musicButton);

        musicButton.addEventListener('click', function() {
            const music = document.getElementById('backgroundMusic');
            if (!music) return;

            CONFIG.musicEnabled = !CONFIG.musicEnabled;
            
            if (CONFIG.musicEnabled) {
                music.play().catch(e => console.log('Autoplay prevented:', e));
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.style.background = 'linear-gradient(135deg, var(--primary), #6be000)';
                showMusicNotification('Фоновая музыка включена 🎵', true);
            } else {
                music.pause();
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                this.style.background = 'linear-gradient(135deg, #666, #888)';
                showMusicNotification('Музыка выключена 🔇', false);
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
// СИСТЕМА УВЕДОМЛЕНИЙ (ОБНОВЛЕННАЯ)
// =============================================
function showNotification(message, type = 'info') {
    removeExistingNotifications();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    const icon = icons[type] || icons.info;
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${icon}"></i>
            </div>
            <div class="notification-message">
                <div class="notification-title">${getNotificationTitle(type)}</div>
                <div class="notification-text">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress"></div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Прогресс бар
    const progressBar = notification.querySelector('.notification-progress');
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 100);
    }
    
    // Закрытие по клику
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentElement) {
            closeNotification(notification);
        }
    }, 5000);
}

function getNotificationTitle(type) {
    const titles = {
        success: 'Успешно!',
        error: 'Ошибка!',
        info: 'Информация',
        warning: 'Внимание!'
    };
    return titles[type] || 'Уведомление';
}

function closeNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

function removeExistingNotifications() {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notification => {
        if (!notification.classList.contains('show')) {
            notification.remove();
        }
    });
}

function showMusicNotification(message, isPlaying) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-music';
    
    const icon = isPlaying ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    const title = isPlaying ? 'Музыка включена' : 'Музыка выключена';
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${icon}"></i>
            </div>
            <div class="notification-message">
                <div class="notification-title">🎵 ${title}</div>
                <div class="notification-text">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress"></div>
        </div>
    `;
    
    showCustomNotification(notification);
}

function showWelcomeNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification notification-info';
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-rocket"></i>
            </div>
            <div class="notification-message">
                <div class="notification-title">🚀 Добро пожаловать!</div>
                <div class="notification-text">Рад видеть вас в моем портфолио! Через 20 секунд откроется AI помощник для ответов на вопросы.</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress"></div>
        </div>
    `;
    
    showCustomNotification(notification);
}

function showCustomNotification(notificationElement) {
    document.body.appendChild(notificationElement);
    
    // Анимация появления
    setTimeout(() => {
        notificationElement.classList.add('show');
    }, 10);
    
    // Прогресс бар
    const progressBar = notificationElement.querySelector('.notification-progress');
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 100);
    }
    
    // Закрытие по клику
    notificationElement.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notificationElement);
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notificationElement.parentElement) {
            closeNotification(notificationElement);
        }
    }, 5000);
}

// =============================================
// ОСТАЛЬНЫЕ ФУНКЦИИ ИНИЦИАЛИЗАЦИИ
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
    showNotification(`Тема изменена на ${newTheme === 'dark' ? 'тёмную' : 'светлую'}`, 'info');
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

    document.querySelectorAll('.fade-in, .service-card, .portfolio-item, .skill-item').forEach(el => {
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
    }, { threshold: 0.3 });
    
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
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Валидация
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Пожалуйста, заполните все поля формы', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showNotification('Пожалуйста, введите корректный email адрес', 'error');
            return;
        }

        console.log('Contact form submitted:', formData);
        
        // Имитация отправки
        showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
        
        // Сброс формы
        this.reset();
        
        // Показать дополнительное уведомление через 2 секунды
        setTimeout(() => {
            showNotification('Обычно я отвечаю в течение 1-2 часов в рабочее время', 'info');
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =============================================
// ДОБАВЛЕНИЕ CSS СТИЛЕЙ
// =============================================
const additionalStyles = `
    @keyframes enhancedFloat {
        0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
        }
        25% {
            transform: translateY(-40px) translateX(20px) rotate(90deg);
        }
        50% {
            transform: translateY(-20px) translateX(40px) rotate(180deg);
        }
        75% {
            transform: translateY(-30px) translateX(-20px) rotate(270deg);
        }
    }
    
    @keyframes pulseCircle {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    @keyframes gridMove {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 60px 60px;
        }
    }
    
    @keyframes linePulse {
        0%, 100% {
            opacity: 0.1;
        }
        50% {
            opacity: 0.4;
        }
    }
    
    .project-status {
        position: absolute;
        top: 15px;
        left: 15px;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        z-index: 2;
    }
    
    .project-status.completed {
        background: rgba(0, 210, 106, 0.2);
        color: #00d26a;
        border: 1px solid rgba(0, 210, 106, 0.3);
    }
    
    .project-status.in-progress {
        background: rgba(255, 159, 67, 0.2);
        color: #ff9f43;
        border: 1px solid rgba(255, 159, 67, 0.3);
    }
    
    .project-status-badge {
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .project-status-badge.completed {
        background: rgba(0, 210, 106, 0.2);
        color: #00d26a;
        border: 1px solid rgba(0, 210, 106, 0.3);
    }
    
    .project-status-badge.in-progress {
        background: rgba(255, 159, 67, 0.2);
        color: #ff9f43;
        border: 1px solid rgba(255, 159, 67, 0.3);
    }
    
    .tech-tag-more {
        background: rgba(124, 252, 0, 0.1);
        color: var(--primary);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        border: 1px solid rgba(124, 252, 0, 0.2);
        cursor: help;
    }
    
    .project-meta {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--primary), #6be000);
        color: var(--dark);
        border: none;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(124, 252, 0, 0.4);
    }
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Функция для тестирования уведомлений
function testNotifications() {
    showNotification('Это тестовое информационное уведомление', 'info');
    setTimeout(() => showNotification('Операция выполнена успешно!', 'success'), 600);
    setTimeout(() => showNotification('Произошла ошибка при загрузке данных', 'error'), 1200);
    setTimeout(() => showNotification('Внимание! Проверьте настройки безопасности', 'warning'), 1800);
    setTimeout(() => showAchievementNotification('Новое достижение!', 'Вы впервые посетили портфолио'), 2400);
}

// Добавляем тестовую функцию в глобальную область видимости
window.testNotifications = testNotifications;

console.log('🎨 Enhanced portfolio application loaded successfully!');