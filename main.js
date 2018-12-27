// Electron Components
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const colors = require('colors');
const _ = require('lodash');
const fs = require('fs');
const _path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const CONFIG = require('./config.js');
// Set the path to packaged binaries
ffmpeg.setFfmpegPath('/Applications/Agora.app/Contents/Resources/app.asar.unpacked/node_modules/ffmpeg-static/bin/darwin/x64/ffmpeg');
ffmpeg.setFfprobePath('/Applications/Agora.app/Contents/Resources/app.asar.unpacked/node_modules/ffprobe-static/bin/darwin/x64/ffprobe');
// Main Window Reference
let mainWindow = null;

app.on('ready', () => {

	mainWindow = new BrowserWindow({
		width:800,
		height:600,
		webPreferences: {
			backgroundThrottling:false
		},
		//titleBarStyle:'hiddenInset'
	});

	//mainWindow.webContents.openDevTools()
	// Load root display
	mainWindow.loadURL(`http://localhost:9000`); // `file://${__dirname}/build/index.html`
	// Handle closed window
	mainWindow.on('closed', () => {
		// Dereference the window object
		mainWindow = null
	});

	const menu = Menu.buildFromTemplate([
		{
			submenu:[
				{label:'Settings'}
			]
		}, {
			label:'Files',
			submenu:[
				{label:'Add Files'},
				{label:"Clear List"},
				{label:'Convert List'}
			]
		}
	]);

	Menu.setApplicationMenu(menu);
});

/**
 * @name Get File Metadata
 * @desc Retrieves metadata for a list of files
 * @param {object} event - IPC event data
 * @param {array<string>} paths - Array of file paths
 * @note Extract file logic into seperate ffmpeg file module
 */
ipcMain.on('files:added', (event, paths) => {
	
	const promises = paths.map(path => {
		// This promise creation an it's contents
		// should be in it's own file module
		return new Promise((resolve, reject) => {
			// Validate and cleanse path
			if ('string' !== typeof path || path === '') {
				if ('string' !== typeof path) path = "ILLEGAL";
				reject("Invalid file path '"+path+"'");
			} else {
				ffmpeg.ffprobe(path, (err, { format }) => {
					if (err) {
						reject("Load file at path '"+path+"' failed!");
					} else {
						resolve({ path:format.filename, duration:format.duration });
					}
				});
			}
		});
	});

	Promise.all(promises).then(results => {
		mainWindow.webContents.send('files:meta', results);
	}).catch(error => {
		mainWindow.webContents.send('files:error', error);
	});
});

/**
 * @name Convert Files
 * @desc Iterates all files and passes to ffmpeg for conversion.
 * @param {object} event - IPC event data
 * @param {array<object>} tasks - Array of task objects
 * @note Progress percentage from ffmpeg might not be accurate / Extract file logic into seperate ffmpeg file module
 */
ipcMain.on('convert:start', (event, tasks) => {

	_.each(tasks, task => {

		const outputPath = task.output;

		ffmpeg(task.input).on('progress', ({ percent }) => {
			//console.log(progress);
			task.progress = percent;
			mainWindow.webContents.send('convert:progress', task);
		}).on('end', (stdout, stdder) => {
			mainWindow.webContents.send('convert:end', task);
		}).output(task.output).run();
	});
});

/**
 * @name Show File
 * @desc Opens the directory at file location.
 * @param {object} event - IPC event data
 * @param {string} fullPath - Full path to file
 */
ipcMain.on('file:show', (event, fullPath) => {
	if ('string' !== typeof fullPath || fullPath.length === '') return;
	shell.showItemInFolder(fullPath);
});