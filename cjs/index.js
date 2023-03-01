"use strict";
exports.__esModule = true;
exports.decode = exports.encode = void 0;
function map(array, fn) {
    var newValues = [];
    for (var index in array) {
        newValues.push(fn(array[index], Number(index), array));
    }
    return newValues;
}
var URL_SAFE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
var STANDARD_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
/**
 *
 * Encodes `input` to base64 format.
 * @param input A string.
 * @param opts Encoding options. See {@link Base64Options} and {@link EncodeOptions}.
 * @returns A base64 representation of `input`.
 * @see [Base64Options](Base64Options) for details on properties common to {@link encode} and {@link decode}.
 * @see [EncodeOptions](EncodeOptions) for details on properties exclusive to {@link encode}.
 */
function encode(input, 
/** @since 0.0.3 */
opts) {
    if (opts === void 0) { opts = {}; }
    if (typeof input !== 'string')
        throw new TypeError();
    var chars = opts.urlSafe ? URL_SAFE_CHARS : STANDARD_CHARS;
    var output = '';
    var padding = '';
    var i = 0;
    while (i < input.length) {
        var byte1 = input.charCodeAt(i++) & 0xff;
        var byte2 = input.charCodeAt(i++) & 0xff;
        var byte3 = input.charCodeAt(i++) & 0xff;
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
 * @see [EncodeOptions](DecodeOptions) for details on properties exclusive to {@link decode}.
 */
function decode(input, 
/** @since 0.0.3 */
opts) {
    if (opts === void 0) { opts = {}; }
    // Get the character set to use for decoding
    var chars = opts.urlSafe ? URL_SAFE_CHARS : STANDARD_CHARS;
    // Remove any padding characters from the input string
    input = input.replace(/=+$/, '');
    // Split the input string into chunks of 6 bits
    var chunks = map(input.split(''), function (char) {
        var index = chars.indexOf(char);
        return index >= 0 ? index.toString(2).padStart(6, '0') : '';
    });
    // Combine the chunks into a single binary string
    var binary = chunks.join('');
    // Split the binary string into chunks of 8 bits
    var bytes = binary.match(/.{8}/g) || [];
    // Convert each byte to its corresponding character
    var characters = map(bytes, function (byte) { return String.fromCharCode(parseInt(byte, 2)); });
    // Join the characters to form the final string
    return characters.join('');
}
exports.decode = decode;
