const ffmpegPath = require('ffmpeg-static').path;
const ffprobePath = require('ffprobe-static').path;

module.exports = {
	ffmpegPath: ffmpegPath,
	ffprobePath: ffprobePath,
	formats:['mp4','m4v','mkv','mov','ogv','avi']
}