import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

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
export const uploadSoFiles = async (opts: UploadSoFilesOptions): Promise<boolean> => {
  const fileName = opts.file;

  const validFilePath = assert(
    fileName != null,
    'Failed to upload So Files: invalid file path',
    opts.silent,
  );

  if (!validFilePath) {
    return false;
  }

  const fileExists = assert(
    fs.existsSync(fileName),
    'Failed to upload So Files: File not found',
    opts.silent,
  );

  if (!fileExists) {
    return false;
  }

  const fileExt = fileName.split('.').pop();

  const isZipFile = assert(
    fileExt === 'zip',
    'Failed to upload So Files: You can only upload ZIP files',
    opts.silent,
  );

  if (!isZipFile) {
    return false;
  }

  const fileBlob = fs.readFileSync(opts.file);

  const form = new FormData();
  form.append('app_version', opts.name);
  form.append('so_file', fileBlob, fileName);
  form.append('application_token', opts.token);
  form.append('api_key', opts.api_key);
  form.append('arch', opts.arch);

  if (!opts.silent) {
    console.log('Uploading So files...');
  }

  const uploadEndpoint = 'https://api.instabug.com/api/web/public/so_files';
  try {
    await axios.post(uploadEndpoint, form, {
      headers: form.getHeaders(),
    });

    if (!opts.silent) {
      console.log(
        `Successfully uploaded So Files for version: ${opts.name} with arch ${opts.arch}`,
      );
    }

    return true;
  } catch (err) {
    if (!opts.silent) {
      console.error(
        'Failed to upload So Files:',
        axios.isAxiosError(err) ? err.response?.data : err,
      );

      process.exit(1);
    }

    return false;
  }
};

export const assert = (condition: unknown, message: string, silent?: boolean): boolean => {
  if (silent) {
    return Boolean(condition);
  }

  if (!condition) {
    console.error(message);
    process.exit(1);
  }

  return true;
};
