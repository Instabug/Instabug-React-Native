'use strict';

var stacktraceParser = require('stacktrace-parser');

function parseErrorStack(error) {
    if (!error || !error.stack) {
        return [];
    }
    return Array.isArray(error.stack) ? error.stack :
        stacktraceParser.parse(error.stack);
}

module.exports = parseErrorStack;