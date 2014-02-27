'use strict';

var fs = require('fs'),
    grunt = require('grunt'),
    _ = require('lodash'),
    outputDirPath = 'test/tmp',
    expectedDirPath = 'test/expected';

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.durandaljs = {
    setUp: function(done) {
        // setup here if necessary
        done();
    }
};

var expectedDirs = fs.readdirSync(expectedDirPath);

_.each(expectedDirs, function(testDirName){
    exports.durandaljs[testDirName] = function(test) {
        var expectedTestDirPath = [expectedDirPath, testDirName].join('/'),
            outputTestDirPath = [outputDirPath, testDirName].join('/');

        var testFileNames = fs.readdirSync(expectedTestDirPath);

        test.expect(testFileNames.length);

        _.each(testFileNames, function(testFileName){
            var expectedFilePath = [expectedTestDirPath, testFileName].join('/'),
                outputFilePath = [outputTestDirPath, testFileName].join('/');

            var expectedFileContent = grunt.file.read(expectedFilePath),
                outputFileContent = grunt.file.read(outputFilePath);

            test.equal(expectedFileContent, outputFileContent, 'should describe what the default behavior is.');
        });

        test.done();
    };
});
