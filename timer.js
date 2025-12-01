const { ipcRenderer } = require('electron');

// Make window draggable
const floatingTimer = document.getElementById('floatingTimer');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;

floatingTimer.addEventListener('mousedown', (e) => {
    isDragging = true;
    initialX = e.clientX;
    initialY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        currentX = e.screenX - initialX;
        currentY = e.screenY - initialY;

        const { getCurrentWindow } = require('electron').remote || require('@electron/remote');
        const win = getCurrentWindow();
        win.setPosition(currentX, currentY);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Listen for timer updates from main window
ipcRenderer.on('timer-update', (event, data) => {
    document.getElementById('floatingTimerDisplay').textContent = data.time;
    document.getElementById('floatingTimerLabel').textContent = data.isRunning ? 'FOCUS 🎯' : 'FocusFy';

    // Pulse animation when running
    const display = document.getElementById('floatingTimerDisplay');
    if (data.isRunning) {
        display.style.animation = 'pulse 2s ease-in-out infinite';
    } else {
        display.style.animation = 'none';
    }
});

// Match theme with main window
const savedTheme = localStorage.getItem('focusfy-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
