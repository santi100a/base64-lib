"use strict";
exports.__esModule = true;
exports.decode = exports.encode = void 0;
function createCoder() {
    return new /** @class */ (function () {
        function Coder(opts) {
            if (opts === void 0) { opts = {}; }
            this.opts = opts;
        }
        Coder.prototype.encode = function (input) {
            return encode(input, this.opts);
        };
        Coder.prototype.decode = function (input) {
            return decode(input, this.opts);
        };
        return Coder;
    }());
}
function map(array, fn) {
    var newValues = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        newValues.push(fn(item, array.indexOf(item), array));
    }
    return newValues;
}
var URL_SAFE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
var STANDARD_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var CHAR_LOOKUP = {};
for (var i = 0; i < URL_SAFE_CHARS.length; i++) {
    CHAR_LOOKUP[URL_SAFE_CHARS.charAt(i)] = i;
}
for (var i = 0; i < STANDARD_CHARS.length; i++) {
    CHAR_LOOKUP[STANDARD_CHARS.charAt(i)] = i;
}
/**
 *
 * Encodes `input` to base64 format.
 * @param input A string.
 * @param opts Encoding options. See {@link Base64Options} and {@link EncodeOptions}.
 * @returns A base64 representation of `input`.
 * @see [Base64Options](Base64Options) for details on properties common to {@link encode} and {@link decode}.
 * @see [EncodeOptions](EncodeOptions) for details on properties exclusive to {@link encode}.
 */
function encode(input, opts) {
    if (opts === void 0) { opts = {}; }
    var Buff = typeof Buffer === 'undefined' ? null : Buffer;
    function isBufferOrString(input) {
        if (typeof input === 'string')
            return true;
        // @ts-expect-error
        if (input instanceof Buff)
            return true;
        return false;
    }
    if (!isBufferOrString(input))
        throw new TypeError("\"input\" must be a string. Got \"".concat(String(input), "\" of type \"").concat(typeof input, "\"."));
    // @ts-expect-error
    var isBuffer = function (input) { return input instanceof Buff; };
    var chars = opts.urlSafe ? URL_SAFE_CHARS : STANDARD_CHARS;
    var output = '';
    var padding = '';
    var inp = isBuffer(input) ? input.toString() : String(input);
    var i = 0;
    while (i < inp.length) {
        var byte1 = inp.charCodeAt(i++) & 0xff;
        var byte2 = inp.charCodeAt(i++) & 0xff;
        var byte3 = inp.charCodeAt(i++) & 0xff;
        var group = (byte1 << 16) | (byte2 << 8) | byte3;
        output +=
            chars[(group >> 18) & 0x3f] +
                chars[(group >> 12) & 0x3f] +
                (byte2 ? chars[(group >> 6) & 0x3f] : '=') +
                (byte3 ? chars[group & 0x3f] : '=');
    }
    var mod = output.length % 4;
    if (mod) {
        padding = '===='.substring(mod);
    }
    return output + padding;
}
exports.encode = encode;
/**
 * Decodes `input` back to its original form.
 * @param input A valid base64 string.
 * @param opts Decoding options. See {@link Base64Options} and {@link DecodeOptions}.
 * @returns The result of decoding `input`.
 * @see [Base64Options](Base64Options) for details on properties common to {@link encode} and {@link decode}.
 * @see [DecodeOptions](DecodeOptions) for details on properties exclusive to {@link decode}.
 */
function decode(input, opts) {
    if (opts === void 0) { opts = {}; }
    // Get the character set to use for decoding
    var chars = opts.urlSafe ? URL_SAFE_CHARS : STANDARD_CHARS;
    // Remove any padding characters from the input string
    var inp = (typeof Buffer === 'undefined' ? String(input) : Buffer.from(input).toString()).replace(/=+$/, '');
    // Split the input string into chunks of 6 bits
    var chunks = map(inp.split(''), function (char) {
        var index = chars.indexOf(char);
        return index >= 0 ? index.toString(2).padStart(6, '0') : '';
    });
    // Combine the chunks into a single binary string
    var binary = chunks.join('');
    // Split the binary string into chunks of 8 bits
    var bytes = binary.match(/.{8}/g) || [];
    // Convert each byte to its corresponding character
    var characters = map(bytes, function (byte) {
        return String.fromCharCode(parseInt(byte, 2));
    });
    // Join the characters to form the final string
    return characters.join('');
}
exports.decode = decode;
