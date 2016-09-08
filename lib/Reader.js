'use strict';

const debug = require('debug')('ctm-books:reader');
const EventEmitter = require('events').EventEmitter;
const readline = require('linebyline');

const Event = {
    DATA: 'reader.data',
};

class Reader extends EventEmitter {

    constructor(filename) {
        super();
        this.filename = filename;
    }

    read() {
        return new Promise((resolve, reject) => {
            try {
                debug('Attempting to read "%s"', this.filename);
                let rl = readline(this.filename);

                rl.on('line', line => {
                    this.emit(Event.DATA, line.toString('utf8'));
                });

                rl.on('end', () => {
                    debug('Finished reading "%s"', this.filename);
                    resolve();
                });

                rl.on('error', err => {
                    reject(new Error('Error reading file'));
                });
            } catch (e) {
                reject(new Error('Error opening file'));
            }
        });
    }

}

module.exports = Reader;
module.exports.Event = Event;