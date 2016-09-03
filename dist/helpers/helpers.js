'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkDirectorySync = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkDirectorySync = exports.checkDirectorySync = function checkDirectorySync(directory) {
    try {
        _fs2.default.statSync(directory);
    } catch (e) {
        _fs2.default.mkdirSync(directory);
    }
};

exports.default = {
    checkDirectorySync: checkDirectorySync
};