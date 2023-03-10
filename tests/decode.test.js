describe('decode function tests', () => {
    const decode = require('../cjs').decode;
    test('it\'s a valid function', () => {
        expect(typeof decode)
            .toBe('function');
    });
    test('it can decode any string back to its original form', () => {
        expect(decode('aGVsbG8gYmVhcmVyIHRva2Vu'))
            .toBe('hello bearer token');
        expect(decode('VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw=='))
            .toBe('The quick brown fox jumps over the lazy dog');
        expect(decode('VGhlIGVhcmx5IGJpcmQgY2F0Y2hlcyB0aGUgd29ybQ==')) 
            .toBe('The early bird catches the worm');
        expect(decode('VGhlIHBlbiBpcyBtaWdodGllciB0aGFuIHRoZSBzd29yZA=='))
            .toBe('The pen is mightier than the sword');
        expect(decode('QWxsJ3MgZmFpciBpbiBsb3ZlIGFuZCB3YXI='))
            .toBe('All\'s fair in love and war'); 
        expect(decode('V2hlcmUgdGhlcmUncyBzbW9rZSwgdGhlcmUncyBmaXJl'))
            .toBe('Where there\'s smoke, there\'s fire');
    });
    test('it can decode buffers', () => { 
        expect(decode(Buffer.from('aGVsbG8gYmVhcmVyIHRva2Vu')))
            .toBe('hello bearer token');
        expect(decode(Buffer.from('VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==')))
            .toBe('The quick brown fox jumps over the lazy dog');
        expect(decode(Buffer.from('VGhlIGVhcmx5IGJpcmQgY2F0Y2hlcyB0aGUgd29ybQ==')))
            .toBe('The early bird catches the worm');
        expect(decode(Buffer.from('VGhlIHBlbiBpcyBtaWdodGllciB0aGFuIHRoZSBzd29yZA==')))
            .toBe('The pen is mightier than the sword');
        expect(decode(Buffer.from('QWxsJ3MgZmFpciBpbiBsb3ZlIGFuZCB3YXI=')))
            .toBe('All\'s fair in love and war'); 
        expect(decode(Buffer.from('V2hlcmUgdGhlcmUncyBzbW9rZSwgdGhlcmUncyBmaXJl')))
            .toBe('Where there\'s smoke, there\'s fire');
    });
}); 