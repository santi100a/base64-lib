# Santi's Base64 Library

[![Build Status](https://github.com/santi100a/base64-lib/actions/workflows/main.yml/badge.svg)](https://github.com/santi100a/base64-lib/actions)
[![GitHub stars](https://img.shields.io/github/stars/santi100a/base64-lib.svg)](https://github.com/santi100a/base64-lib)
[![License](https://img.shields.io/github/license/santi100a/base64-lib.svg)](https://github.com/santi100a/base64-lib)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@santi100/base64-lib)](https://bundlephobia.com/package/@santi100/base64-lib@latest)


- 🚀 Lightweight and fast[^](#disclaimers)
- 👴 ES3-compliant[*](#disclaimers)
- 💻 Portable between the browser and Node.js


## What's this?
This is a lightweight, fast library for encoding and decoding strings in base64 format.
It's portable between the browser and Node.js. In order to keep backwards compatibility with old browsers, this library can only encode and decode strings. This serves as a lighweight, portable replacement for the `btoa` and `atob` functions, and provides clearer names. 

## Contribute

Wanna contribute? [File an issue](https://github.com/santi100a/base64-lib/issues) or [pull request](https://github.com/santi100a/base64-lib/pulls)!
Make sure you follow the [contribution Code of Conduct](https://github.com/santi100a/base64-lib/blob/main/CODE_OF_CONDUCT.md).
## Installation
- Via NPM: `npm install @santi100/base64-lib`
- Via Yarn: `yarn add @santi100/base64-lib`
- Via PNPM: `pnpm install @santi100/base64-lib`

## API
- `function encode(input: string): string;` Encodes `input` to base64 format. It takes a string as an argument, and returns a base64 representation of `input`.
- `function decode(input: string): string;` Decodes `input` back to its original form. Must be a valid base64 string. It takes a valid base64 string, and returns the decoded value of `input`.

## My Goals
The above functions must:
1. Be able to handle strings that contain non-printable ASCII (the result of stringifying a buffer, for example).
2. Be fully ES3 compliant (no ArrayBuffer, Uint8Array or anything like that).
3. Use padding `=` signs.
4. Be fully portable between the browser and Node.js (no reliance in any browser- or Node-exclusive API).
5. Not modify the argument vector.

**If any of the above is not being satisfied, open a pull request or issue. I have no idea how to satisfy idea #1 reliably (see [disclaimers](#disclaimers)😀).**

### Disclaimers
- **Keep in mind this library can only reliably handle plaintext for now.**
- **Hasn't been tested in an actual ES3 environment. Feel free to open an issue or pull request if you find any non-ES3 thing.*
- *^The source code is about 3 kilobytes.*