const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
// Set the path to packaged binaries
ffmpeg.setFfmpegPath('/Applications/Agora.app/Contents/Resources/app.asar.unpacked/node_modules/ffmpeg-static/bin/darwin/x64/ffmpeg');
ffmpeg.setFfprobePath('/Applications/Agora.app/Contents/Resources/app.asar.unpacked/node_modules/ffprobe-static/bin/darwin/x64/ffprobe');
// Defaults
const SUPPORTED_FORMATS = require('./../config').formats;

/**
 * Unique Filename
 * @desc Generates a unique filename
 * @param {String} filename - Full resource filename
 * @param {String} dir - (optional) Output directory path
 */
function makeUnique(fullPath, inFiles) {
    // Check path uniqueness
    if (!fs.existsSync(fullPath)) return fullPath;
    // Extract path components
    const components = fullPath.split(/(\/|\\)(?=[^\/\\]+\.\w+$)/gi);
    if (!inFiles) inFiles = fs.readdirSync(components[0]);
    // Scan for similar matches
    const fileMatches = inFiles.filter(file => _isSimilar(file, components[components.length-1]));
    components[components.length-1] = nextAvailable(fileMatches);
    return components.join('');
}

/**
 * Next Available Filename
 * @desc Generates the next available filename increment
 * @param {Array} allMatches Array of similar filenames
 * @version 0.1.0
 */
function nextAvailable(allMatches) {
    let count = 0;
    let result;
    allMatches.forEach(filename => {
        let match = /\_?\d*(?=\.[\w\d]+$)/gi.exec(filename);
        let num = parseInt(match[0].replace(/\D/gi,''));
        if (!isNaN(num) && num >= count) count = num;
        count++;
        result = [
            match.input.substr(0, match.index),
            '_'+count.toString(),
            match.input.substr(match.index+match[0].length, match.input.length)
        ].join('');
    });

    return result;
}

/**
 * Filename Comparitor
 * @desc Compares the similarity of two filenames irrespective of iteration number
 * @param {String} fileA First filename
 * @param {String} fileB Second filename
 */
function _isSimilar(fileA, fileB) {
    return fileA.match(/\.[\w\d\-]+$/gi)[0] === fileB.match(/\.[\w\d\-]+$/gi)[0];
    return fileA === fileB;
}

/**
 * Get Metadata
 * @desc Retreives the metadata for the specified file
 * @param {String} atPath Fullpath to media file
 * @returns {Promise} Promise of metadata or error 
 */
function getMeta(atPath) {
    // Validate arugments
    if ('string' !== typeof atPath) throw new Error("Path invalid");
    if (!isSupported(atPath)) throw new Error("Format not supported");
    if (!fs.existsSync(atPath)) throw new Error("File doesn't exist at path");
    // Construct metadata query
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(atPath, (err, { format }) => {
            if (err) {
                reject(`Failed to load metadata for file path '${atPath}'!`);
            } else {
                resolve({
                    path: format['filename'],
                    duration: parseFloat(format['duration']) * 1000,
                    size: format['size']
                });
            }
        });
    });
}

/**
 * File Supported
 * @desc Determines if the specified file path or extension is supported
 * @param {String} filePathOrExtension File extension or path including the file extension
 * @returns Test result
 */
function isSupported(filePathOrExtension) {
    // Test argument against supported formats
    const pattern = new RegExp(`(${SUPPORTED_FORMATS.join('|')})$`,'gi');
    return pattern.test(filePathOrExtension);
}

module.exports = {
    getMeta,
    makeUnique,
    nextAvailableName:nextAvailable,
    isSupported
}