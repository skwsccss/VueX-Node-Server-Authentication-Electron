const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './dist_electron/win-unpacked');
const OUT_DIR = path.resolve(__dirname, './windows-MSI');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    description: 'This is a IA Connection application',
    exe: 'ia_connect',
    name: 'IA-Connect',
    manufacturer: 'Vlad',
    version: '1.0.0',
    shortcutName: 'IA-Connect',
    shortcutFolderName: 'Electron',
    shortName: 'IAC',
    ui: {
        chooseDirectory: true,
    }
});

msiCreator.create().then(function () {
    msiCreator.compile();
});