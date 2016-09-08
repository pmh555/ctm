#!/usr/bin/env node

'use strict';

const args = require('minimist')(process.argv.slice(2));
const debug = require('debug')('ctm-books:main');
const primality = require('primality');
const Reader = require('lib/Reader');
const RegexParser = require('lib/Parser/Regex');
const SplitParser = require('lib/Parser/Split');

if (!args.file) {
    process.stdout.write('Usage: npm run parse -- --file path/to/file\n');
    process.exit(1);
}

let mode = args.mode || 'r';
let reader = new Reader(args.file);
let parser;

if (mode) {
    switch (mode.toLowerCase()) {
        case 's':
            debug('Using split parser');
            parser = new SplitParser();
            break;
        default:
            debug('Using regex parser');
            parser = new RegexParser();
            break;
    }
}

reader.on(Reader.Event.DATA, line => {
    parser.parseLine(line);
});

reader.read().then(() => {
    debug('Finished parsing file');

    let words = {};
    let prime = [];

    parser.words.forEach((value, key) => {
        words[key] = value;

        if (primality(value)) {
            debug('Word count for "%s" is prime', key);
            prime.push(key);
        }
    });

    let output = {
        words: words,
        prime: prime,
    };

    process.stdout.write(JSON.stringify(output));
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});