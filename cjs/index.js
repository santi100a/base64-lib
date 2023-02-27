"use strict";
exports.__esModule = true;
exports.decode = exports.encode = void 0;
/**
 * Encodes `input` to base64 format.
 * @param input A string.
 * @returns A base64 representation of `input`.
 */
function encode(input) {
    if (typeof input !== 'string')
        throw new TypeError("The \"input\" parameter must be a string. Received \"".concat(String(input), "\" of type \"").concat(typeof input, "\"."));
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
exports.encode = encode;
/**
 * Decodes `input` back to its original form. Must be a valid base64 string.
 * @param input A valid base64 string.
 * @returns The original value before encoding `input`.
 */
function decode(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var inp = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < inp.length) {
        enc1 = keyStr.indexOf(inp.charAt(i++));
        enc2 = keyStr.indexOf(inp.charAt(i++));
        enc3 = keyStr.indexOf(inp.charAt(i++));
        enc4 = keyStr.indexOf(inp.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        if (enc3 == 64) {
            output += String.fromCharCode(chr1);
        }
        else if (enc4 == 64) {
            output += String.fromCharCode(chr1, chr2);
        }
        else {
            output += String.fromCharCode(chr1, chr2, chr3);
        }
    }
    return output;
}
exports.decode = decode;
