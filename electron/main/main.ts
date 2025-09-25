import { app, BrowserWindow, Menu } from "electron";
import * as path from "node:path";
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let splash: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

function createSplash() {
  splash = new BrowserWindow({
    width: 560,
    height: 560,
    frame: false,
    transparent: false,
    resizable: false,
    alwaysOnTop: true,
    show: true,
    center: true,
    skipTaskbar: true,
    backgroundColor: "#808080",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const splashPath = path.resolve(__dirname, "../splash/index.html");
  splash.loadFile(splashPath).catch(console.error);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    show: false, // tonen na load
    backgroundColor: "#0b0b0b",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });


  // Verwijder de standaard menu bar
  Menu.setApplicationMenu(null);

  // DEV: laad Next dev server
  mainWindow.loadURL("http://localhost:3000").catch(console.error);

  // Wanneer de renderer klaar is: wacht 3 seconden, dan fade-out splash en toon main
  mainWindow.webContents.once("did-finish-load", async () => {
    // Wacht 5 seconden voordat we de splash screen sluiten
    setTimeout(async () => {
      if (splash && !splash.isDestroyed()) {
        try {
          await splash.webContents.executeJavaScript(
            "document.body.classList.add('closing');",
            true
          );
        } catch (e) {
          // noop
        }
        setTimeout(() => {
          splash?.close();
          splash = null;
          mainWindow?.show();
          mainWindow?.focus();
        }, 420); // iets langer dan CSS-transition
      } else {
        mainWindow?.show();
        mainWindow?.focus();
      }
    }, 5000); // 5 seconden wachten
  });

  // Fallback: als het te lang duurt (bv. dev-server nog niet klaar), laat main toch zien
  setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show();
      mainWindow.focus();
      if (splash && !splash.isDestroyed()) {
        splash.close();
        splash = null;
      }
    }
  }, 15000);
}

app.whenReady().then(() => {
  createSplash();
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createSplash();
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
