interface Base64Options {
	/**
	 * Whether or not to use a URL-safe charset.
	 * @since 0.0.3
	 */
	urlSafe?: boolean;
}
interface EncodeOptions extends Base64Options {
	// Insert any property here
}
interface DecodeOptions extends Base64Options {
	// Insert any property here
}

function createCoder() {
	return new class Coder {
		private readonly opts: Base64Options;
		constructor(opts: Base64Options = {}) {
			this.opts = opts;
		}
		encode(input: string | Buffer) {
			return encode(input, this.opts);
		}
		decode(input: string | Buffer) {
			return decode(input, this.opts);
		}
	};
}

function map<T, R = unknown>(
	array: T[],
	fn: (val: T, index?: number, array?: T[]) => R
) {
	const newValues: R[] = [];

	for (const item of array) {
		newValues.push(fn(item, array.indexOf(item), array));
	}

	return newValues;
}
const URL_SAFE_CHARS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const STANDARD_CHARS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const CHAR_LOOKUP: Record<string, number> = {};
for (let i = 0; i < URL_SAFE_CHARS.length; i++) {
	CHAR_LOOKUP[URL_SAFE_CHARS.charAt(i)] = i;
}
for (let i = 0; i < STANDARD_CHARS.length; i++) {
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
function encode(input: Buffer | string, opts: EncodeOptions = {}) {
	const Buff = typeof Buffer === 'undefined' ? null : Buffer;
	function isBufferOrString(input: any) {
		if (typeof input === 'string') return true;
		// @ts-expect-error
		if (input instanceof Buff) return true;

		return false;
	}
	if (!isBufferOrString(input)) 
		throw new TypeError(
			`"input" must be a string. Got "${String(input)}" of type "${typeof input}".`
		);
	// @ts-expect-error
	const isBuffer = (input: any) => input instanceof Buff;
	const chars = opts.urlSafe ? URL_SAFE_CHARS : STANDARD_CHARS;
	let output = '';
	let padding = '';
	const inp = isBuffer(input) ? input.toString() : String(input);
	let i = 0;
	while (i < inp.length) { 
		const byte1 = inp.charCodeAt(i++) & 0xff;
		const byte2 = inp.charCodeAt(i++) & 0xff;
		const byte3 = inp.charCodeAt(i++) & 0xff;
		const group = (byte1 << 16) | (byte2 << 8) | byte3;
		output +=
			chars[(group >> 18) & 0x3f] +
			chars[(group >> 12) & 0x3f] +
			(byte2 ? chars[(group >> 6) & 0x3f] : '=') +
			(byte3 ? chars[group & 0x3f] : '=');
	}
	const mod = output.length % 4;
	if (mod) {
		padding = '===='.substring(mod);
	}
	return output + padding;
}

/**
 * Decodes `input` back to its original form.
 * @param input A valid base64 string.
 * @param opts Decoding options. See {@link Base64Options} and {@link DecodeOptions}.
 * @returns The result of decoding `input`.
 * @see [Base64Options](Base64Options) for details on properties common to {@link encode} and {@link decode}.
 * @see [DecodeOptions](DecodeOptions) for details on properties exclusive to {@link decode}.
 */
function decode(input: string | Buffer, opts: EncodeOptions = {}) {
	// Get the character set to use for decoding
	const chars = opts.urlSafe ? URL_SAFE_CHARS : STANDARD_CHARS;

	// Remove any padding characters from the input string
	const inp = (typeof Buffer === 'undefined' ? String(input) : Buffer.from(input).toString()).replace(/=+$/, '');

	// Split the input string into chunks of 6 bits
	const chunks = map(inp.split(''), (char) => {
		const index = chars.indexOf(char);
		return index >= 0 ? index.toString(2).padStart(6, '0') : '';
	});

	// Combine the chunks into a single binary string
	const binary = chunks.join('');

	// Split the binary string into chunks of 8 bits
	const bytes = binary.match(/.{8}/g) || []; 

	// Convert each byte to its corresponding character
	const characters = map(bytes, (byte) =>
		String.fromCharCode(parseInt(byte, 2))
	);

	// Join the characters to form the final string
	return characters.join('');
}

// The above functions must:
// 1. Be able to handle strings that contain non-printable ASCII (the result of stringifying a
// buffer, for example).
// 2. Be fully ES3 compliant (no ArrayBuffer, Uint8Array or anything like that).
// 3. Use padding '=' signs.
// 4. Be fully portable between the browser and Node.js (no reliance in any browser- or Node-exclusive
// API).
// 5. Not modify the argument vector.
// Open an issue or pull request if ANY of the above is not being complied.

export { encode, decode, Base64Options, DecodeOptions, EncodeOptions };
