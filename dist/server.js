'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../config/config.json');

var _config2 = _interopRequireDefault(_config);

var _upload = require('./lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _auth = require('./lib/auth');

var _auth2 = _interopRequireDefault(_auth);

var _helpers = require('./helpers/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (args) {
    var app = (0, _express2.default)();
    var srcDir = _path2.default.resolve(__dirname);
    var root = _path2.default.dirname(srcDir);
    var defaultFilePath = root + '/' + _config2.default.defaultFileFolder;
    var _args$filepath = args.filepath;
    var filepath = _args$filepath === undefined ? defaultFilePath : _args$filepath;

    var uploadMiddleware = (0, _upload2.default)(filepath).single('image');
    var port = args.port || _config2.default.port;
    app.use(_bodyParser2.default.urlencoded({
        extended: true
    }));
    app.use(_bodyParser2.default.json());
    app.use(_auth2.default);
    app.use(_express2.default.static(root + '/' + _config2.default.publicFolder));
    app.use('/upload', _express2.default.static(filepath));
    app.set('view engine', 'ejs');

    app.get('/', function (req, res) {
        (0, _helpers.checkDirectorySync)(filepath);
        res.render('index', {
            files: _fs2.default.readdirSync(filepath)
        });
    });

    app.post('/upload', function (req, res) {
        uploadMiddleware(req, res, function (err) {
            if (err || !req.file) {
                res.redirect('/?message=error');
                return;
            }
            console.info('Uploaded', req.file.originalname);
            res.redirect('/?message=success');
        });
    });

    app.listen(port, function () {
        var ipaddress = _ip2.default.address();
        console.info('Server is running on http://' + ipaddress + ':' + port);
    });
};