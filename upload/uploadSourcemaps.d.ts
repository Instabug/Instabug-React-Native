export interface UploadSourcemapsOptions {
    platform: 'android' | 'ios';
    file: string;
    token: string;
    name: string;
    code: string;
    label?: string;
    /**
     * Disables logging to the console and prevents process exit on error.
     *
     * @default false
     * */
    silent?: boolean;
}
/**
 * Uploads JavaScript sourcemaps to Instabug.
 *
 * @param opts Options for the sourcemaps upload process.
 * @returns A promise that resolves to a boolean indicating whether the upload was successful.
 */
export declare const uploadSourcemaps: (opts: UploadSourcemapsOptions) => Promise<boolean>;
