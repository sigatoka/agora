const ffmpeg = require('fluent-ffmpeg');
// Set the path to packaged binaries
ffmpeg.setFfmpegPath('/Applications/Agora.app/Contents/Resources/app.asar.unpacked/node_modules/ffmpeg-static/bin/darwin/x64/ffmpeg');
ffmpeg.setFfprobePath('/Applications/Agora.app/Contents/Resources/app.asar.unpacked/node_modules/ffprobe-static/bin/darwin/x64/ffprobe');
// Variables
let queue = [];

function run(files) {
    queue = files;
    queue.forEach(task => {
        if (task.completed || task.percentage > 0) return;
		convertFile(task);
	});
}

function convertFile(inputPath, outputFormat, onProgress) {
    const outputPath = inputPath.replace(/\w+$/gi,outputFormat);
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath).on('progress', ({ percent }) => {
            onProgress(percent/100);
        }).on('end', (stdout, stdder) => {
            resolve(outputPath);
        }).on('error', err => {
            reject(err);
        }).output(outputPath).run();
    });
}

module.exports = {
    run,
    convertFile
}