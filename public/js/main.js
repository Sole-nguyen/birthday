/**
 * Main Application Logic
 * Handles page transitions, audio controls, and interactions
 */

class BirthdayApp {
    constructor() {
        this.elements = {
            landing: document.getElementById('landing'),
            messageSection: document.getElementById('messageSection'),
            enterBtn: document.getElementById('enterBtn'),
            backBtn: document.getElementById('backBtn'),
            audioPlayer: document.getElementById('audioPlayer'),
            audioBtn: document.getElementById('audioBtn'),
            bgMusic: document.getElementById('bgMusic'),
            playIcon: document.querySelector('.audio-icon.play'),
            muteIcon: document.querySelector('.audio-icon.mute')
        };
        
        this.isPlaying = false;
        this.hasInteracted = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAudio();
        this.addEntranceAnimations();
    }
    
    setupEventListeners() {
        // Enter button - go to message section
        this.elements.enterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showMessageSection();
        });
        
        // Back button - return to landing
        this.elements.backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showLanding();
        });
        
        // Audio toggle
        this.elements.audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleAudio();
        });
        
        // First interaction to enable audio
        document.addEventListener('click', () => this.handleFirstInteraction(), { once: true });
        document.addEventListener('touchstart', () => this.handleFirstInteraction(), { once: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    setupAudio() {
        // Set volume
        this.elements.bgMusic.volume = 0.4;
        
        // Update UI on audio events
        this.elements.bgMusic.addEventListener('play', () => {
            this.isPlaying = true;
            this.updateAudioUI();
        });
        
        this.elements.bgMusic.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updateAudioUI();
        });
        
        this.elements.bgMusic.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updateAudioUI();
        });
    }
    
    handleFirstInteraction() {
        if (this.hasInteracted) return;
        this.hasInteracted = true;
        
        // Try to autoplay music on first interaction
        this.playAudio();
    }
    
    playAudio() {
        const playPromise = this.elements.bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    this.isPlaying = true;
                    this.updateAudioUI();
                })
                .catch(error => {
                    console.log('Auto-play prevented:', error);
                    this.isPlaying = false;
                    this.updateAudioUI();
                });
        }
    }
    
    toggleAudio() {
        if (this.isPlaying) {
            this.elements.bgMusic.pause();
        } else {
            this.playAudio();
        }
    }
    
    updateAudioUI() {
        if (this.isPlaying) {
            this.elements.playIcon.classList.remove('hidden');
            this.elements.muteIcon.classList.add('hidden');
            this.elements.audioPlayer.classList.remove('paused');
        } else {
            this.elements.playIcon.classList.add('hidden');
            this.elements.muteIcon.classList.remove('hidden');
            this.elements.audioPlayer.classList.add('paused');
        }
    }
    
    showMessageSection() {
        // Add exit animation to landing
        this.elements.landing.style.animation = 'fadeOutUp 0.6s ease-out forwards';
        
        setTimeout(() => {
            this.elements.landing.classList.add('hidden');
            this.elements.landing.style.display = 'none';
            
            // Show message section
            this.elements.messageSection.classList.remove('hidden');
            this.elements.messageSection.style.display = 'flex';
            this.elements.messageSection.style.animation = 'fadeInUp 0.8s ease-out';
            
            // Trigger staggered text animations
            this.animateMessageText();
        }, 500);
    }
    
    showLanding() {
        // Add exit animation to message section
        this.elements.messageSection.style.animation = 'fadeOutDown 0.6s ease-out forwards';
        
        setTimeout(() => {
            this.elements.messageSection.classList.add('hidden');
            this.elements.messageSection.style.display = 'none';
            
            // Show landing
            this.elements.landing.classList.remove('hidden');
            this.elements.landing.style.display = 'flex';
            this.elements.landing.style.animation = 'fadeInDown 0.8s ease-out';
        }, 500);
    }
    
    animateMessageText() {
        const texts = this.elements.messageSection.querySelectorAll('.message-text');
        texts.forEach((text, index) => {
            text.style.animation = 'none';
            text.offsetHeight; // Trigger reflow
            text.style.animation = `textFadeIn 0.8s ease-out ${0.2 + index * 0.2}s backwards`;
        });
    }
    
    addEntranceAnimations() {
        // Add extra entrance effects
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOutUp {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-50px);
                }
            }
            
            @keyframes fadeOutDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(50px);
                }
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleKeyboard(e) {
        switch(e.key) {
            case 'Enter':
            case ' ':
                if (!this.elements.messageSection.classList.contains('hidden')) {
                    // Already in message section
                } else {
                    this.showMessageSection();
                }
                break;
            case 'Escape':
                if (!this.elements.landing.classList.contains('hidden')) {
                    // Already in landing
                } else {
                    this.showLanding();
                }
                break;
            case 'm':
            case 'M':
                this.toggleAudio();
                break;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.birthdayApp = new BirthdayApp();
    
    // Add sparkle cursor effect
    addSparkleEffect();
});

/**
 * Sparkle Cursor Effect
 * Creates small sparkles following the cursor
 */
function addSparkleEffect() {
    let sparkles = [];
    const maxSparkles = 15;
    
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(sparkleContainer);
    
    const emojis = ['✨', '💫', '⭐', '🌟', '💕'];
    let lastX = 0, lastY = 0;
    let throttle = false;
    
    document.addEventListener('mousemove', (e) => {
        if (throttle) return;
        throttle = true;
        
        setTimeout(() => {
            throttle = false;
        }, 50);
        
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 20) return;
        
        lastX = e.clientX;
        lastY = e.clientY;
        
        createSparkle(e.clientX, e.clientY);
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 10 + 8}px;
            pointer-events: none;
            animation: sparkleAnim 1s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        sparkleContainer.appendChild(sparkle);
        sparkles.push(sparkle);
        
        // Cleanup
        setTimeout(() => {
            sparkle.remove();
            sparkles = sparkles.filter(s => s !== sparkle);
        }, 1000);
        
        // Limit sparkles
        if (sparkles.length > maxSparkles) {
            const oldest = sparkles.shift();
            oldest.remove();
        }
    }
    
    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnim {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -100%) scale(0.5) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Console Easter Egg
console.log('%c🌸 Happy Birthday Thảo Ly! 🌸', 
    'font-size: 24px; color: #ff6b9d; font-family: cursive; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
);
console.log('%cMade with ❤️', 
    'font-size: 14px; color: #c94c7a;'
);
