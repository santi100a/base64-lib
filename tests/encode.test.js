describe('encode function tests', () => {
    const encode = require('../cjs').encode;
    test('it\'s a valid function', () => {
        expect(typeof encode)
            .toBe('function');
    });
    test('it can encode any string into a valid format', () => {
        expect(encode('hello bearer token'))
            .toBe('aGVsbG8gYmVhcmVyIHRva2Vu');
        expect(encode('The quick brown fox jumps over the lazy dog'))
            .toBe('VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==');
        expect(encode('The early bird catches the worm'))
            .toBe('VGhlIGVhcmx5IGJpcmQgY2F0Y2hlcyB0aGUgd29ybQ==');
        expect(encode('The pen is mightier than the sword'))
            .toBe('VGhlIHBlbiBpcyBtaWdodGllciB0aGFuIHRoZSBzd29yZA==');
        expect(encode('All\'s fair in love and war'))
            .toBe('QWxsJ3MgZmFpciBpbiBsb3ZlIGFuZCB3YXI=');
        expect(encode('Where there\'s smoke, there\'s fire'))
            .toBe('V2hlcmUgdGhlcmUncyBzbW9rZSwgdGhlcmUncyBmaXJl');
    });
});