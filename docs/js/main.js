// ============================================
// Main JavaScript - Personal Blog
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initSmoothScrolling();
    initLatestPosts();
    initContactForm();
    initAnimations();
    // initThemeToggle(); // Removed - Only Dark Theme
    initBackToTop();
    initTypingAnimation();
    initViewCounters();
    initLoader();
});

// ============================================
// Navigation Menu
// ============================================
function initNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Blog Posts Data
// ============================================
// DUMMY DATA - CLASS: dummy-blog-data
const blogPosts = [
    {
        id: 1,
        title: "React.js ile Modern Web Uygulamaları Geliştirme",
        excerpt: "React.js kullanarak modern, hızlı ve kullanıcı dostu web uygulamaları nasıl geliştirilir? Component yapısı ve state yönetimi.",
        category: "yazilim",
        date: "2024-01-20",
        readingTime: 8,
        image: "https://picsum.photos/400/250?random=1",
        slug: "react-modern-web-uygulamalari",
        isDummy: true
    },
    {
        id: 2,
        title: "Node.js ve Express ile Backend Geliştirme",
        excerpt: "Node.js ve Express.js kullanarak RESTful API tasarımı ve uygulanması. MongoDB entegrasyonu ve JWT authentication.",
        category: "yazilim",
        date: "2024-01-18",
        readingTime: 10,
        image: "https://picsum.photos/400/250?random=2",
        slug: "nodejs-express-backend",
        isDummy: true
    },
    {
        id: 3,
        title: "Docker ve Kubernetes ile Container Yönetimi",
        excerpt: "Mikroservis mimarisinde Docker container'larının oluşturulması ve Kubernetes ile orkestrasyon yönetimi.",
        category: "teknoloji",
        date: "2024-01-15",
        readingTime: 12,
        image: "https://picsum.photos/400/250?random=3",
        slug: "docker-kubernetes-container",
        isDummy: true
    },
    {
        id: 4,
        title: "TypeScript ile Tip Güvenli JavaScript",
        excerpt: "TypeScript'in sağladığı tip güvenliği ile büyük ölçekli JavaScript projelerinde hata oranlarını azaltmak.",
        category: "yazilim",
        date: "2024-01-12",
        readingTime: 7,
        image: "https://picsum.photos/400/250?random=4",
        slug: "typescript-tip-guvenli-js",
        isDummy: true
    },
    {
        id: 5,
        title: "GraphQL vs REST API: Hangisini Seçmeli?",
        excerpt: "Modern web uygulamalarında GraphQL ve REST API yaklaşımlarının karşılaştırılması ve kullanım senaryoları.",
        category: "teknoloji",
        date: "2024-01-10",
        readingTime: 9,
        image: "https://picsum.photos/400/250?random=5",
        slug: "graphql-vs-rest-api",
        isDummy: true
    },
    {
        id: 6,
        title: "CI/CD Pipeline Kurulumu: Jenkins ve GitLab",
        excerpt: "Sürekli entegrasyon ve sürekli dağıtım süreçlerinin Jenkins ve GitLab CI/CD ile otomatize edilmesi.",
        category: "teknoloji",
        date: "2024-01-08",
        readingTime: 11,
        image: "https://picsum.photos/400/250?random=6",
        slug: "cicd-jenkins-gitlab",
        isDummy: true
    },
    {
        id: 7,
        title: "MongoDB Atlas: Bulut Tabanlı NoSQL Çözümü",
        excerpt: "MongoDB Atlas kullanarak bulut tabanlı NoSQL veritabanı yönetimi ve performans optimizasyonu teknikleri.",
        category: "yazilim",
        date: "2024-01-05",
        readingTime: 8,
        image: "https://picsum.photos/400/250?random=7",
        slug: "mongodb-atlas-nosql",
        isDummy: true
    },
    {
        id: 8,
        title: "Tailwind CSS ile Hızlı UI Geliştirme",
        excerpt: "Utility-first CSS framework'u Tailwind CSS kullanarak hızlı ve responsive arayüz tasarımları oluşturma.",
        category: "yazilim",
        date: "2024-01-03",
        readingTime: 6,
        image: "https://picsum.photos/400/250?random=8",
        slug: "tailwind-css-ui",
        isDummy: true
    },
    {
        id: 9,
        title: "Redis Cache Stratejileri ve Performans",
        excerpt: "Redis kullanarak web uygulamalarında cache stratejileri geliştirme ve performans optimizasyonu teknikleri.",
        category: "teknoloji",
        date: "2024-01-01",
        readingTime: 9,
        image: "https://picsum.photos/400/250?random=9",
        slug: "redis-cache-stratejileri",
        isDummy: true
    },
    {
        id: 10,
        title: "Git Flow: Ekip Çalışmasında Versiyon Yönetimi",
        excerpt: "Git Flow metodolojisi ile takım çalışmalarında etkili branch yönetimi ve kod versiyonlama stratejileri.",
        category: "yazilim",
        date: "2023-12-28",
        readingTime: 7,
        image: "https://picsum.photos/400/250?random=10",
        slug: "git-flow-versiyon-yonetimi",
        isDummy: true
    },
    {
        id: 11,
        title: "Python ile Veri Analizi ve Görselleştirme",
        excerpt: "Pandas, NumPy ve Matplotlib kullanarak büyük veri setlerini analiz etme ve görselleştirme teknikleri.",
        category: "yazilim",
        date: "2023-12-25",
        readingTime: 10,
        image: "https://picsum.photos/400/250?random=11",
        slug: "python-veri-analizi",
        isDummy: true
    },
    {
        id: 12,
        title: "AWS Lambda ile Serverless Fonksiyonlar",
        excerpt: "Amazon Web Services Lambda kullanarak serverless mimaride fonksiyon geliştirme ve dağıtım süreçleri.",
        category: "teknoloji",
        date: "2023-12-22",
        readingTime: 9,
        image: "https://picsum.photos/400/250?random=12",
        slug: "aws-lambda-serverless",
        isDummy: true
    },
    {
        id: 13,
        title: "Flutter ile Cross-Platform Mobil Uygulamalar",
        excerpt: "Dart programlama dili ve Flutter framework kullanarak iOS ve Android için mobil uygulamalar geliştirme.",
        category: "yazilim",
        date: "2023-12-20",
        readingTime: 11,
        image: "https://picsum.photos/400/250?random=13",
        slug: "flutter-cross-platform",
        isDummy: true
    },
    {
        id: 14,
        title: "Machine Learning Temelleri: Supervised Learning",
        excerpt: "Makine öğrenmesi algoritmalarının temelleri, supervised learning yöntemleri ve pratik uygulamalar.",
        category: "teknoloji",
        date: "2023-12-18",
        readingTime: 13,
        image: "https://picsum.photos/400/250?random=14",
        slug: "machine-learning-supervised",
        isDummy: true
    },
    {
        id: 15,
        title: "CSS Grid ve Flexbox ile Modern Layout",
        excerpt: "Modern web tasarımında CSS Grid ve Flexbox kullanarak responsive ve esnek layout yapıları oluşturma.",
        category: "yazilim",
        date: "2023-12-15",
        readingTime: 8,
        image: "https://picsum.photos/400/250?random=15",
        slug: "css-grid-flexbox-layout",
        isDummy: true
    },
    {
        id: 16,
        title: "PostgreSQL ile İleri Düzey Veritabanı Tasarımı",
        excerpt: "PostgreSQL kullanarak karmaşık veritabanı şemaları, indeksler ve performans optimizasyonu teknikleri.",
        category: "yazilim",
        date: "2023-12-12",
        readingTime: 12,
        image: "https://picsum.photos/400/250?random=16",
        slug: "postgresql-veritabani-tasarim",
        isDummy: true
    },
    {
        id: 17,
        title: "Vue.js ile Progressive Web Apps",
        excerpt: "Vue.js framework kullanarak modern progressive web uygulamaları geliştirme ve PWA özelliklerini entegre etme.",
        category: "yazilim",
        date: "2023-12-10",
        readingTime: 9,
        image: "https://picsum.photos/400/250?random=17",
        slug: "vuejs-progressive-web-apps",
        isDummy: true
    },
    {
        id: 18,
        title: "Blockchain Teknolojisi ve Kripto Para",
        excerpt: "Blockchain'in çalışma prensipleri, kripto para birimleri ve akıllı kontratların temel kavramları.",
        category: "teknoloji",
        date: "2023-12-08",
        readingTime: 10,
        image: "https://picsum.photos/400/250?random=18",
        slug: "blockchain-kripto-para",
        isDummy: true
    },
    {
        id: 19,
        title: "JavaScript ES6+ Özellikleri ve Best Practices",
        excerpt: "Modern JavaScript özelliklerinin derinlemesine incelenmesi ve kod kalitesini artırma pratikleri.",
        category: "yazilim",
        date: "2023-12-05",
        readingTime: 11,
        image: "https://picsum.photos/400/250?random=19",
        slug: "javascript-es6-features",
        isDummy: true
    },
    {
        id: 20,
        title: "Docker Compose ile Mikroservis Orkestrasyonu",
        excerpt: "Docker Compose kullanarak çoklu konteyner uygulamalarını yönetme ve mikroservis mimarisi kurma.",
        category: "teknoloji",
        date: "2023-12-03",
        readingTime: 8,
        image: "https://picsum.photos/400/250?random=20",
        slug: "docker-compose-mikroservis",
        isDummy: true
    },
    {
        id: 21,
        title: "React Native ile Mobil Uygulama Geliştirme",
        excerpt: "React Native kullanarak native mobil uygulamalar geliştirme ve platformlar arası kod paylaşımı.",
        category: "yazilim",
        date: "2023-12-01",
        readingTime: 12,
        image: "https://picsum.photos/400/250?random=21",
        slug: "react-native-mobil-uygulama",
        isDummy: true
    },
    {
        id: 22,
        title: "Cybersecurity Temelleri ve Web Güvenliği",
        excerpt: "Web uygulamalarında güvenlik açıkları, OWASP Top 10 ve temel güvenlik önlemleri.",
        category: "teknoloji",
        date: "2023-11-28",
        readingTime: 14,
        image: "https://picsum.photos/400/250?random=22",
        slug: "cybersecurity-web-guvenligi",
        isDummy: true
    },
    {
        id: 23,
        title: "SASS/SCSS ile Gelişmiş CSS Yazma",
        excerpt: "SASS preprocessor kullanarak modüler CSS yazma, değişkenler ve mixin'ler ile kod tekrarını azaltma.",
        category: "yazilim",
        date: "2023-11-25",
        readingTime: 7,
        image: "https://picsum.photos/400/250?random=23",
        slug: "sass-scss-css-yazma",
        isDummy: true
    },
    {
        id: 24,
        title: "Apache Kafka ile Event-Driven Architecture",
        excerpt: "Kafka kullanarak event-driven mimari kurma ve gerçek zamanlı veri akışı yönetimi.",
        category: "teknoloji",
        date: "2023-11-22",
        readingTime: 11,
        image: "https://picsum.photos/400/250?random=24",
        slug: "apache-kafka-event-driven",
        isDummy: true
    },
    {
        id: 25,
        title: "Angular ile Enterprise Uygulamalar",
        excerpt: "Angular framework kullanarak büyük ölçekli enterprise uygulamaları geliştirme ve modüler yapı.",
        category: "yazilim",
        date: "2023-11-20",
        readingTime: 13,
        image: "https://picsum.photos/400/250?random=25",
        slug: "angular-enterprise-uygulamalar",
        isDummy: true
    },
    {
        id: 26,
        title: "Lise Hayatında Zaman Yönetimi",
        excerpt: "Lise öğrencileri için etkili zaman yönetimi teknikleri, ders çalışma planlaması ve motivasyon yöntemleri.",
        category: "lise-hayati",
        date: "2023-11-18",
        readingTime: 6,
        image: "https://picsum.photos/400/250?random=26",
        slug: "lise-zaman-yonetimi",
        isDummy: true
    },
    {
        id: 27,
        title: "Kitap Önerileri: Teknoloji ve Bilim",
        excerpt: "Yazılım mühendisleri ve teknoloji meraklıları için okunması gereken kitaplar ve kişisel deneyimlerim.",
        category: "kitap-film",
        date: "2023-11-15",
        readingTime: 8,
        image: "https://picsum.photos/400/250?random=27",
        slug: "kitap-onerileri-teknoloji",
        isDummy: true
    },
    {
        id: 28,
        title: "İlk Kodlama Deneyimlerim",
        excerpt: "Lise yıllarında başlayan kodlama yolculuğum, karşılaştığım zorluklar ve öğrendiğim dersler.",
        category: "kisisel",
        date: "2023-11-12",
        readingTime: 9,
        image: "https://picsum.photos/400/250?random=28",
        slug: "ilk-kodlama-deneyimlerim",
        isDummy: true
    },
    {
        id: 29,
        title: "Film İncelemeleri: Matrix Serisi",
        excerpt: "Matrix film serisinin teknolojik ve felsefi yönlerinin analizi, günümüz teknolojisiyle paralellikler.",
        category: "kitap-film",
        date: "2023-11-10",
        readingTime: 7,
        image: "https://picsum.photos/400/250?random=29",
        slug: "film-inceleme-matrix",
        isDummy: true
    },
    {
        id: 30,
        title: "Lise Proje Fikirleri ve Uygulamalar",
        excerpt: "Lise öğrencileri için teknoloji projeleri, Arduino, Raspberry Pi ve basit web uygulamaları fikirleri.",
        category: "lise-hayati",
        date: "2023-11-08",
        readingTime: 10,
        image: "https://picsum.photos/400/250?random=30",
        slug: "lise-proje-fikirleri",
        isDummy: true
    }
];

// ============================================
// Display Latest Posts on Homepage
// ============================================
function initLatestPosts() {
    const postsGrid = document.getElementById('latest-posts-grid');
    
    if (postsGrid) {
        // Get the latest 3 posts
        const latestPosts = blogPosts.slice(0, 3);
        
        latestPosts.forEach(post => {
            const postCard = createPostCard(post);
            postsGrid.appendChild(postCard);
        });
    }
}

// ============================================
// Create Post Card Element
// ============================================
function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card';
    
    const categoryMap = {
        'teknoloji': 'Teknoloji',
        'yazilim': 'Yazılım',
        'lise-hayati': 'Lise Hayatı',
        'kitap-film': 'Kitap & Film',
        'kisisel': 'Kişisel'
    };
    
    // Get view count for this post
    const viewKey = `post-views-${post.id}`;
    const views = localStorage.getItem(viewKey) || Math.floor(Math.random() * 200) + 50;
    
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-content">
            <div class="post-meta">
                <span class="post-category">${categoryMap[post.category] || post.category}</span>
                <span class="post-date">${formatDate(post.date)}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-footer">
                <a href="blog-post.html?id=${post.id}" class="read-more">
                    Devamını Oku →
                </a>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <span class="reading-time">
                        <i class="far fa-clock"></i> ${post.readingTime} dk
                    </span>
                    <span class="post-views">
                        <i class="fas fa-eye"></i> ${views}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// Format Date
// ============================================
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
}

// ============================================
// Contact Form Handling
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.btn-submit');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoading = submitBtn.querySelector('.btn-loading');
                
                btnText.style.display = 'none';
                btnLoading.style.display = 'block';
                submitBtn.disabled = true;
                
                // Simulate sending email (replace with actual EmailJS integration)
                setTimeout(() => {
                    // Show success message
                    showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button state
                    btnText.style.display = 'block';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// ============================================
// Form Validation
// ============================================
function validateForm(data) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    
    // Validate name
    if (data.name.trim().length < 2) {
        showFieldError('name', 'İsim en az 2 karakter olmalıdır.');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFieldError('email', 'Geçerli bir email adresi giriniz.');
        isValid = false;
    }
    
    // Validate subject
    if (data.subject.trim().length < 3) {
        showFieldError('subject', 'Konu en az 3 karakter olmalıdır.');
        isValid = false;
    }
    
    // Validate message
    if (data.message.trim().length < 10) {
        showFieldError('message', 'Mesaj en az 10 karakter olmalıdır.');
        isValid = false;
    }
    
    return isValid;
}

// ============================================
// Show Field Error
// ============================================
function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// ============================================
// Show Form Message
// ============================================
function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'form-message ' + type;
        messageElement.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// Scroll Animations
// ============================================
function initAnimations() {
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.post-card, .stat-card, .interest-card, .goal-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// ============================================
// Progress Bar for Blog Posts
// ============================================
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #58a6ff 0%, #238636 100%);
        z-index: 1001;
        transition: width 0.2s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Initialize reading progress on blog post pages
if (window.location.pathname.includes('blog-post')) {
    initReadingProgress();
}

// ============================================
// Copy Code Blocks to Clipboard
// ============================================
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            background: #30363d;
            border: 1px solid #484f58;
            border-radius: 4px;
            color: #8b949e;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.textContent = 'Copied!';
                button.style.color = '#238636';
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.color = '#8b949e';
                }, 2000);
            });
        });
    });
}

// Theme Toggle Removed - Only Dark Theme

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// Typing Animation
// ============================================
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroTitle.querySelector('.highlight')) {
        const highlightElement = heroTitle.querySelector('.highlight');
        const originalText = highlightElement.textContent;
        highlightElement.textContent = '';
        highlightElement.classList.add('typewriter');
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                highlightElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
}

// ============================================
// View Counters for Blog Posts
// ============================================
function initViewCounters() {
    // Add view counters to blog posts
    blogPosts.forEach(post => {
        const viewKey = `post-views-${post.id}`;
        let views = parseInt(localStorage.getItem(viewKey) || Math.floor(Math.random() * 200) + 50);
        localStorage.setItem(viewKey, views);
        post.views = views;
    });
}

// ============================================
// Loading Animation
// ============================================
function initLoader() {
    // Create loader if it doesn't exist
    let loader = document.getElementById('loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'loader-wrapper';
        loader.id = 'loader';
        loader.innerHTML = '<div class="loader"></div>';
        document.body.prepend(loader);
    }
    
    // Hide loader when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    });
}

// ============================================
// Export functions for use in other files
// ============================================
window.blogData = {
    posts: blogPosts,
    createPostCard: createPostCard,
    formatDate: formatDate
};
