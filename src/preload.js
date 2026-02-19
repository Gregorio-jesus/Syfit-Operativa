const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
    logout: () => ipcRenderer.send('auth:logout'),
    getUserInfo: () => ipcRenderer.invoke('get-user-info'),
});