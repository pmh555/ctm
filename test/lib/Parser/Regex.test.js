'use strict';

const chai = require('chai');
const withData = require('leche').withData;

chai.should();
chai.use(require('chai-as-promised'));

const RegexParser = require('lib/Parser/Regex');

describe('Regex parser', function() {
    describe('When I call parseLine with invalid input', function() {
        withData({
            'an empty line': '',
            'null input': null,
        }, data => {
            it('throws a parse error', function() {
                let p = new RegexParser();

                return p.parseLine(data).should.eventually.be.rejectedWith(/Unable to parse line/).then(() => {
                    p.words.size.should.equal(0);
                });
            });
        });
    });

    describe('When I call parseLine with valid input', function() {
        withData({
            'a single repeated word': {
                string: 'test TEST Test tEst',
                words: ['test']
            },
            'multiple words': {
                string: 'Case should be ignored. Case. CASE.',
                words: ['case', 'should', 'be', 'ignored']
            },
            'enclosed with ignored characters and whitespace': {
                string: '!@£$%^&*().test   <>?"|{}[]  ',
                words: ['test']
            },
        }, data => {
            it('produces a list of words with case ignored', function() {
                let p = new RegexParser();

                return p.parseLine(data.string).should.eventually.be.fulfilled.then(() => {
                    p.words.size.should.equal(data.words.length);
                    Array.from(p.words.keys()).should.deep.equal(data.words)
                });
            });
        });
    });
});