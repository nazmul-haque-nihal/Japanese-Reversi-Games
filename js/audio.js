/**
 * Reversi Game - Audio Manager
 */

class AudioManager {
    constructor() {
        this.sounds = {};
        this.isMuted = false;
        this.volume = 0.5;
        this.audioContext = null;
        this.enabled = this.isAudioSupported();
        
        // Load sounds
        if (this.enabled) {
            this.loadSounds();
        }
    }

    isAudioSupported() {
        return 'AudioContext' in window || 'webkitAudioContext' in window;
    }

    loadSounds() {
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Initialize sound library
            this.sounds = {
                'move': this.createMoveSound(),
                'invalid': this.createInvalidMoveSound(),
                'newgame': this.createNewGameSound(),
                'undo': this.createUndoSound(),
                'redo': this.createRedoSound(),
                'skip': this.createSkipSound(),
                'gameover': this.createGameOverSound()
            };
            
            console.log('Audio manager initialized');
        } catch (error) {
            console.error('Failed to initialize audio manager:', error);
            this.enabled = false;
        }
    }

    createMoveSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const time = i / this.audioContext.sampleRate;
            const frequency = 440 * Math.exp(-time * 5);
            data[i] = Math.sin(2 * Math.PI * frequency * time) * Math.exp(-time * 3);
        }
        
        return buffer;
    }

    createInvalidMoveSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.2, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const time = i / this.audioContext.sampleRate;
            const frequency = 150 + 100 * Math.sin(time * 40);
            data[i] = (Math.random() * 2 - 1) * Math.exp(-time * 2);
        }
        
        return buffer;
    }

    createNewGameSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.3, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const time = i / this.audioContext.sampleRate;
            const frequency = 200 + 400 * time;
            data[i] = Math.sin(2 * Math.PI * frequency * time) * Math.exp(-time * 2);
        }
        
        return buffer;
    }

    createUndoSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.15, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const time = i / this.audioContext.sampleRate;
            const frequency = 300 - 100 * time;
            data[i] = Math.sin(2 * Math.PI * frequency * time) * Math.exp(-time * 4);
        }
        
        return buffer;
    }

    createRedoSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.15, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const time = i / this.audioContext.sampleRate;
            const frequency = 200 + 200 * time;
            data[i] = Math.sin(2 * Math.PI * frequency * time) * Math.exp(-time * 4);
        }
        
        return buffer;
    }

    createSkipSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.2, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const time = i / this.audioContext.sampleRate;
            const frequency = 250 + 150 * Math.sin(time * 20);
            data[i] = Math.sin(2 * Math.PI * frequency * time) * Math.exp(-time * 2);
        }
        
        return buffer;
    }

    createGameOverSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.5, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const time = i / this.audioContext.sampleRate;
            const frequency = 300 * Math.exp(-time * 2);
            data[i] = Math.sin(2 * Math.PI * frequency * time) * Math.exp(-time * 1.5);
        }
        
        return buffer;
    }

    playSound(soundName) {
        if (!this.enabled || this.isMuted) {
            return;
        }
        
        if (!this.sounds[soundName]) {
            console.warn(`Sound "${soundName}" not found`);
            return;
        }
        
        try {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.sounds[soundName];
            
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.volume;
            
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            source.start();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }

    setVolume(volume) {
        if (volume < 0) volume = 0;
        if (volume > 1) volume = 1;
        this.volume = volume;
        localStorage.setItem('audioVolume', volume);
    }

    getVolume() {
        return this.volume;
    }

    mute() {
        this.isMuted = true;
        localStorage.setItem('audioMuted', 'true');
    }

    unmute() {
        this.isMuted = false;
        localStorage.setItem('audioMuted', 'false');
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('audioMuted', this.isMuted ? 'true' : 'false');
        return this.isMuted;
    }

    getMuted() {
        return this.isMuted;
    }

    loadPreferences() {
        const savedVolume = localStorage.getItem('audioVolume');
        if (savedVolume !== null) {
            this.setVolume(parseFloat(savedVolume));
        }
        
        const savedMuted = localStorage.getItem('audioMuted');
        if (savedMuted === 'true') {
            this.mute();
        }
    }

    // Background music (if added)
    playBackgroundMusic() {
        // This would handle background music if we add it
        // For now, it's a placeholder
    }

    stopBackgroundMusic() {
        // Placeholder for stopping background music
    }
}

// Initialize audio manager when DOM is ready
let audioManager;
document.addEventListener('DOMContentLoaded', () => {
    audioManager = new AudioManager();
    window.audioManager = audioManager;
    
    // Load saved preferences
    audioManager.loadPreferences();
});

// Handle browser audio policy
document.addEventListener('click', () => {
    if (audioManager && audioManager.enabled && !audioManager.audioContext) {
        audioManager.loadSounds();
    }
}, { once: true });
