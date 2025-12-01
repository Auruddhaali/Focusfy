# 🚀 How to Build FocusFy for All Platforms (Windows, macOS, Linux)

## ✅ **Setup Complete!**

I've set up automatic building for all platforms using GitHub Actions.

---

## 📋 **How to Use:**

### **Method 1: Automatic Build (Recommended)** 🌟

**Step 1: Push to GitHub**
```bash
cd "D:\Auro code\FocusFy\Focusfy"
git add .
git commit -m "Add multi-platform build support"
git tag v1.0.0
git push origin master
git push origin v1.0.0
```

**Step 2: Wait for GitHub Actions**
- Go to your GitHub repository
- Click **"Actions"** tab
- Watch the build progress (takes ~10-15 minutes)
- When done, go to **"Releases"**
- Download all 3 installers:
  - `FocusFy-Setup-1.0.0.exe` (Windows)
  - `FocusFy-1.0.0.dmg` (macOS)
  - `FocusFy-1.0.0.AppImage` (Linux)

**Step 3: Update Website**
- Copy all 3 files to `website/Focusfy---website/` folder
- Update download links in index.html

---

### **Method 2: Manual Build**

**Build Windows (on Windows):**
```bash
cd "D:\Auro code\FocusFy\Focusfy"
npm run build-installer
```
Output: `dist/FocusFy Setup 1.0.0.exe`

**Build macOS (requires Mac):**
```bash
npm run build-mac
```
Output: `dist/FocusFy-1.0.0.dmg`

**Build Linux (on Linux or WSL):**
```bash
npm run build-linux
```
Output: `dist/FocusFy-1.0.0.AppImage`

**Build All (on Mac only):**
```bash
npm run build-all
```

---

## 🎯 **For Your Friends:**

### **Windows Users:**
Download: `FocusFy-Setup-1.0.0.exe`
- Double-click to install
- Follow setup wizard

### **macOS Users:**
Download: `FocusFy-1.0.0.dmg`
- Open the DMG file
- Drag FocusFy to Applications folder
- First time: Right-click → Open (to bypass Gatekeeper)

### **Linux Users:**
Download: `FocusFy-1.0.0.AppImage`
- Make executable: `chmod +x FocusFy-1.0.0.AppImage`
- Run: `./FocusFy-1.0.0.AppImage`

---

## 📦 **What GitHub Actions Does:**

When you push a tag (like `v1.0.0`):
1. ✅ Spins up 3 virtual machines (Windows, macOS, Linux)
2. ✅ Installs Node.js and dependencies
3. ✅ Builds FocusFy for each platform
4. ✅ Creates a GitHub Release
5. ✅ Uploads all installers to the release
6. ✅ **100% FREE!**

---

## 🔄 **Releasing a New Version:**

```bash
# 1. Update version in package.json
# 2. Commit changes
git add .
git commit -m "Release v1.1.0"

# 3. Create and push tag
git tag v1.1.0
git push origin master
git push origin v1.1.0

# 4. GitHub Actions builds everything automatically!
```

---

## 📝 **Files Created:**

- `.github/workflows/build.yml` - GitHub Actions workflow
- `package.json` - Updated with macOS & Linux build configs

---

## ⚠️ **Important Notes:**

1. **GitHub Actions is FREE** for public repositories
2. **macOS builds require macOS runners** (GitHub provides them free!)
3. **Builds take 10-15 minutes** (be patient)
4. **Download links** will be: 
   - `https://github.com/YOUR_USERNAME/REPO_NAME/releases/download/v1.0.0/FocusFy-Setup-1.0.0.exe`
   - `https://github.com/YOUR_USERNAME/REPO_NAME/releases/download/v1.0.0/FocusFy-1.0.0.dmg`
   - `https://github.com/YOUR_USERNAME/REPO_NAME/releases/download/v1.0.0/FocusFy-1.0.0.AppImage`

---

## 🌐 **Update Website Links:**

After GitHub builds, update `website/index.html`:

```html
<!-- Windows -->
<a href="https://github.com/YOUR_USERNAME/FocusFy/releases/download/v1.0.0/FocusFy-Setup-1.0.0.exe" download>
    Download for Windows
</a>

<!-- macOS -->
<a href="https://github.com/YOUR_USERNAME/FocusFy/releases/download/v1.0.0/FocusFy-1.0.0.dmg" download>
    Download for macOS
</a>

<!-- Linux -->
<a href="https://github.com/YOUR_USERNAME/FocusFy/releases/download/v1.0.0/FocusFy-1.0.0.AppImage" download>
    Download for Linux
</a>
```

---

**That's it! You're all set!** 🎉

Your friends can now download FocusFy on **Windows, macOS, and Linux**!
