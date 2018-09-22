// Electron Components
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const colors = require('colors');
const _ = require('lodash');
const ffmpeg = require('fluent-ffmpeg');
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

	mainWindow.webContents.openDevTools()
	// Load root display
	mainWindow.loadURL(`file://${__dirname}/public/index.html`);
	// Handle closed window
	mainWindow.on('closed', () => {
		// Dereference the window object
		mainWindow = null
	});

	const menu = Menu.buildFromTemplate([
		{
			label:'Files',
			submenu:[
				{label:'Select'},
				{label:'Convert'},
				{label:'Settings'}
			]
		}
	]);

	Menu.setApplicationMenu(menu);
});

ipcMain.on('files:added', (event, files) => {

	const promises = files.map(({ hash, label, name, path, directory, size, type, format, output, completed, progress }) => {
		return new Promise((resolve, reject) => {
			ffmpeg.ffprobe(path, (err, { format:{ duration } }) => {
				resolve({ hash, label, name, path, directory, size, type, format, output, duration, completed, progress });
			});
		});
	});

	Promise.all(promises).then((results) => {
		mainWindow.webContents.send('files:meta', results);
	}).catch((error) => {
		console.log(colors.red(error));
	});
});

ipcMain.on('convert:start', (event, files) => {

	_.each(files, (file) => {

		const { hash, label, name, path, directory, size, type, format, output, duration } = file;
		const outputPath = file.directory + name.replace(format, output);

		ffmpeg(path).on('progress', ({ percent }) => {
			//console.log(progress);
			mainWindow.webContents.send('convert:progress', { hash, label, name, path, directory, size, type, format, output, duration, progress:percent });
		}).on('end', (stdout, stdder) => {
			mainWindow.webContents.send('convert:end', { file, outputPath })
		}).output(outputPath).run();
	});
});

ipcMain.on('file:show', (event, outputPath) => {
	shell.showItemInFolder(outputPath);
});