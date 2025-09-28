// Встроенные проекты (работают без JSON файла)
const projects = [
    {
        "id": 1,
        "category": "web",
        "title": "Интернет-магазин Moscow RP",
        "description": "Разработка современного интернет-магазина с корзиной, фильтрами и системой оплаты для проекта GTA 5 RP.",
        "image": "project1.jpg",
        "demoLink": "https://districkov.github.io/Moscow___RP/",
        "githubLink": "https://github.com/Districkov/Moscow___RP"
    },
    {
        "id": 2,
        "category": "app", 
        "title": "Приложение Pyrometer",
        "description": "Веб-приложение для управления задачами и проектами с возможностью совместной работы.",
        "image": "project2.jpg",
        "demoLink": "https://pyrometer.tilda.ws/",
        "githubLink": ""
    },
    {
        "id": 3,
        "category": "design",
        "title": "Дизайн проекта Astra GTA 5 RP", 
        "description": "Создание UI/UX дизайна для проекта по GTA 5 RP с современным интерфейсом.",
        "image": "project3.jpg",
        "demoLink": "https://www.figma.com/design/XbDdfTxHWDtniMplxhkvcu/Astra-Project-%7C-Figma?node-id=310-3098&p=f&t=t1uig8AF5IQqlOv7-0",
        "githubLink": ""
    }
];

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

// Функция для отрисовки проектов
function renderProjects(projects) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    if (projects.length === 0) {
        portfolioGrid.innerHTML = `
            <div style="text-align: center; color: var(--gray); padding: 60px 20px;">
                <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3 style="margin-bottom: 10px;">Пока нет проектов</h3>
                <p style="margin-bottom: 20px;">Добавьте свой первый проект, нажав на кнопку ниже</p>
                <button class="btn" onclick="toggleAdmin()">
                    <i class="fas fa-plus"></i> Добавить проект
                </button>
            </div>
        `;
        return;
    }
    
    portfolioGrid.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item';
        projectElement.setAttribute('data-category', project.category);

        // Определяем иконку по категории
        let icon = 'code';
        if (project.category === 'web') icon = 'globe';
        if (project.category === 'app') icon = 'mobile-alt';
        if (project.category === 'design') icon = 'palette';

        projectElement.innerHTML = `
            <div class="portfolio-image ${project.image ? 'has-image' : ''}">
                ${project.image ? 
                    `<img src="images/${project.image}" alt="${project.title}" loading="lazy">` : 
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
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;

        portfolioGrid.appendChild(projectElement);
    });
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

// Админ-панель
function toggleAdmin() {
    const panel = document.getElementById('admin-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// Обработка формы добавления проекта
document.getElementById('project-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newProject = {
        id: Date.now(),
        title: document.getElementById('project-title').value,
        category: document.getElementById('project-category').value,
        description: document.getElementById('project-description').value,
        image: document.getElementById('project-image').value,
        demoLink: document.getElementById('project-demo').value || '',
        githubLink: document.getElementById('project-github').value || ''
    };
    
    // Добавляем проект в массив
    projects.push(newProject);
    
    // Перерисовываем проекты
    renderProjects(projects);
    initPortfolioFilters();
    
    this.reset();
    toggleAdmin();
    alert('Проект добавлен!');
});

// Обработка формы контактов
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

// Вызываем загрузку проектов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderProjects(projects);
    initPortfolioFilters();
});