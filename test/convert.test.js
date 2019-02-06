const { assert } = require('chai');
const { convertFile } = require('./../service/convert');
const fs = require('fs');
const path = require('path');
// Configuration
const SAMPLE_FILE = 'snippet_360p.mp4';
const OUTPUT_FORMAT = 'avi';
const SAMPLE_FILE_DIR = path.join(__dirname, 'samples');
const SAMPLE_FILE_PATH = path.join(SAMPLE_FILE_DIR, SAMPLE_FILE);

describe("Convert", () => {

    before(cleanup);
    
    it("Should convert file", () => {
        return convertFile(SAMPLE_FILE_PATH, OUTPUT_FORMAT, (progress) => {
            assert.isAbove(progress, 0, 'Progress should be greater than zero');
            assert.isBelow(progress, 1, 'Progress should be less than one');
        }).then(outputPath => {
            assert.isTrue(fs.existsSync(outputPath), `File '${outputPath}' should exist`);
        })
    }).timeout(5000);

    it("Should convert file to copy", () => {
        const expectedOutputPath = SAMPLE_FILE_PATH.replace(/\.[\w\d\-]+$/gi,'_1.'+OUTPUT_FORMAT);
        return convertFile(SAMPLE_FILE_PATH, OUTPUT_FORMAT, (progress) => {
            assert.isAbove(progress, 0, 'Progress should be greater than zero');
            assert.isBelow(progress, 1, 'Progress should be less than one');
        }).then(outputPath => {
            assert.isTrue(fs.existsSync(outputPath), `File '${outputPath}' should exist`);
            assert.equal(outputPath, expectedOutputPath, `Output path '${outputPath}' doesn't match expected '${expectedOutputPath}'`);
        })
    }).timeout(5000);

    it("Should convert file to copy", () => {
        const expectedOutputPath = SAMPLE_FILE_PATH.replace(/\.[\w\d\-]+$/gi,'_2.'+OUTPUT_FORMAT);
        return convertFile(SAMPLE_FILE_PATH, OUTPUT_FORMAT, (progress) => {
            assert.isAbove(progress, 0, 'Progress should be greater than zero');
            assert.isBelow(progress, 1, 'Progress should be less than one');
        }).then(outputPath => {
            assert.isTrue(fs.existsSync(outputPath), `File '${outputPath}' should exist`);
            assert.equal(outputPath, expectedOutputPath, `Output path '${outputPath}' doesn't match expected '${expectedOutputPath}'`);
        })
    }).timeout(5000);
});

function cleanup(callback) {
    // Get all filenames within sample directory
    fs.readdir(path.join(__dirname, 'samples'), (err, files) => {
        // Iterate and remove additional files
        files.forEach(filename => {
            if (filename === SAMPLE_FILE) return;
            fs.unlinkSync(path.join(SAMPLE_FILE_DIR, filename));
        });
        callback();
    });
}