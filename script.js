// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileMenuBtn.innerHTML = navbar.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Плавная прокрутка
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

// Активная навигация при прокрутке
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

// Анимация появления элементов при прокрутке
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
// Запускаем при загрузке страницы для уже видимых элементов
fadeInOnScroll();

// Анимация прогресс-баров
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

// Фильтрация портфолио
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс к текущей кнопке
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

// Обработка формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
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

// Функция для замены ссылок на реальные
function updateLinks() {
    // Социальные сети
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
         if (icon.classList.contains('fa-telegram')) {
            link.href = 'https://t.me/@Mortalovich';
        } else if (icon.classList.contains('fa-github')) {
            link.href = 'https://github.com/Districkov';
        } 
        link.target = '_blank';
    });

    // Ссылки портфолио
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach((link, index) => {
        const icon = link.querySelector('i');
        if (icon.classList.contains('fa-external-link-alt')) {
            // Внешние ссылки на проекты
            switch (index) {
                case 0: link.href = 'https://districkov.github.io/Moscow___RP/'; break;
                case 2: link.href = 'https://pyrometer.tilda.ws/'; break;
                case 4: link.href = 'https://www.figma.com/design/XbDdfTxHWDtniMplxhkvcu/Astra-Project-%7C-Figma?node-id=310-3098&p=f&t=t1uig8AF5IQqlOv7-0'; break;
            }
        } else if (icon.classList.contains('fa-github')) {
            // GitHub ссылки
            switch (index) {
                case 1: link.href = 'https://github.com/Districkov/Moscow___RP'; break;
            }
        }
        link.target = '_blank';
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', updateLinks);