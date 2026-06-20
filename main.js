const { app, BrowserWindow, powerSaveBlocker, session } = require('electron');

let mainWindow;
let powerSaveId = null;

function createWindow() {
  powerSaveId = powerSaveBlocker.start('prevent-app-suspension');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: 'SCTogether',
    backgroundColor: '#111111',
    autoHideMenuBar: true,
    webPreferences: {
      preload: __dirname + '/preload.js',
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      backgroundThrottling: false,
      autoplayPolicy: 'no-user-gesture-required',
      webSecurity: true
    }
  });

  mainWindow.loadURL('https://sctogether.fyi');
  mainWindow.webContents.setAudioMuted(false);

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (powerSaveId !== null && powerSaveBlocker.isStarted(powerSaveId)) {
      powerSaveBlocker.stop(powerSaveId);
    }
    powerSaveId = null;
  });
}

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media' || permission === 'fullscreen' || permission === 'notifications') {
      callback(true);
    } else {
      callback(false);
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
