// Electron Components
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
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
		titleBarStyle:'hiddenInset'
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

	const promises = files.map(({ name, path, size, type, completed, progress }) => {
		return new Promise((resolve, reject) => {
			ffmpeg.ffprobe(path, (err, { format:{ duration } }) => {
				resolve({ name, path, size, type, duration, completed, progress });
			});
		});
	});

	Promise.all(promises).then((results) => {
		mainWindow.webContents.send('files:meta', results);
	}).catch((error) => {
		console.log(error);
	});
});

ipcMain.on('convert:start', (event, files) => {

	const outputPath = __dirname+'/test.avi';

	_.each(files, (file) => {
		const { name, path, size, type, duration } = file;
		ffmpeg(path).on('progress', ({ percent }) => {
			//console.log(progress);
			mainWindow.webContents.send('convert:progress', { name, path, size, type, duration, progress:percent });
		}).on('end', (stdout, stdder) => {
			mainWindow.webContents.send('convert:end', { file, outputPath })
		}).output(outputPath).run();
	});
});

ipcMain.on('file:show', (event, outputPath) => {
	console.log("Show", outputPath)
	shell.showItemInFolder(outputPath);
});