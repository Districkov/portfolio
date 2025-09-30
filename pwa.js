// PWA функциональность
class PWAHelper {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.initInstallPrompt();
        this.initNetworkStatus();
        this.initAppBadge();
    }

    // Регистрация Service Worker
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker зарегистрирован:', registration);
                
                // Проверка обновлений
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('Обнаружено обновление Service Worker');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateNotification();
                        }
                    });
                });
            } catch (error) {
                console.error('Ошибка регистрации Service Worker:', error);
            }
        }
    }

    // Обработка установки PWA
    initInstallPrompt() {
        const installBtn = document.getElementById('pwaInstallBtn');
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Показываем кнопку установки
            if (installBtn) {
                installBtn.style.display = 'flex';
                installBtn.addEventListener('click', () => this.installApp());
            }
            
            // Автоматически показываем промпт через 10 секунд
            setTimeout(() => {
                if (this.deferredPrompt && !this.isAppInstalled()) {
                    this.showInstallPrompt();
                }
            }, 10000);
        });

        // Скрываем кнопку если приложение уже установлено
        window.addEventListener('appinstalled', () => {
            console.log('PWA установлено');
            if (installBtn) installBtn.style.display = 'none';
            this.deferredPrompt = null;
            this.showNotification('Приложение успешно установлено!', 'success');
        });
    }

    // Установка приложения
    async installApp() {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        console.log(`Пользователь ${outcome} установку`);
        this.deferredPrompt = null;
        
        const installBtn = document.getElementById('pwaInstallBtn');
        if (installBtn) installBtn.style.display = 'none';
    }

    // Проверка установлено ли приложение
    isAppInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches || 
               window.navigator.standalone ||
               document.referrer.includes('android-app://');
    }

    // Показ промпта установки
    showInstallPrompt() {
        if (this.deferredPrompt && confirm('Хотите установить приложение для быстрого доступа?')) {
            this.installApp();
        }
    }

    // Уведомление об обновлении
    showUpdateNotification() {
        if (confirm('Доступна новая версия приложения. Обновить?')) {
            window.location.reload();
        }
    }

    // Мониторинг сетевого статуса
    initNetworkStatus() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            connection.addEventListener('change', () => {
                this.handleNetworkChange(connection.effectiveType);
            });

            // Показываем текущий статус
            this.showNetworkStatus(connection.effectiveType);
        }

        window.addEventListener('online', () => {
            this.showNotification('Соединение восстановлено', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Отсутствует интернет-соединение', 'warning');
        });
    }

    handleNetworkChange(connectionType) {
        const status = document.getElementById('networkStatus');
        if (!status) return;

        const speedInfo = {
            'slow-2g': 'Очень медленно',
            '2g': 'Медленно',
            '3g': 'Средне',
            '4g': 'Быстро'
        };

        status.textContent = `Сеть: ${speedInfo[connectionType] || connectionType}`;
    }

    showNetworkStatus(connectionType) {
        // Можно добавить индикатор статуса сети в интерфейс
        console.log('Тип соединения:', connectionType);
    }

    // Бейджи приложения
    initAppBadge() {
        if ('setAppBadge' in navigator) {
            // Устанавливаем бейдж с количеством проектов
            this.updateAppBadge();
        }
    }

    async updateAppBadge() {
        if ('setAppBadge' in navigator) {
            try {
                const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
                await navigator.setAppBadge(projects.length);
            } catch (error) {
                console.log('Не удалось установить бейдж:', error);
            }
        }
    }

    // Фоновая синхронизация
    async registerBackgroundSync() {
        if ('sync' in registration) {
            try {
                await registration.sync.register('background-sync');
                console.log('Фоновая синхронизация зарегистрирована');
            } catch (error) {
                console.log('Фоновая синхронизация не поддерживается:', error);
            }
        }
    }

    // Push уведомления
    async requestNotificationPermission() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                console.log('Разрешение на уведомления получено');
                this.subscribeToPush();
            }
        }
    }

    async subscribeToPush() {
        const registration = await navigator.serviceWorker.ready;
        
        try {
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array('BEl62iUYgUivzwI_JJD8R')
            });
            
            console.log('Подписка на push уведомления:', subscription);
            // Отправляем subscription на сервер
        } catch (error) {
            console.log('Ошибка подписки на push:', error);
        }
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    showNotification(message, type = 'info') {
        if ('Notification' in window && Notification.permission === 'granted') {
            const icon = type === 'success' ? '/icons/success.png' : 
                        type === 'warning' ? '/icons/warning.png' : 
                        '/icons/info.png';

            new Notification('Portfolio', {
                body: message,
                icon: icon,
                badge: '/icons/badge-72x72.png'
            });
        }
    }

    // Получение данных о ресурсах
    async getStorageEstimate() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            const estimate = await navigator.storage.estimate();
            console.log('Использование хранилища:', estimate);
            return estimate;
        }
        return null;
    }

    // Сохранение данных в режиме офлайн
    async persistStorage() {
        if ('storage' in navigator && 'persist' in navigator.storage) {
            const persisted = await navigator.storage.persist();
            console.log('Хранилище сохранено:', persisted);
        }
    }
}

// Инициализация PWA
let pwaHelper;

document.addEventListener('DOMContentLoaded', () => {
    pwaHelper = new PWAHelper();
});

// Глобальный экспорт
window.pwaHelper = pwaHelper;