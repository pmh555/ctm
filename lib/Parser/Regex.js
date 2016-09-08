'use strict';

const _ = require('lodash');
const debug = require('debug')('ctm-books:parser:regex');

class RegexParser {

    constructor() {
        this.words = new Map();
    }

    parseLine(line) {
        if (line) {
            return new Promise((resolve, reject) => {
                debug('Parsing line begin', line);
                let words = _.words(line.toLowerCase());

                _.each(words, value => {
                    let num = this.words.get(value);

                    if (num) {
                        debug('Incrementing count for "%s"', value);
                        this.words.set(value, num + 1);
                        return;
                    }

                    this.words.set(value, 1);
                });

                debug('Parsing line complete', line);
                resolve();
            });
        }

        return Promise.reject(new Error('Unable to parse line'));
    }

}

module.exports = RegexParser;