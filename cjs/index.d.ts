interface Base64Options {
    /**
     * Whether or not to use a URL-safe charset.
     * @since 0.0.3
     */
    urlSafe?: boolean;
}
interface EncodeOptions extends Base64Options {
}
interface DecodeOptions extends Base64Options {
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
declare function encode(input: string, 
/** @since 0.0.3 */
opts?: EncodeOptions): string;
/**
 * Decodes `input` back to its original form.
 * @param input A valid base64 string.
 * @param opts Decoding options. See {@link Base64Options} and {@link DecodeOptions}.
 * @returns The result of decoding `input`.
 * @see [Base64Options](Base64Options) for details on properties common to {@link encode} and {@link decode}.
 * @see [EncodeOptions](DecodeOptions) for details on properties exclusive to {@link decode}.
 */
declare function decode(input: string, 
/** @since 0.0.3 */
opts?: EncodeOptions): string;
export { encode, decode, Base64Options, DecodeOptions, EncodeOptions };
