// Electron Components
const { app, BrowserWindow, ipcMain, shell, Menu, dialog } = require('electron');
const _ = require('lodash');
const fs = require('fs');
const _path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const CONFIG = require('./config.js');
const settings = {allowOverwrite:false,outputDir:_path.resolve(__dirname,'files')}; // Load&Save these from JSON memory store else CONFIG
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
		}
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

function addFiles(paths) {

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
}

/**
 * Get File Metadata
 * @desc Retrieves metadata for a list of files
 * @param {object} event - IPC event data
 * @param {array<string>} paths - Array of file paths
 * @note Extract file logic into seperate ffmpeg file module
 */
ipcMain.on('files:added', (event, paths) => addFiles(paths));

/**
 * Convert Files
 * @desc Iterates all files and passes to ffmpeg for conversion.
 * @param {object} event - IPC event data
 * @param {array<object>} tasks - Array of task objects
 * @note Progress percentage from ffmpeg might not be accurate / Extract file logic into seperate ffmpeg file module
 */
ipcMain.on('convert:start', (event, tasks) => {

	_.each(tasks, task => {
		
		const filename = `${task.name}.${task.format}`;
		const basePath = task.output.replace(filename,'');

		if (!settings.allowOverwrite && !isFilenameAvailable(filename, basePath)) {
			task.output = _path.resolve(basePath, uniqueFilename(filename, basePath));
			console.log(task.output);
		}

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
 * Unique Filename
 * @desc Generates a unique filename
 * @param {string} fileName - Full resource filename
 * @param {string} dir - (optional) Output directory path
 */
function uniqueFilename(fileName, dir) {

	const components = fileName.split(/\.(?=[\w\d]+$)/gi);
	const baseName = components[0];
	const extension = components[1];
	const outputDir = dir || settings.outputDir;
	// Find all similar filenames
	const copyNumber = fs.readdirSync(outputDir).filter(filename => {
		const pattern = new RegExp(`${rootFileName(baseName)}(\_[0-9]+)?\.${extension}$`,'gi');
		return pattern.test(filename);
	})
	// Find filename copy number
	.map(filename => parseInt((/[\_\-\#]([0-9]+)\./gi.exec(filename)||[])[1]||0))
	// Sort ascending
	.sort((current, next) => current-next)
	// Resolve unique copy number
	.reduce((proposed, current) => {
		if (proposed != current) return proposed;
		return proposed + 1;
	}, 0);

	if (copyNumber === 0) return fileName;
	return baseName + '_00' + copyNumber + '.' + extension;
}

/**
 * Root Filename
 * @desc Removes filename copy numbers from filename
 * @param {string} filename - Filename to cleanse
 */
function rootFileName(fileName) {
	return fileName.replace(/[\_\-\#][0-9]*$/gi,'');
}

/**
 * Is Filename Available
 * @desc Compares filenames with the specified directory
 * @param {string} filename - Filename to compare
 * @param {string} dir - Directory to scan
 */
function isFilenameAvailable(filename, dir) {
	return fs.readdirSync(dir).indexOf(filename) < 0;
}

/**
 * Show File
 * @desc Opens the directory at file location.
 * @param {object} event - IPC event data
 * @param {string} fullPath - Full path to file
 */
ipcMain.on('file:show', (event, fullPath) => {
	if ('string' !== typeof fullPath || fullPath.length === '') return;
	shell.showItemInFolder(fullPath);
});