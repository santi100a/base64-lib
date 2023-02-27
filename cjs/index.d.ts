/**
 * Encodes `input` to base64 format.
 * @param input A string.
 * @returns A base64 representation of `input`.
 */
declare function encode(input: string): string;
/**
 * Decodes `input` back to its original form. Must be a valid base64 string.
 * @param input A valid base64 string.
 * @returns The original value before encoding `input`.
 */
declare function decode(input: string): string;
export { encode, decode };
