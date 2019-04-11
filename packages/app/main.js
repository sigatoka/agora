// Electron Components
const { app, BrowserWindow, ipcMain, shell, Menu, dialog, Tray } = require('electron');
const _ = require('lodash');
const fs = require('fs');
const _path = require('path');
const CONFIG = require('./config.js');
const settings = {allowOverwrite:false,outputDir:_path.resolve(__dirname,'files')}; // Load&Save these from JSON memory store else CONFIG
const { convert, file } = require('@agora/service');
const { convertFile } = convert;
const mediaService = file;
// Main Window Reference
let mainWindow = null, trayWindow = null;

app.on('ready', () => {

	//trayWindow = new Tray(_path.join(__dirname, '/assets/icons/16x16.png'));
	
	mainWindow = new BrowserWindow({
		width:800,
		height:600,
		webPreferences: {
			backgroundThrottling:false
		},
		icon:_path.join(__dirname, '/assets/icons/64x64.png')
	});
	
	if (process.env.MODE === 'development') mainWindow.webContents.openDevTools()
	// Load primary UI
	mainWindow.loadURL((process.env.MODE === 'development') ? `http://localhost:9000` : `file://${__dirname}/build/index.html`);
	// Handle closed window
	mainWindow.on('closed', () => {
		// Dereference the window object
		mainWindow = null
	});

	const menu = Menu.buildFromTemplate([
		{
			label:app.getName(),
			submenu:[
				{
					label:'Select Files',
					click() {
						dialog.showOpenDialog({properties: ['openFile', 'multiSelections']}, addFiles);
					}
				}, {
					label:'Convert All',
					click() {
						console.log("Convert list "+app.getName());
					}
				}, {
					label:"Clear All"
				}
			]
		}
	]);

	Menu.setApplicationMenu(menu);
});

/**
 * Get File Metadata
 * @desc Retrieves metadata for a list of files
 * @param {object} event - IPC event data
 * @param {array<string>} paths - Array of file paths
 * @note Extract file logic into seperate ffmpeg file module
 */
ipcMain.on('files:added', (event, paths) => {
	// Construct a metadata query queue
	const queue = paths.map(path => mediaService.getMeta(path));
	// Execute queue and notify mainWindow
	Promise.all(queue).then(results => {
		mainWindow.webContents.send('files:meta', results);
	}).catch(error => {
		mainWindow.webContents.send('files:error', error);
	});
});

/**
 * Convert Files
 * @desc Iterates all files and passes to ffmpeg for conversion.
 * @param {object} event - IPC event data
 * @param {array<object>} queue - Array of task objects
 * @note Progress percentage from ffmpeg might not be accurate / Extract file logic into seperate ffmpeg file module
 */
ipcMain.on('convert:start', (event, queue) => {
	
	queue.forEach(task => convertFile(task.input, task.format, percent => {
		task.progress = percent * 100;
		mainWindow.webContents.send('convert:progress', task);
	}).then(outputPath => {
		task.output = outputPath;
		mainWindow.webContents.send('convert:end', task);
	}).catch(err => {
		throw new Error(err);
	}));
});

/**
 * Show File
 * @desc Opens the directory at file location.
 * @param {object} event - IPC event data
 * @param {string} fullPath - Full path to file
 */
ipcMain.on('file:show', (event, fullPath) => {
	if ('string' !== typeof fullPath || fullPath.length === '') return;
	if (!fs.existsSync(fullPath)) return;
	shell.showItemInFolder(fullPath);
});