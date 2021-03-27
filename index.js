const { app, nativeImage, Tray, Menu, globalShortcut} = require("electron");
const path = require('path')

let icons_path = path.join(__dirname, 'icons')
let tray = undefined
let capslock = 0

app.on('ready', () => {
  createTray()

  globalShortcut.register('capslock', function() {
    updateIcon();
  });

})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  closeApp()
})

const closeApp = () => {
  app.quit()
}

const updateIcon = () => {
  if(capslock == 0) {
    tray.setImage(path.join(icons_path, 'active.png'));
    capslock = 1;
  } else {
    tray.setImage(path.join(icons_path, 'inactive.png'));
    capslock = 0;
  }
}

const createTray = () => {
  tray = new Tray(path.join(icons_path, 'inactive.png'))

  const menu = Menu.buildFromTemplate([{role: "quit"}]);
  tray.setToolTip('capslock tray');
  tray.setContextMenu(menu);
}