// Advanced Features Module
class AdvancedFeatures {
    constructor() {
        this.githubUsername = 'username'; // Change this to actual username
        this.init();
    }

    init() {
        this.initGitHubActivity();
        this.initReadingList();
        this.initKeyboardShortcuts();
        this.initStatsDashboard();
        this.initQRCode();
        this.initVCard();
        this.initFloatingActionButton();
        this.initBreadcrumbs();
        this.initTimeline();
        this.initMusicWidget();
        this.initWeatherWidget();
    }

    // GitHub Activity Graph
    initGitHubActivity() {
        const githubSection = document.querySelector('.github-section');
        if (!githubSection) return;

        // Create GitHub activity container
        const activityContainer = document.createElement('div');
        activityContainer.className = 'github-activity glass';
        activityContainer.innerHTML = `
            <h3>GitHub Aktivitesi</h3>
            <div class="github-stats">
                <div class="stat-widget">
                    <span class="stat-icon">📦</span>
                    <div class="stat-value" id="repo-count">0</div>
                    <div class="stat-label">Repositories</div>
                </div>
                <div class="stat-widget">
                    <span class="stat-icon">⭐</span>
                    <div class="stat-value" id="star-count">0</div>
                    <div class="stat-label">Stars</div>
                </div>
                <div class="stat-widget">
                    <span class="stat-icon">👥</span>
                    <div class="stat-value" id="follower-count">0</div>
                    <div class="stat-label">Followers</div>
                </div>
            </div>
            <div class="github-contributions"></div>
            <div class="github-repos" id="github-repos"></div>
        `;
        githubSection.appendChild(activityContainer);

        // Generate mock contribution graph
        this.generateContributionGraph();

        // Fetch GitHub data (will work when actual username is provided)
        this.fetchGitHubData();
    }

    generateContributionGraph() {
        const container = document.querySelector('.github-contributions');
        if (!container) return;

        const weeks = 53;
        const days = 7;
        
        for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < days; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'contribution-day';
                
                // Random contribution level
                const level = Math.floor(Math.random() * 5);
                if (level > 0) {
                    dayElement.classList.add(`level-${level}`);
                }
                
                dayElement.title = `${Math.floor(Math.random() * 10)} contributions`;
                container.appendChild(dayElement);
            }
        }
    }

    async fetchGitHubData() {
        try {
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${this.githubUsername}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                document.getElementById('repo-count').textContent = userData.public_repos;
                document.getElementById('follower-count').textContent = userData.followers;
            }

            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=5`);
            if (reposResponse.ok) {
                const repos = await reposResponse.json();
                this.displayRepos(repos);
            }
        } catch (error) {
            console.log('GitHub API error:', error);
        }
    }

    displayRepos(repos) {
        const container = document.getElementById('github-repos');
        if (!container) return;

        container.innerHTML = '<h4>Son Projeler</h4>';
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            repoCard.innerHTML = `
                <h5><a href="${repo.html_url}" target="_blank">${repo.name}</a></h5>
                <p>${repo.description || 'Açıklama yok'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🔀 ${repo.forks_count}</span>
                    <span>📝 ${repo.language || 'N/A'}</span>
                </div>
            `;
            container.appendChild(repoCard);
        });
    }

    // Reading List Management
    initReadingList() {
        // Create reading list UI
        const readingList = document.createElement('div');
        readingList.className = 'reading-list';
        readingList.innerHTML = `
            <div class="reading-list-header">
                <h3>Okuma Listesi</h3>
                <button class="close-reading-list">✕</button>
            </div>
            <div class="reading-list-content"></div>
            <button class="clear-reading-list">Listeyi Temizle</button>
        `;
        document.body.appendChild(readingList);

        // Add reading list toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'reading-list-toggle';
        toggleButton.innerHTML = '📚';
        toggleButton.title = 'Okuma Listesi';
        document.body.appendChild(toggleButton);

        // Load saved items
        this.loadReadingList();

        // Event listeners
        toggleButton.addEventListener('click', () => {
            readingList.classList.toggle('active');
        });

        readingList.querySelector('.close-reading-list').addEventListener('click', () => {
            readingList.classList.remove('active');
        });

        readingList.querySelector('.clear-reading-list').addEventListener('click', () => {
            if (confirm('Tüm okuma listesini temizlemek istediğinize emin misiniz?')) {
                localStorage.removeItem('readingList');
                this.loadReadingList();
            }
        });

        // Add "Add to reading list" buttons to blog posts
        document.querySelectorAll('.blog-post').forEach(post => {
            const addButton = document.createElement('button');
            addButton.className = 'add-to-reading-list';
            addButton.innerHTML = '➕ Okuma Listesine Ekle';
            addButton.addEventListener('click', () => {
                this.addToReadingList(post);
            });
            post.appendChild(addButton);
        });
    }

    loadReadingList() {
        const container = document.querySelector('.reading-list-content');
        if (!container) return;

        const items = JSON.parse(localStorage.getItem('readingList') || '[]');
        
        if (items.length === 0) {
            container.innerHTML = '<p class="empty-message">Okuma listeniz boş</p>';
            return;
        }

        container.innerHTML = '';
        items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'reading-list-item';
            itemElement.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.excerpt}</p>
                <div class="reading-list-actions">
                    <a href="${item.url}" class="read-now">Oku</a>
                    <button class="remove-item" data-index="${index}">Kaldır</button>
                </div>
            `;
            container.appendChild(itemElement);
        });

        // Add remove functionality
        container.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                items.splice(index, 1);
                localStorage.setItem('readingList', JSON.stringify(items));
                this.loadReadingList();
            });
        });
    }

    addToReadingList(post) {
        const title = post.querySelector('h3')?.textContent || 'Başlıksız';
        const excerpt = post.querySelector('.post-excerpt')?.textContent || '';
        const url = post.querySelector('.read-more')?.href || '#';

        const items = JSON.parse(localStorage.getItem('readingList') || '[]');
        
        // Check if already exists
        if (items.some(item => item.url === url)) {
            alert('Bu yazı zaten okuma listenizde!');
            return;
        }

        items.push({ title, excerpt, url, addedAt: Date.now() });
        localStorage.setItem('readingList', JSON.stringify(items));
        this.loadReadingList();
        
        // Show notification
        this.showNotification('Okuma listesine eklendi!');
    }

    // Keyboard Shortcuts
    initKeyboardShortcuts() {
        const shortcuts = {
            'g h': () => window.location.href = '/',
            'g b': () => window.location.href = '/blog.html',
            'g a': () => window.location.href = '/about.html',
            'g c': () => window.location.href = '/contact.html',
            '/': () => document.querySelector('.search-bar input')?.focus(),
            '?': () => this.showKeyboardShortcuts(),
            'r': () => document.querySelector('.reading-list-toggle')?.click(),
            't': () => document.body.classList.toggle('light-mode'),
            'Escape': () => this.closeAllModals()
        };

        let keyBuffer = '';
        let bufferTimeout;

        document.addEventListener('keydown', (e) => {
            // Skip if typing in input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key;
            keyBuffer += key;

            clearTimeout(bufferTimeout);
            bufferTimeout = setTimeout(() => {
                keyBuffer = '';
            }, 500);

            // Check for matches
            Object.keys(shortcuts).forEach(shortcut => {
                if (keyBuffer.endsWith(shortcut)) {
                    e.preventDefault();
                    shortcuts[shortcut]();
                    keyBuffer = '';
                }
            });
        });
    }

    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'keyboard-shortcuts glass active';
        modal.innerHTML = `
            <h3>Klavye Kısayolları</h3>
            <div class="shortcut-item">
                <span>Ana Sayfa</span>
                <kbd>g h</kbd>
            </div>
            <div class="shortcut-item">
                <span>Blog</span>
                <kbd>g b</kbd>
            </div>
            <div class="shortcut-item">
                <span>Hakkımda</span>
                <kbd>g a</kbd>
            </div>
            <div class="shortcut-item">
                <span>İletişim</span>
                <kbd>g c</kbd>
            </div>
            <div class="shortcut-item">
                <span>Arama</span>
                <kbd>/</kbd>
            </div>
            <div class="shortcut-item">
                <span>Okuma Listesi</span>
                <kbd>r</kbd>
            </div>
            <div class="shortcut-item">
                <span>Tema Değiştir</span>
                <kbd>t</kbd>
            </div>
            <div class="shortcut-item">
                <span>Komut Paleti</span>
                <kbd>Ctrl/Cmd + K</kbd>
            </div>
            <div class="shortcut-item">
                <span>Kapat</span>
                <kbd>Esc</kbd>
            </div>
            <button class="close-modal">Kapat</button>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    closeAllModals() {
        document.querySelectorAll('.keyboard-shortcuts, .reading-list.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Stats Dashboard
    initStatsDashboard() {
        // Create stats for blog posts
        const blogPosts = document.querySelectorAll('.blog-post');
        const totalPosts = blogPosts.length;
        const totalWords = Array.from(blogPosts).reduce((sum, post) => {
            const text = post.textContent || '';
            return sum + text.split(/\s+/).length;
        }, 0);
        const avgReadTime = Math.ceil(totalWords / 200); // 200 words per minute

        // Update stats if dashboard exists
        const dashboard = document.querySelector('.stats-dashboard');
        if (dashboard) {
            dashboard.innerHTML = `
                <div class="stat-widget neumorphic">
                    <span class="stat-icon">📝</span>
                    <div class="stat-value">${totalPosts}</div>
                    <div class="stat-label">Toplam Yazı</div>
                </div>
                <div class="stat-widget neumorphic">
                    <span class="stat-icon">📚</span>
                    <div class="stat-value">${Math.ceil(totalWords / 1000)}k</div>
                    <div class="stat-label">Kelime</div>
                </div>
                <div class="stat-widget neumorphic">
                    <span class="stat-icon">⏱️</span>
                    <div class="stat-value">${avgReadTime}</div>
                    <div class="stat-label">Dk Okuma</div>
                </div>
                <div class="stat-widget neumorphic">
                    <span class="stat-icon">👁️</span>
                    <div class="stat-value">${Math.floor(Math.random() * 1000)}</div>
                    <div class="stat-label">Görüntüleme</div>
                </div>
            `;
        }
    }

    // QR Code Generator
    initQRCode() {
        const contactSection = document.querySelector('.contact-info');
        if (!contactSection) return;

        const qrContainer = document.createElement('div');
        qrContainer.className = 'qr-code-container glass';
        qrContainer.innerHTML = `
            <h3>QR Kod ile Paylaş</h3>
            <div class="qr-code" id="qr-code">
                <canvas id="qr-canvas"></canvas>
            </div>
            <button class="btn btn-primary" id="download-qr">QR Kodu İndir</button>
        `;
        contactSection.appendChild(qrContainer);

        // Generate simple QR code visualization (placeholder)
        this.generateQRCode(window.location.href);

        document.getElementById('download-qr')?.addEventListener('click', () => {
            this.downloadQRCode();
        });
    }

    generateQRCode(text) {
        const canvas = document.getElementById('qr-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const size = 200;
        canvas.width = size;
        canvas.height = size;

        // Simple QR code visualization (actual QR would need library)
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, size, size);
        
        ctx.fillStyle = '#000';
        const moduleSize = 5;
        for (let i = 0; i < size / moduleSize; i++) {
            for (let j = 0; j < size / moduleSize; j++) {
                if (Math.random() > 0.5) {
                    ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
                }
            }
        }

        // Add center logo area
        ctx.fillStyle = '#fff';
        ctx.fillRect(size/2 - 30, size/2 - 30, 60, 60);
        ctx.fillStyle = '#8a2be2';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('B', size/2, size/2 + 10);
    }

    downloadQRCode() {
        const canvas = document.getElementById('qr-canvas');
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    // vCard Generator
    initVCard() {
        const contactSection = document.querySelector('.contact-info');
        if (!contactSection) return;

        const vcardButton = document.createElement('a');
        vcardButton.className = 'vcard-download btn btn-secondary';
        vcardButton.innerHTML = '📇 Kartvizit İndir (vCard)';
        vcardButton.href = '#';
        vcardButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.downloadVCard();
        });
        contactSection.appendChild(vcardButton);
    }

    downloadVCard() {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:İsim Soyisim
ORG:Lise Öğrencisi
TEL:+90 555 555 5555
EMAIL:email@example.com
URL:${window.location.origin}
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contact.vcf';
        link.click();
        URL.revokeObjectURL(url);
    }

    // Floating Action Button
    initFloatingActionButton() {
        const fab = document.createElement('div');
        fab.className = 'fab-container';
        fab.innerHTML = `
            <div class="fab-options">
                <div class="fab-option" title="Yukarı Çık" id="scroll-top">
                    <span>⬆️</span>
                </div>
                <div class="fab-option" title="Paylaş" id="share-page">
                    <span>🔗</span>
                </div>
                <div class="fab-option" title="Karanlık/Aydınlık" id="toggle-theme-fab">
                    <span>🌙</span>
                </div>
            </div>
            <div class="fab-main">
                <span>➕</span>
            </div>
        `;
        document.body.appendChild(fab);

        // Toggle FAB menu
        fab.querySelector('.fab-main').addEventListener('click', () => {
            fab.classList.toggle('active');
        });

        // Scroll to top
        fab.querySelector('#scroll-top').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            fab.classList.remove('active');
        });

        // Share page
        fab.querySelector('#share-page').addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                this.showNotification('Link kopyalandı!');
            }
            fab.classList.remove('active');
        });

        // Toggle theme
        fab.querySelector('#toggle-theme-fab').addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
            fab.classList.remove('active');
        });

        // Show/hide based on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                if (currentScroll > lastScroll) {
                    fab.style.transform = 'translateY(100px)';
                } else {
                    fab.style.transform = 'translateY(0)';
                }
            }
            lastScroll = currentScroll;
        });
    }

    // Breadcrumbs
    initBreadcrumbs() {
        const mainContent = document.querySelector('main');
        if (!mainContent) return;

        const path = window.location.pathname;
        const breadcrumbs = document.createElement('nav');
        breadcrumbs.className = 'breadcrumbs';
        
        const paths = [
            { name: 'Ana Sayfa', url: '/' }
        ];

        if (path.includes('blog')) {
            paths.push({ name: 'Blog', url: '/blog.html' });
        } else if (path.includes('about')) {
            paths.push({ name: 'Hakkımda', url: '/about.html' });
        } else if (path.includes('contact')) {
            paths.push({ name: 'İletişim', url: '/contact.html' });
        }

        breadcrumbs.innerHTML = paths.map((item, index) => {
            if (index === paths.length - 1) {
                return `<span>${item.name}</span>`;
            }
            return `<a href="${item.url}">${item.name}</a> <span class="separator">›</span>`;
        }).join(' ');

        mainContent.insertBefore(breadcrumbs, mainContent.firstChild);
    }

    // Timeline
    initTimeline() {
        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection) return;

        const timeline = document.createElement('div');
        timeline.className = 'timeline';
        
        const events = [
            { date: '2024', title: 'Blog Açıldı', description: 'Kişisel blogumu açtım' },
            { date: '2023', title: 'Kodlamaya Başladım', description: 'İlk HTML/CSS projemi yaptım' },
            { date: '2022', title: 'Liseye Başladım', description: 'Yeni okul, yeni arkadaşlar' }
        ];

        events.forEach((event, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-date">${event.date}</div>
                <div class="timeline-dot"></div>
                <div class="timeline-content glass">
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                </div>
            `;
            timeline.appendChild(item);
        });

        timelineSection.appendChild(timeline);
    }

    // Music Widget
    initMusicWidget() {
        const widget = document.createElement('div');
        widget.className = 'music-widget';
        widget.innerHTML = `
            <div class="music-cover"></div>
            <div class="music-info">
                <div class="music-title">Şu An Dinleniyor</div>
                <div class="music-artist">Sanatçı - Şarkı</div>
            </div>
            <div class="music-controls">
                <button class="music-control-btn">⏮️</button>
                <button class="music-control-btn">⏸️</button>
                <button class="music-control-btn">⏭️</button>
            </div>
        `;

        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.appendChild(widget);
        }
    }

    // Weather Widget
    initWeatherWidget() {
        const widget = document.createElement('div');
        widget.className = 'weather-widget gradient-animated';
        widget.innerHTML = `
            <div class="weather-icon">☀️</div>
            <div class="weather-temp">25°C</div>
            <div class="weather-desc">Güneşli</div>
            <div class="weather-details">
                <div class="weather-detail">
                    <div class="weather-detail-label">Hissedilen</div>
                    <div class="weather-detail-value">28°C</div>
                </div>
                <div class="weather-detail">
                    <div class="weather-detail-label">Nem</div>
                    <div class="weather-detail-value">65%</div>
                </div>
                <div class="weather-detail">
                    <div class="weather-detail-label">Rüzgar</div>
                    <div class="weather-detail-value">10 km/s</div>
                </div>
            </div>
        `;

        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.appendChild(widget);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'command-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedFeatures();
});