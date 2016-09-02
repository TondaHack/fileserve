#!/usr/bin/env node
var minimist = require('minimist');

var server = require('../dist/server');


var args = minimist(process.argv.slice(2));

server.default(args);