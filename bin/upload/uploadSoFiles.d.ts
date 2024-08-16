export interface UploadSoFilesOptions {
    arch: 'x86' | 'x86_64' | 'arm64-v8a' | 'armeabi-v7a';
    file: string;
    token: string;
    name: string;
    api_key: string;
    /**
     * Disables logging to the console and prevents process exit on error.
     *
     * @default false
     * */
    silent?: boolean;
}
/**
 * Uploads NDK `.so` files to Instabug.
 *
 * @param opts Options for the `.so` files upload process.
 * @returns A promise that resolves to a boolean indicating whether the upload was successful.
 */
export declare const uploadSoFiles: (opts: UploadSoFilesOptions) => Promise<boolean>;
export declare const assert: (condition: unknown, message: string, silent?: boolean) => boolean;
