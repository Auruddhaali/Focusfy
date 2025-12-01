const { ipcRenderer } = require('electron');

// State
let timerState = {
    minutes: 25,
    seconds: 0,
    isRunning: false,
    interval: null,
    totalSeconds: 25 * 60,
    focusTimeToday: 0,
    pomodoroCount: 0
};

let tasks = JSON.parse(localStorage.getItem('focusfy-tasks') || '[]');

// Window controls
document.getElementById('minimizeBtn').addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
});

document.getElementById('maximizeBtn').addEventListener('click', () => {
    ipcRenderer.send('maximize-window');
});

document.getElementById('closeBtn').addEventListener('click', () => {
    ipcRenderer.send('close-window');
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
let isDark = localStorage.getItem('focusfy-theme') === 'light' ? false : true;

function updateTheme() {
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const toggle = themeToggle.querySelector('.toggle-switch');
    const icon = themeToggle.querySelector('span');
    const label = themeToggle.querySelectorAll('span')[1];

    if (isDark) {
        toggle.classList.add('active');
        icon.textContent = '🌙';
        label.textContent = 'Dark Mode';
    } else {
        toggle.classList.remove('active');
        icon.textContent = '☀️';
        label.textContent = 'Light Mode';
    }

    localStorage.setItem('focusfy-theme', isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    updateTheme();
});

updateTheme();

// Timer functions
function updateTimerDisplay(justFinished = false) {
    const display = document.getElementById('timerDisplay');
    const mins = String(timerState.minutes).padStart(2, '0');
    const secs = String(timerState.seconds).padStart(2, '0');
    display.textContent = `${mins}:${secs}`;

    // Update floating timer
    ipcRenderer.send('update-timer', {
        time: `${mins}:${secs}`,
        isRunning: timerState.isRunning,
        justFinished: justFinished
    });
}

function startTimer() {
    if (timerState.isRunning) return;

    timerState.isRunning = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'flex';
    document.getElementById('timerLabel').textContent = 'Focus time! 🎯';

    timerState.interval = setInterval(() => {
        if (timerState.seconds === 0) {
            if (timerState.minutes === 0) {
                // Timer finished
                clearInterval(timerState.interval);
                timerState.isRunning = false;
                document.getElementById('startBtn').style.display = 'flex';
                document.getElementById('pauseBtn').style.display = 'none';
                document.getElementById('timerLabel').textContent = 'Great job! Take a break 🎉';

                // Update stats
                timerState.pomodoroCount++;
                timerState.focusTimeToday += Math.floor(timerState.totalSeconds / 60);
                updateStats();

                // Play sound and notify floating window
                playNotificationSound();
                updateTimerDisplay(true);

                return;
            }
            timerState.minutes--;
            timerState.seconds = 59;
        } else {
            timerState.seconds--;
        }

        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!timerState.isRunning) return;

    clearInterval(timerState.interval);
    timerState.isRunning = false;
    document.getElementById('startBtn').style.display = 'flex';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('timerLabel').textContent = 'Paused';
}

function resetTimer() {
    clearInterval(timerState.interval);
    timerState.isRunning = false;
    timerState.minutes = Math.floor(timerState.totalSeconds / 60);
    timerState.seconds = 0;
    document.getElementById('startBtn').style.display = 'flex';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('timerLabel').textContent = 'Ready to focus?';
    updateTimerDisplay();
}

function playNotificationSound() {
    // Simple beep using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio notification not available');
    }
}

// Timer controls
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

// Pomodoro presets
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const minutes = parseInt(btn.dataset.minutes);
        timerState.totalSeconds = minutes * 60;
        resetTimer();
    });
});

// Custom time input
document.getElementById('setCustomTimeBtn').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('customHours').value) || 0;
    const minutes = parseInt(document.getElementById('customMinutes').value) || 0;

    if (hours === 0 && minutes === 0) {
        alert('Please enter a valid time (hours and/or minutes)');
        return;
    }

    if (hours > 23) {
        alert('Hours cannot exceed 23');
        return;
    }

    if (minutes > 59) {
        alert('Minutes cannot exceed 59');
        return;
    }

    const totalMinutes = (hours * 60) + minutes;
    timerState.totalSeconds = totalMinutes * 60;

    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    resetTimer();

    const hourText = hours > 0 ? `${hours}h ` : '';
    const minuteText = minutes > 0 ? `${minutes}min` : '';
    document.getElementById('timerLabel').textContent = `Custom: ${hourText}${minuteText}`;
});

// Tasks functions
function saveTasks() {
    localStorage.setItem('focusfy-tasks', JSON.stringify(tasks));
    updateStats();
    syncTasksToFloatingWindow();
}

function syncTasksToFloatingWindow() {
    ipcRenderer.send('sync-tasks', tasks);
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList');

    if (tasks.length === 0) {
        tasksList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✓</div>
        <div class="empty-state-text">No tasks yet. Add one to get started!</div>
      </div>
    `;
        return;
    }

    tasksList.innerHTML = tasks.map((task, index) => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-index="${index}">
      <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-index="${index}"></div>
      <div class="task-text">${escapeHtml(task.text)}</div>
      <button class="task-delete" data-index="${index}">🗑</button>
    </div>
  `).join('');

    tasksList.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });
    });

    tasksList.querySelectorAll('.task-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text) {
        tasks.unshift({
            text: text,
            completed: false,
            createdAt: Date.now()
        });

        input.value = '';
        saveTasks();
        renderTasks();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Stats
function updateStats() {
    const completedCount = tasks.filter(t => t.completed).length;
    document.getElementById('completedTasks').textContent = completedCount;
    document.getElementById('focusTime').textContent = `${Math.floor(timerState.focusTimeToday / 60)}h ${timerState.focusTimeToday % 60}m`;
    document.getElementById('pomodoroCount').textContent = timerState.pomodoroCount;
}

// Floating timer
let floatingTimerVisible = false;
document.getElementById('toggleFloatingTimer').addEventListener('click', () => {
    floatingTimerVisible = !floatingTimerVisible;

    if (floatingTimerVisible) {
        ipcRenderer.send('show-timer');
        document.getElementById('toggleFloatingTimer').textContent = 'Hide Floating Timer';
        setTimeout(() => syncTasksToFloatingWindow(), 100);
    } else {
        ipcRenderer.send('hide-timer');
        document.getElementById('toggleFloatingTimer').textContent = 'Show Floating Timer';
    }
});

// Initialize
renderTasks();
updateStats();
updateTimerDisplay();

// Load saved stats from today
const today = new Date().toDateString();
const savedStats = JSON.parse(localStorage.getItem('focusfy-stats') || '{}');
if (savedStats.date === today) {
    timerState.focusTimeToday = savedStats.focusTime || 0;
    timerState.pomodoroCount = savedStats.pomodoros || 0;
    updateStats();
}

// Save stats on close
window.addEventListener('beforeunload', () => {
    localStorage.setItem('focusfy-stats', JSON.stringify({
        date: new Date().toDateString(),
        focusTime: timerState.focusTimeToday,
        pomodoros: timerState.pomodoroCount
    }));
});

// Listen for task toggle from floating window
ipcRenderer.on('toggle-task', (event, index) => {
    if (tasks[index]) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
});
