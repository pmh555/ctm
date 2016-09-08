'use strict';

const chai = require('chai');
const sinon = require('sinon');
const withData = require('leche').withData;

chai.should();
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

const Reader = require('lib/Reader');

describe('Reader', function() {
    describe('When I call open with an invalid file', function() {
        withData({
            'an empty filename': {
                filename: '',
                error: /Error reading file/,
            },
            'null input': {
                filename: null,
                error: /Error opening file/,
            },
        }, data => {
            it('throws an error', function() {
                let r = new Reader(data.filename);

                let dataSpy = sinon.spy();
                r.on(Reader.Event.DATA, dataSpy);

                return r.read().should.eventually.be.rejectedWith(data.error).then(() => {
                    dataSpy.should.not.have.been.called;
                });
            });
        });
    });

    describe('When I call open with a valid file', function() {
        withData({
            'an empty file': {
                filename: 'test/file/empty.txt',
                callCount: 0,
            },
            'a single line of data': {
                filename: 'test/file/single.txt',
                callCount: 1,
            },
            '50 lines of data': {
                filename: 'test/file/multiple.txt',
                callCount: 50,
            },
        }, data => {
            it('triggers a data event per line', function() {
                let r = new Reader(data.filename);

                let dataSpy = sinon.spy();
                r.on(Reader.Event.DATA, dataSpy);

                return r.read().should.eventually.be.fulfilled.then(() => {
                    return dataSpy.should.have.callCount(data.callCount);
                });
            });
        });
    });
});