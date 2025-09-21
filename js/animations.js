// Modern Animations Module
class ModernAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initParallax();
        this.initCursorEffects();
        this.initParticleBackground();
        this.initScrollAnimations();
        this.initTextAnimations();
    }

    // Parallax Scrolling
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Create parallax sections if they don't exist
        const heroSection = document.querySelector('.hero');
        if (heroSection && !heroSection.querySelector('.parallax-bg')) {
            const parallaxBg = document.createElement('div');
            parallaxBg.className = 'parallax-bg';
            parallaxBg.dataset.speed = '0.5';
            parallaxBg.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(30, 30, 40, 0.1) 100%)';
            heroSection.insertBefore(parallaxBg, heroSection.firstChild);
            heroSection.style.position = 'relative';
            heroSection.style.overflow = 'hidden';
        }
    }

    // Custom Cursor Effects
    initCursorEffects() {
        const cursor = document.createElement('div');
        const cursorDot = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth cursor animation
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'var(--accent-color)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    }

    // Particle Background
    initParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-bg';
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#8a2be2';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Connect particles with lines
        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const distance = Math.sqrt(
                        Math.pow(particles[a].x - particles[b].x, 2) +
                        Math.pow(particles[a].y - particles[b].y, 2)
                    );

                    if (distance < 100) {
                        ctx.globalAlpha = 0.1 * (1 - distance / 100);
                        ctx.strokeStyle = '#8a2be2';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            connectParticles();
            requestAnimationFrame(animate);
        }

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Mouse interaction
        let mouse = {
            x: undefined,
            y: undefined,
            radius: 150
        };

        canvas.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;

            particles.forEach(particle => {
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const forceX = (dx / distance) * force * 2;
                    const forceY = (dy / distance) * force * 2;
                    
                    particle.x += forceX;
                    particle.y += forceY;
                }
            });
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger effect for children
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        document.querySelectorAll('.card, .blog-post, .skill-item, .stat-card').forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .animate-child {
                opacity: 0;
                transform: translateX(-20px);
                transition: all 0.4s ease;
            }
            
            .animate-child.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }

    // Text Animations
    initTextAnimations() {
        // Typewriter effect for hero titles
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.visibility = 'visible';
            
            let charIndex = 0;
            const typeSpeed = 50;
            
            function type() {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typeSpeed);
                } else {
                    // Add blinking cursor
                    const cursor = document.createElement('span');
                    cursor.className = 'typewriter-cursor';
                    cursor.textContent = '|';
                    element.appendChild(cursor);
                }
            }
            
            // Start typing when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        type();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });

        // Glitch effect for special text
        const glitchElements = document.querySelectorAll('.glitch');
        
        glitchElements.forEach(element => {
            const text = element.textContent;
            element.dataset.text = text;
            
            // Create glitch layers
            const glitchBefore = document.createElement('span');
            const glitchAfter = document.createElement('span');
            glitchBefore.className = 'glitch-before';
            glitchAfter.className = 'glitch-after';
            glitchBefore.textContent = text;
            glitchAfter.textContent = text;
            
            element.appendChild(glitchBefore);
            element.appendChild(glitchAfter);
        });

        // Add glitch CSS
        const glitchStyle = document.createElement('style');
        glitchStyle.textContent = `
            .typewriter-cursor {
                animation: blink 1s infinite;
                font-weight: normal;
                color: var(--primary-color);
            }
            
            .glitch {
                position: relative;
                color: var(--text-primary);
                font-weight: bold;
            }
            
            .glitch-before,
            .glitch-after {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            
            .glitch-before {
                animation: glitch-1 0.3s infinite;
                color: #f0f;
                z-index: -1;
            }
            
            .glitch-after {
                animation: glitch-2 0.3s infinite;
                color: #0ff;
                z-index: -2;
            }
            
            @keyframes glitch-1 {
                0%, 100% {
                    clip-path: inset(0 0 0 0);
                    transform: translate(0);
                }
                20% {
                    clip-path: inset(20% 0 30% 0);
                    transform: translate(-2px, 2px);
                }
                40% {
                    clip-path: inset(50% 0 20% 0);
                    transform: translate(2px, -2px);
                }
                60% {
                    clip-path: inset(10% 0 60% 0);
                    transform: translate(-1px, 1px);
                }
            }
            
            @keyframes glitch-2 {
                0%, 100% {
                    clip-path: inset(0 0 0 0);
                    transform: translate(0);
                }
                20% {
                    clip-path: inset(60% 0 10% 0);
                    transform: translate(2px, -1px);
                }
                40% {
                    clip-path: inset(20% 0 40% 0);
                    transform: translate(-2px, 1px);
                }
                60% {
                    clip-path: inset(30% 0 30% 0);
                    transform: translate(1px, -2px);
                }
            }
        `;
        document.head.appendChild(glitchStyle);

        // Reveal text animation
        const revealElements = document.querySelectorAll('.reveal-text');
        
        revealElements.forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            element.textContent = '';
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.5s ease ${index * 0.1}s`;
                element.appendChild(span);
            });
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('span').forEach(span => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernAnimations();
});