document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // DOM Elements
    // -------------------------------------------------------------
    const waxSeal = document.getElementById('wax-seal');
    const envelope = document.getElementById('envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const letterScreen = document.getElementById('letter-screen');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');

    // Set background audio volume to be soft and emotional
    bgMusic.volume = 0.35;

    // -------------------------------------------------------------
    // Envelope Opening Interaction
    // -------------------------------------------------------------
    waxSeal.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent duplicate triggers
        
        // Step 1: Trigger envelope open animations
        envelope.classList.add('opening');
        
        // Step 2: Play music on interaction (bypasses browser autoplay policy)
        playMusic();

        // Step 3: Wait for letter rise animation, then swap screens
        setTimeout(() => {
            envelopeScreen.style.opacity = '0';
            envelopeScreen.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                envelopeScreen.classList.remove('active');
                letterScreen.classList.add('active');
                
                // Trigger smooth scroll reveal animation for children inside letter card
                const elementsToAnimate = document.querySelectorAll('.letter-card > *, .advice-card, .polaroid');
                elementsToAnimate.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(15px)';
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 200 * index);
                });
            }, 800);
        }, 1200);
    });

    // -------------------------------------------------------------
    // Music Player Controls
    // -------------------------------------------------------------
    let isMusicPlaying = false;

    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
        }).catch(err => {
            console.log("Audio autoplay prevented or failed: ", err);
        });
    }

    function pauseMusic() {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
    }

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // -------------------------------------------------------------
    // Dreamy Canvas Particles Effect
    // -------------------------------------------------------------
    let particles = [];
    const particleCount = 45;

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
            // Start at random heights for initial spread
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 50;
            this.radius = Math.random() * 2.5 + 0.5;
            this.speed = Math.random() * 0.4 + 0.2;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.maxAlpha = this.alpha;
            this.angle = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.005;
            this.wobbleRange = Math.random() * 0.8 + 0.2;
        }

        update() {
            this.y -= this.speed;
            this.angle += this.wobbleSpeed;
            this.x += Math.sin(this.angle) * this.wobbleRange;

            // Fade out as it rises near the top
            if (this.y < canvas.height * 0.2) {
                this.alpha -= 0.005;
            }

            // Reset if out of bounds or invisible
            if (this.y < -10 || this.alpha <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Dreamy golden-white glow gradient
            const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
            grad.addColorStop(0.3, `rgba(223, 186, 107, ${this.alpha * 0.8})`);
            grad.addColorStop(1, 'rgba(223, 186, 107, 0)');
            
            ctx.fillStyle = grad;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(223, 186, 107, 0.4)';
            ctx.fill();
            
            // Reset shadow fields for performance
            ctx.shadowBlur = 0;
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
});
