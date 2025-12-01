const { ipcRenderer } = require('electron');

// Make window draggable (only the header)
const floatingTimerHeader = document.querySelector('.floating-timer-header');
let isDragging = false;

// Listen for timer updates from main window
ipcRenderer.on('timer-update', (event, data) => {
    document.getElementById('floatingTimerDisplay').textContent = data.time;

    if (data.isRunning) {
        document.getElementById('floatingTimerLabel').textContent = 'FOCUS 🎯';
    } else {
        document.getElementById('floatingTimerLabel').textContent = 'FocusFy';
    }

    // Pulse animation when running
    const display = document.getElementById('floatingTimerDisplay');
    if (data.isRunning) {
        display.style.animation = 'pulse 2s ease-in-out infinite';
    } else {
        display.style.animation = 'fadeIn 0.5s';
    }

    // Play completion sound if timer just finished
    if (data.justFinished) {
        playCompletionSound();
    }
});

// Listen for task updates from main window
ipcRenderer.on('tasks-update', (event, tasks) => {
    renderTasks(tasks);
});

// Render tasks in floating window
function renderTasks(tasks) {
    const tasksList = document.getElementById('floatingTasksList');

    if (!tasks || tasks.length === 0) {
        tasksList.innerHTML = `
      <div class="empty-state-small">
        <div class="empty-state-text-small">No tasks yet</div>
      </div>
    `;
        return;
    }

    tasksList.innerHTML = tasks.map((task, index) => `
    <div class="floating-task-item ${task.completed ? 'completed' : ''}" data-index="${index}">
      <div class="floating-task-checkbox ${task.completed ? 'checked' : ''}" data-index="${index}"></div>
      <div class="floating-task-text">${escapeHtml(task.text)}</div>
    </div>
  `).join('');

    // Add click handlers for task items
    tasksList.querySelectorAll('.floating-task-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            // Send message to main process to toggle task
            ipcRenderer.send('task-toggled', index);
        });
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Play completion sound
function playCompletionSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Play a pleasant 3-tone completion sound
        const times = [0, 0.15, 0.3];
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (major chord)

        times.forEach((time, i) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequencies[i];
            oscillator.type = 'sine';

            const startTime = audioContext.currentTime + time;
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.4);
        });

        // Visual feedback
        const display = document.getElementById('floatingTimerDisplay');
        display.style.animation = 'none';
        setTimeout(() => {
            display.style.animation = 'pulse 0.5s ease-in-out 3';
        }, 10);

        document.getElementById('floatingTimerLabel').textContent = 'COMPLETE! 🎉';

    } catch (e) {
        console.log('Audio notification not available');
    }
}

// Match theme with main window
const savedTheme = localStorage.getItem('focusfy-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update theme when storage changes
window.addEventListener('storage', (e) => {
    if (e.key === 'focusfy-theme') {
        document.documentElement.setAttribute('data-theme', e.newValue);
    }
});
