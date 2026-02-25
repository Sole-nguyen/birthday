/**
 * Petal Animation System
 * Creates falling cherry blossom petals using Canvas API
 */

class PetalSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.petals = [];
        this.petalCount = 50;
        this.isRunning = true;
        
        this.colors = [
            'rgba(255, 182, 193, 0.8)',  // Light pink
            'rgba(255, 192, 203, 0.8)',  // Pink
            'rgba(255, 105, 180, 0.7)',  // Hot pink
            'rgba(255, 228, 225, 0.8)',  // Misty rose
            'rgba(255, 240, 245, 0.9)',  // Lavender blush
            'rgba(255, 160, 180, 0.8)',  // Rose
        ];
        
        this.init();
        this.createPetals();
        this.animate();
        
        window.addEventListener('resize', () => this.handleResize());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createPetal() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 15 + 8,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 + 1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
            oscillationSpeed: Math.random() * 0.02 + 0.01,
            oscillationDistance: Math.random() * 40 + 20,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            opacity: Math.random() * 0.5 + 0.5,
            time: Math.random() * 100,
            type: Math.floor(Math.random() * 3) // 0: round, 1: heart, 2: cherry blossom
        };
    }
    
    createPetals() {
        for (let i = 0; i < this.petalCount; i++) {
            const petal = this.createPetal();
            petal.y = Math.random() * this.canvas.height;
            this.petals.push(petal);
        }
    }
    
    drawPetal(petal) {
        this.ctx.save();
        this.ctx.translate(petal.x, petal.y);
        this.ctx.rotate(petal.rotation);
        this.ctx.globalAlpha = petal.opacity;
        
        switch(petal.type) {
            case 0:
                this.drawRoundPetal(petal);
                break;
            case 1:
                this.drawHeartPetal(petal);
                break;
            case 2:
                this.drawCherryBlossomPetal(petal);
                break;
        }
        
        this.ctx.restore();
    }
    
    drawRoundPetal(petal) {
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, petal.size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.5, petal.color);
        gradient.addColorStop(1, 'rgba(255, 182, 193, 0.3)');
        
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawHeartPetal(petal) {
        const size = petal.size * 0.8;
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, size * 0.3);
        this.ctx.bezierCurveTo(
            size * 0.5, -size * 0.3,
            size, size * 0.3,
            0, size
        );
        this.ctx.bezierCurveTo(
            -size, size * 0.3,
            -size * 0.5, -size * 0.3,
            0, size * 0.3
        );
        
        const gradient = this.ctx.createRadialGradient(0, size * 0.3, 0, 0, size * 0.3, size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.5, petal.color);
        gradient.addColorStop(1, 'rgba(255, 105, 180, 0.4)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawCherryBlossomPetal(petal) {
        const size = petal.size;
        const petalCount = 5;
        
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            
            this.ctx.save();
            this.ctx.rotate(angle);
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.quadraticCurveTo(size * 0.5, -size * 0.3, size * 0.8, 0);
            this.ctx.quadraticCurveTo(size * 0.5, size * 0.3, 0, 0);
            
            const gradient = this.ctx.createLinearGradient(0, 0, size, 0);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(0.7, petal.color);
            gradient.addColorStop(1, 'rgba(255, 182, 193, 0.5)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.restore();
        }
        
        // Center
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
        this.ctx.fill();
    }
    
    updatePetal(petal) {
        petal.time += petal.oscillationSpeed;
        
        // Oscillating horizontal movement (wind effect)
        petal.x += petal.speedX + Math.sin(petal.time) * 0.5;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;
        
        // Reset when out of screen
        if (petal.y > this.canvas.height + 50) {
            petal.y = -50;
            petal.x = Math.random() * this.canvas.width;
        }
        
        if (petal.x > this.canvas.width + 50) {
            petal.x = -50;
        } else if (petal.x < -50) {
            petal.x = this.canvas.width + 50;
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.petals.forEach(petal => {
            this.updatePetal(petal);
            this.drawPetal(petal);
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    pause() {
        this.isRunning = false;
    }
    
    resume() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
}

/**
 * Bloom Effect System
 * Creates flower bloom animation on click
 */

class BloomSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.blooms = [];
        
        this.colors = [
            ['#ff6b9d', '#ff8fab', '#ffc2d1'],
            ['#ff4d6d', '#ff758f', '#ffb3c1'],
            ['#c94c7a', '#e56b91', '#f4a7b9'],
            ['#ffafcc', '#ffc8dd', '#ffe5ec'],
            ['#ff85a1', '#fbb1bd', '#f9dde0'],
        ];
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    setupEventListeners() {
        // Make canvas clickable
        this.canvas.style.pointerEvents = 'auto';
        this.canvas.style.cursor = 'pointer';
        
        document.addEventListener('click', (e) => {
            // Don't bloom on buttons or audio player
            if (e.target.closest('button') || e.target.closest('.audio-player')) {
                return;
            }
            this.createBloom(e.clientX, e.clientY);
        });
        
        // Touch support
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('button') || e.target.closest('.audio-player')) {
                return;
            }
            const touch = e.touches[0];
            this.createBloom(touch.clientX, touch.clientY);
        });
    }
    
    createBloom(x, y) {
        const colorSet = this.colors[Math.floor(Math.random() * this.colors.length)];
        const petalCount = Math.floor(Math.random() * 4) + 5; // 5-8 petals
        
        const bloom = {
            x,
            y,
            petals: [],
            particles: [],
            progress: 0,
            maxProgress: 1,
            speed: 0.02,
            colorSet,
            petalCount,
            size: Math.random() * 30 + 40,
            rotation: Math.random() * Math.PI * 2,
            complete: false
        };
        
        // Create petals
        for (let i = 0; i < petalCount; i++) {
            bloom.petals.push({
                angle: (i / petalCount) * Math.PI * 2,
                length: bloom.size * (0.8 + Math.random() * 0.4),
                width: bloom.size * 0.4,
                delay: Math.random() * 0.2,
                wobble: Math.random() * 0.3
            });
        }
        
        // Create sparkle particles
        for (let i = 0; i < 12; i++) {
            bloom.particles.push({
                angle: (i / 12) * Math.PI * 2,
                distance: 0,
                maxDistance: bloom.size * 1.5 + Math.random() * 20,
                size: Math.random() * 4 + 2,
                opacity: 1,
                speed: Math.random() * 0.5 + 0.5
            });
        }
        
        this.blooms.push(bloom);
    }
    
    drawBloom(bloom) {
        const ctx = this.ctx;
        const progress = bloom.progress;
        
        ctx.save();
        ctx.translate(bloom.x, bloom.y);
        ctx.rotate(bloom.rotation);
        
        // Draw petals
        bloom.petals.forEach((petal, i) => {
            const petalProgress = Math.max(0, Math.min(1, (progress - petal.delay) / (1 - petal.delay)));
            
            if (petalProgress <= 0) return;
            
            const easeProgress = this.easeOutBack(petalProgress);
            const currentLength = petal.length * easeProgress;
            const currentWidth = petal.width * easeProgress;
            
            ctx.save();
            ctx.rotate(petal.angle);
            
            // Petal gradient
            const gradient = ctx.createRadialGradient(
                currentLength * 0.5, 0, 0,
                currentLength * 0.5, 0, currentLength * 0.8
            );
            gradient.addColorStop(0, bloom.colorSet[0]);
            gradient.addColorStop(0.5, bloom.colorSet[1]);
            gradient.addColorStop(1, bloom.colorSet[2]);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(
                currentLength * 0.5, -currentWidth * 0.5,
                currentLength, 0
            );
            ctx.quadraticCurveTo(
                currentLength * 0.5, currentWidth * 0.5,
                0, 0
            );
            
            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            
            // Petal highlight
            ctx.beginPath();
            ctx.moveTo(currentLength * 0.2, 0);
            ctx.quadraticCurveTo(
                currentLength * 0.5, -currentWidth * 0.2,
                currentLength * 0.7, 0
            );
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.restore();
        });
        
        // Draw center
        if (progress > 0.3) {
            const centerProgress = Math.min(1, (progress - 0.3) / 0.7);
            const centerSize = bloom.size * 0.2 * this.easeOutBack(centerProgress);
            
            const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, centerSize);
            centerGradient.addColorStop(0, '#fff9c4');
            centerGradient.addColorStop(0.5, '#ffd54f');
            centerGradient.addColorStop(1, '#ffb300');
            
            ctx.beginPath();
            ctx.arc(0, 0, centerSize, 0, Math.PI * 2);
            ctx.fillStyle = centerGradient;
            ctx.globalAlpha = 1;
            ctx.fill();
            
            // Center details
            const dotCount = 6;
            for (let i = 0; i < dotCount; i++) {
                const angle = (i / dotCount) * Math.PI * 2;
                const dotX = Math.cos(angle) * centerSize * 0.6;
                const dotY = Math.sin(angle) * centerSize * 0.6;
                
                ctx.beginPath();
                ctx.arc(dotX, dotY, 2 * centerProgress, 0, Math.PI * 2);
                ctx.fillStyle = '#ff6f00';
                ctx.fill();
            }
        }
        
        ctx.restore();
        
        // Draw particles
        bloom.particles.forEach(particle => {
            if (progress < 0.5) return;
            
            const particleProgress = (progress - 0.5) / 0.5;
            const distance = particle.maxDistance * particleProgress * particle.speed;
            const opacity = 1 - particleProgress;
            
            const px = bloom.x + Math.cos(particle.angle) * distance;
            const py = bloom.y + Math.sin(particle.angle) * distance;
            
            ctx.beginPath();
            ctx.arc(px, py, particle.size * (1 - particleProgress * 0.5), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
            
            // Sparkle effect
            ctx.beginPath();
            ctx.moveTo(px - particle.size * 2, py);
            ctx.lineTo(px + particle.size * 2, py);
            ctx.moveTo(px, py - particle.size * 2);
            ctx.lineTo(px, py + particle.size * 2);
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }
    
    easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }
    
    update() {
        this.blooms = this.blooms.filter(bloom => {
            bloom.progress += bloom.speed;
            
            if (bloom.progress >= 1.5) {
                return false;
            }
            return true;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.update();
        this.blooms.forEach(bloom => this.drawBloom(bloom));
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.petalSystem = new PetalSystem('petalCanvas');
    window.bloomSystem = new BloomSystem('bloomCanvas');
});
