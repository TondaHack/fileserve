'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _basicAuth = require('basic-auth');

var _basicAuth2 = _interopRequireDefault(_basicAuth);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _config = require('../../config/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = (0, _minimist2.default)(process.argv.slice(2));
var _args$username = args.username;
var username = _args$username === undefined ? _config2.default.defaultUsername : _args$username;
var _args$password = args.password;
var password = _args$password === undefined ? _config2.default.defaultPassword : _args$password;


var unauthorized = function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
};

exports.default = function (req, res, next) {
    var user = (0, _basicAuth2.default)(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    return user.name === username && user.pass === password ? next() : unauthorized(res);
};