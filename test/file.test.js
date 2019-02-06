const { assert } = require('chai');
const {
    getMeta,
    uniqueFilename
} = require('./../service/file');

describe.only("Files", () => {

    context("Metadata", () => {

        it("Should fail with invalid filename");

        it("Should fail with missing file");

        it("Should retreive file meta");
    });

    context("Filename", () => {

        it("Should return input filename when unique");

        it("Should generate a unique filename");
    });
})