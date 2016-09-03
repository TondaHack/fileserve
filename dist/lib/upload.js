'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (filepath) {
    var storage = _multer2.default.diskStorage({
        destination: function destination(req, file, cb) {
            cb(null, filepath);
        },
        filename: function filename(req, file, cb) {
            cb(null, file.originalname);
        }
    });

    return (0, _multer2.default)({
        storage: storage
    });
};