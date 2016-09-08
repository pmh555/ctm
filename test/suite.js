#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const args = require('minimist')(process.argv.slice(2));
const glob = require('glob');
const Mocha = require('mocha');
const path = require('path');

const mochaOptions = _.defaults(args.mocha || {}, {
    bail: true,
    reporter: 'spec',
    ui: 'bdd',
});
const mocha = new Mocha(mochaOptions);

if (args.grep) {
    mocha.grep(args.grep);
}

const globOptions = {
    cwd: path.resolve(__dirname, '..'),
    matchBase: true,
    nodir: true,
};

let pattern = args.pattern ? args.pattern : 'test/**/*.test.js';

if (!pattern.match(/test\.js$/)) {
    pattern += '**/*.test.js';
}

glob(pattern, globOptions, (err, files) => {
    files.forEach((file) => {
        mocha.addFile(path.resolve(__dirname, '..', file));
    });

    mocha.run((failures) => {
        process.exit(failures);
    });
});

process.on('uncaughtException', (e) => {
    console.error(e.stack);
});