// Command Palette Module
class CommandPalette {
    constructor() {
        this.isOpen = false;
        this.commands = [];
        this.selectedIndex = 0;
        this.init();
    }

    init() {
        this.createPaletteHTML();
        this.registerDefaultCommands();
        this.bindEvents();
    }

    createPaletteHTML() {
        const palette = document.createElement('div');
        palette.className = 'command-palette';
        palette.innerHTML = `
            <div class="command-palette-overlay"></div>
            <div class="command-palette-modal">
                <div class="command-palette-header">
                    <input type="text" class="command-palette-input" placeholder="Komut ara veya yazmaya başla...">
                    <button class="command-palette-close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="command-palette-results"></div>
                <div class="command-palette-footer">
                    <span><kbd>↑↓</kbd> Gezin</span>
                    <span><kbd>Enter</kbd> Seç</span>
                    <span><kbd>Esc</kbd> Kapat</span>
                </div>
            </div>
        `;
        document.body.appendChild(palette);

        this.elements = {
            palette: palette,
            overlay: palette.querySelector('.command-palette-overlay'),
            modal: palette.querySelector('.command-palette-modal'),
            input: palette.querySelector('.command-palette-input'),
            results: palette.querySelector('.command-palette-results'),
            closeBtn: palette.querySelector('.command-palette-close')
        };
    }

    registerDefaultCommands() {
        // Navigasyon komutları
        this.registerCommand({
            id: 'go-home',
            title: 'Ana Sayfa',
            icon: '🏠',
            description: 'Ana sayfaya git',
            action: () => window.location.href = '/',
            keywords: ['home', 'anasayfa', 'ev']
        });

        this.registerCommand({
            id: 'go-blog',
            title: 'Blog',
            icon: '📝',
            description: 'Blog sayfasına git',
            action: () => window.location.href = '/blog.html',
            keywords: ['blog', 'yazılar', 'makaleler']
        });

        this.registerCommand({
            id: 'go-about',
            title: 'Hakkımda',
            icon: '👤',
            description: 'Hakkımda sayfasına git',
            action: () => window.location.href = '/about.html',
            keywords: ['hakkımda', 'about', 'ben']
        });

        this.registerCommand({
            id: 'go-contact',
            title: 'İletişim',
            icon: '📧',
            description: 'İletişim sayfasına git',
            action: () => window.location.href = '/contact.html',
            keywords: ['iletişim', 'contact', 'ulaş']
        });

        // Tema komutları
        this.registerCommand({
            id: 'toggle-theme',
            title: 'Temayı Değiştir',
            icon: '🎨',
            description: 'Karanlık/Aydınlık tema arasında geçiş yap',
            action: () => {
                document.body.classList.toggle('light-mode');
                localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
                this.close();
            },
            keywords: ['tema', 'theme', 'karanlık', 'aydınlık', 'dark', 'light']
        });

        // Arama komutları
        this.registerCommand({
            id: 'search-blog',
            title: 'Blog Yazılarında Ara',
            icon: '🔍',
            description: 'Blog yazılarında arama yap',
            action: () => {
                window.location.href = '/blog.html';
                setTimeout(() => {
                    document.querySelector('.search-box input')?.focus();
                }, 100);
            },
            keywords: ['ara', 'search', 'bul', 'find']
        });

        // Sosyal medya komutları
        this.registerCommand({
            id: 'open-github',
            title: 'GitHub',
            icon: '🐙',
            description: 'GitHub profilini aç',
            action: () => window.open('https://github.com', '_blank'),
            keywords: ['github', 'git', 'kod']
        });

        this.registerCommand({
            id: 'open-twitter',
            title: 'Twitter',
            icon: '🐦',
            description: 'Twitter profilini aç',
            action: () => window.open('https://twitter.com', '_blank'),
            keywords: ['twitter', 'tweet', 'x']
        });

        this.registerCommand({
            id: 'open-linkedin',
            title: 'LinkedIn',
            icon: '💼',
            description: 'LinkedIn profilini aç',
            action: () => window.open('https://linkedin.com', '_blank'),
            keywords: ['linkedin', 'iş', 'kariyer']
        });

        // Özel komutlar
        this.registerCommand({
            id: 'copy-email',
            title: 'E-posta Adresini Kopyala',
            icon: '📋',
            description: 'E-posta adresini panoya kopyala',
            action: () => {
                navigator.clipboard.writeText('email@example.com');
                this.showNotification('E-posta adresi kopyalandı!');
                this.close();
            },
            keywords: ['kopyala', 'copy', 'email', 'eposta']
        });

        this.registerCommand({
            id: 'share-page',
            title: 'Sayfayı Paylaş',
            icon: '🔗',
            description: 'Bu sayfayı paylaş',
            action: () => {
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        url: window.location.href
                    });
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    this.showNotification('Sayfa linki kopyalandı!');
                }
                this.close();
            },
            keywords: ['paylaş', 'share', 'link']
        });

        this.registerCommand({
            id: 'print-page',
            title: 'Sayfayı Yazdır',
            icon: '🖨️',
            description: 'Bu sayfayı yazdır',
            action: () => {
                window.print();
                this.close();
            },
            keywords: ['yazdır', 'print']
        });

        // Terminal modu
        this.registerCommand({
            id: 'terminal-mode',
            title: 'Terminal Modu',
            icon: '💻',
            description: 'Terminal modunu aç/kapat',
            action: () => {
                document.body.classList.toggle('terminal-mode');
                this.close();
            },
            keywords: ['terminal', 'konsol', 'cmd']
        });

        // Easter egg
        this.registerCommand({
            id: 'matrix',
            title: 'Matrix Efekti',
            icon: '🟢',
            description: 'Matrix yağmuru efektini başlat',
            action: () => {
                this.startMatrixRain();
                this.close();
            },
            keywords: ['matrix', 'easter', 'egg']
        });
    }

    registerCommand(command) {
        this.commands.push(command);
    }

    bindEvents() {
        // Cmd+K veya Ctrl+K ile açma
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            if (this.isOpen) {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateResults(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateResults(-1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeSelected();
                }
            }
        });

        // Input değişikliği
        this.elements.input.addEventListener('input', () => {
            this.filterCommands();
        });

        // Overlay tıklama
        this.elements.overlay.addEventListener('click', () => {
            this.close();
        });

        // Kapatma butonu
        this.elements.closeBtn.addEventListener('click', () => {
            this.close();
        });
    }

    filterCommands() {
        const query = this.elements.input.value.toLowerCase();
        const filtered = this.commands.filter(cmd => {
            const searchText = `${cmd.title} ${cmd.description} ${cmd.keywords?.join(' ')}`.toLowerCase();
            return searchText.includes(query);
        });

        this.renderResults(filtered);
        this.selectedIndex = 0;
        this.updateSelection();
    }

    renderResults(commands) {
        if (commands.length === 0) {
            this.elements.results.innerHTML = `
                <div class="command-palette-empty">
                    <p>Komut bulunamadı</p>
                </div>
            `;
            return;
        }

        this.elements.results.innerHTML = commands.map((cmd, index) => `
            <div class="command-palette-item ${index === 0 ? 'selected' : ''}" data-index="${index}" data-id="${cmd.id}">
                <span class="command-icon">${cmd.icon}</span>
                <div class="command-content">
                    <div class="command-title">${cmd.title}</div>
                    <div class="command-description">${cmd.description}</div>
                </div>
                <span class="command-shortcut">⏎</span>
            </div>
        `).join('');

        // Click event
        this.elements.results.querySelectorAll('.command-palette-item').forEach(item => {
            item.addEventListener('click', () => {
                const cmdId = item.dataset.id;
                const command = this.commands.find(c => c.id === cmdId);
                if (command) {
                    command.action();
                }
            });
        });
    }

    navigateResults(direction) {
        const items = this.elements.results.querySelectorAll('.command-palette-item');
        if (items.length === 0) return;

        this.selectedIndex = Math.max(0, Math.min(items.length - 1, this.selectedIndex + direction));
        this.updateSelection();
    }

    updateSelection() {
        const items = this.elements.results.querySelectorAll('.command-palette-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    executeSelected() {
        const selectedItem = this.elements.results.querySelector('.command-palette-item.selected');
        if (selectedItem) {
            const cmdId = selectedItem.dataset.id;
            const command = this.commands.find(c => c.id === cmdId);
            if (command) {
                command.action();
            }
        }
    }

    open() {
        this.isOpen = true;
        this.elements.palette.classList.add('active');
        this.elements.input.value = '';
        this.elements.input.focus();
        this.filterCommands();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.elements.palette.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
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

    startMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-rain';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        let matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 35);
        
        setTimeout(() => {
            clearInterval(matrixInterval);
            canvas.remove();
        }, 10000);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.commandPalette = new CommandPalette();
});