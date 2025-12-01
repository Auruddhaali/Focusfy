const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let timerWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  mainWindow.loadFile('index.html');
  
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (timerWindow) {
      timerWindow.close();
    }
  });
}

function createTimerWindow() {
  timerWindow = new BrowserWindow({
    width: 280,
    height: 120,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  timerWindow.loadFile('timer.html');
  
  // Position in top-right corner
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  timerWindow.setPosition(width - 300, 20);

  timerWindow.on('closed', () => {
    timerWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.on('show-timer', () => {
  if (!timerWindow) {
    createTimerWindow();
  } else {
    timerWindow.show();
  }
});

ipcMain.on('hide-timer', () => {
  if (timerWindow) {
    timerWindow.hide();
  }
});

ipcMain.on('update-timer', (event, data) => {
  if (timerWindow) {
    timerWindow.webContents.send('timer-update', data);
  }
});
