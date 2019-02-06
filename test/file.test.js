const { assert } = require('chai');
const path = require('path');
const fs = require('fs');
// Functions
const {
    getMeta,
    makeUnique,
    isSupported
} = require('./../service/file');
// Configuration
const SAMPLE_FILE = 'snippet_360p.mp4';
const OUTPUT_FORMAT = 'avi';
const SAMPLE_FILE_DIR = path.join(__dirname, 'samples');
const SAMPLE_FILE_PATH = path.join(SAMPLE_FILE_DIR, SAMPLE_FILE);

describe.only("Files", () => {

    context("Metadata", () => {

        it("Should fail when filename invalid", () => {
            const callInvalid = () => { getMeta(32432) };
            assert.throws(callInvalid, /invalid/gi, "File path must be of type 'String'");
        });

        it("Should fail when file extension unsupported", () => {
            const callUnsupported = () => { getMeta(path.join(SAMPLE_FILE_DIR,SAMPLE_FILE.replace(/\w+$/gi,'ext'))) };
            assert.throws(callUnsupported, /support/gi, "Format 'ext' not supported");
        });

        it("Should fail when file doesn't exist", () => {
            const callMissing = () => { getMeta(path.join(SAMPLE_FILE_DIR,'MiSSiNg.mp4')) };
            assert.throws(callMissing, /exist/gi);
        });

        it("Should retreive valid file metadata", async () => {
            const meta = await getMeta(SAMPLE_FILE_PATH);
            assert.isOk(meta, "Metadata should be returned");
            assert.isObject(meta, "Metadata should be an object");
            assert.equal(meta.path, SAMPLE_FILE_PATH, `Metadata path '${meta.path}' doesn't match sample path '${SAMPLE_FILE_PATH}'`);
            assert.isAbove(meta.duration, 0, "Duration should be greater than zero");
        });
    });

    context("Filename", () => {

        const allFiles = fs.readdirSync(SAMPLE_FILE_DIR);

        it("Should validate supported files", () => {
            const unsupportedFile = 'file.unsupported';
            assert.isFalse(isSupported(path.join(SAMPLE_FILE_DIR,unsupportedFile)), `File '${unsupportedFile}' should be unsupported`);
            assert.isTrue(isSupported(OUTPUT_FORMAT), `Output format '${OUTPUT_FORMAT}' should be supported`)
            assert.isTrue(isSupported(SAMPLE_FILE_PATH), `Sample file '${SAMPLE_FILE_PATH}' should be supported`);
        });

        it("Should return input filename when unique", () => {
            const uniqueFilePath = path.join(SAMPLE_FILE_DIR, 'unique.ext');
            const outputPath = makeUnique(uniqueFilePath);
            assert.isOk(outputPath, "Should return a value");
            assert.isString(outputPath, "Output path should be of type 'string'");
            assert.equal(outputPath, uniqueFilePath, `Output path '${outputPath}' should match input path '${uniqueFilePath}'.`);
        });

        it("Should generate a unique filename", () => {
            const randomFilePath = path.join(SAMPLE_FILE_DIR, allFiles[allFiles.length-1]);
            const outputPath = makeUnique(randomFilePath, fs.readdirSync(SAMPLE_FILE_DIR));
            assert.isOk(outputPath, "Should return a value");
            assert.isString(outputPath, "Output path should be of type 'string'");
            assert.notEqual(outputPath, randomFilePath, `Output path '${outputPath}' shouldn't match input path '${randomFilePath}'.`);
            assert.isTrue(/\d\.\w+$/gi.test(outputPath), "Should end with incremental number");
        });
    });
})