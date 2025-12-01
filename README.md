# FocusFy 🎯

> A beautiful Windows productivity app with liquid glass effects, floating timer, and elegant task management.

![Version](https://img.shields.io/badge/version-1.0.0-purple) ![Platform](https://img.shields.io/badge/platform-Windows-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **🎨 Liquid Glass UI** - Stunning glassmorphic design with smooth animations
- **⏱️ Floating Timer** - Always-on-top timer that stays visible while you work
- **📝 Task Management** - Simple, elegant to-do list with smooth interactions
- **🍅 Pomodoro Timer** - Built-in focus sessions (25min, 15min, 5min, 1min presets)
- **🌓 Dark/Light Mode** - Beautiful themes for any preference
- **📊 Daily Statistics** - Track completed tasks, focus time, and pomodoro sessions
- **💾 Auto-Save** - Your tasks and stats are automatically saved

---

## 🚀 Installation

### For Users (Easy Way)

1. Download **`FocusFy Setup 1.0.0.exe`** from the `dist` folder
2. Run the installer
3. Follow the setup wizard
4. Launch FocusFy from your Start Menu or Desktop shortcut
5. Stay focused! 🎯

### For Developers

```bash
# Clone the repository
git clone <repository-url>
cd Focusfy

# Install dependencies
npm install

# Run the app in development mode
npm start

# Build the Windows installer
npm run build-installer
```

---

## 📖 How to Use

### Timer Controls
- **Start**: Begin your focus session
- **Pause**: Take a break without losing progress
- **Reset**: Start over with a fresh timer
- **Presets**: Quick-select 25min, 15min, 5min, or 1min timers

### Task Management
1. Type your task in the input field
2. Press **Enter** or click **Add**
3. Click the checkbox to mark a task complete
4. Hover over a task and click 🗑️ to delete it

### Floating Timer
- Click **"Show Floating Timer"** in the sidebar
- The timer window will appear in the top-right corner
- Drag it anywhere on your screen
- It stays on top of other windows so you can always see your progress

### Theme Switching
- Click the theme toggle in the sidebar
- Switch between beautiful dark and light modes
- Your preference is automatically saved

---

## 🎨 Design Philosophy

FocusFy follows the **MVP (Minimum Viable Product)** approach:

✅ **Core Value**: Help people stay focused without overwhelming features  
✅ **Clean UI**: Minimal, distraction-free interface with premium aesthetics  
✅ **User-First**: Built to gather feedback and iterate based on real usage  

The app features:
- **Liquid glass effects** with backdrop blur and frosted panels
- **Smooth animations** for every interaction
- **Vibrant gradients** (purple to pink) for visual appeal
- **Micro-interactions** that make the UI feel alive
- **Modern typography** with Inter font family

---

## 📦 Tech Stack

- **Electron** - Cross-platform desktop framework
- **HTML/CSS/JavaScript** - Core technologies
- **electron-builder** - For creating Windows installer
- **LocalStorage** - For data persistence

---

## 📁 Project Structure

```
Focusfy/
├── main.js              # Electron main process
├── renderer.js          # Main window logic
├── timer.js             # Floating timer window logic
├── index.html           # Main window UI
├── timer.html           # Floating timer UI
├── styles.css           # All styles (glass effects, animations)
├── package.json         # Dependencies and build config
├── assets/
│   └── icon.png         # App icon
└── dist/
    └── FocusFy Setup 1.0.0.exe  # Windows installer (73 MB)
```

---

## 🎯 Features Breakdown

### 1. Liquid Glass Effects
- Backdrop blur with `backdrop-filter: blur(20px)`
- Semi-transparent panels with border highlights
- Layered depth with shadows and gradients
- Smooth hover transitions

### 2. Animations
- Rotating gradient background
- Pulsing app indicator
- Slide-in task animations
- Smooth button interactions
- Micro-animations on hover/click

### 3. Custom Window Frame
- Frameless window with custom titlebar
- Minimize, maximize, and close buttons
- Draggable window area
- Custom styling to match the app theme

### 4. Data Persistence
- Tasks saved to LocalStorage
- Daily stats tracked and saved
- Theme preference persisted
- Automatic cleanup of old data

---

## 🔧 Development

### Requirements
- Node.js 16+ 
- npm or yarn
- Windows OS (for building Windows installer)

### Scripts
```bash
npm start              # Run app in development
npm run build          # Build for Windows
npm run build-installer # Create Windows installer
```

### Building for Distribution
The installer is created with **NSIS** (Nullsoft Scriptable Install System) and includes:
- Installation wizard with custom branding
- Desktop shortcut creation
- Start Menu shortcut
- Uninstaller
- Auto-updater support (future)

---

## 📊 Statistics Tracking

FocusFy automatically tracks:
- **Tasks Completed**: Number of tasks checked off today
- **Focus Time**: Total time spent in focus sessions
- **Pomodoro Count**: Number of completed pomodoro sessions

These reset daily and are stored locally on your machine.

---

## 🎁 Share with Friends

To share FocusFy with your friends:

1. Send them **`FocusFy Setup 1.0.0.exe`** from the `dist` folder
2. They run the installer on their Windows PC
3. FocusFy gets installed to their system
4. They can use it immediately!

The installer is **~73 MB** and includes everything needed to run the app.

---

## 🛠️ Future Enhancements

Based on user feedback, potential features include:
- ⚙️ Custom timer durations
- 🔔 Desktop notifications
- 📈 Extended statistics and charts
- ☁️ Cloud sync across devices
- 🎵 Focus sounds and ambience
- 🏆 Achievements and streaks
- 📅 Calendar integration
- 🔗 Task categorization

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 🤝 Contributing

FocusFy is built as an MVP to learn from real users. If you have feedback or want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 💬 Support

Having issues or questions?
- Check the code for inline comments
- Open an issue on GitHub
- Reach out to the development team

---

## 🙏 Credits

Built with ❤️ using:
- [Electron](https://www.electronjs.org/)
- [electron-builder](https://www.electron.build/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

**Stay focused. Get things done. FocusFy** 🎯
