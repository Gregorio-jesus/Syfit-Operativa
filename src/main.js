const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db/database.js'); // Importamos nuestro módulo de base de datos

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'ico.ico'),
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, 'views/login.html'));
}

ipcMain.handle('auth:login', async (event, { username, password }) => {
    try {
        const resultado = await db.validarUsuario(username, password);

        if (resultado.success) {
            return { success: true, user: resultado.user };
        } else {
            return { success: false, message: 'Usuario o contraseña incorrectos' };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error técnico: No se pudo conectar a la base de datos.'
        };
    }
});

ipcMain.on('auth:logout', (event) => {
    win.loadFile(path.join(__dirname, 'views/login.html'));

    console.log("Sesión cerrada por el usuario");
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});