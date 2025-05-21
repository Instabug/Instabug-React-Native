import fs from 'fs';
import { uploadSourcemaps } from './uploadSourcemaps';
import * as path from 'path';

export interface UploadEasUpdatesSourcemapsOptions {
  file: string;
  token: string;
  name: string;
  code: string;
  androidUpdateId?: string;
  iosUpdateId?: string;
  /**
   * Disables logging to the console and prevents process exit on error.
   *
   * @default false
   * */
  silent?: boolean;
}

function getMapFile(folderPath: string): string | null {
  try {
    const files = fs.readdirSync(folderPath);
    const mapFile = files.find((file) => file.endsWith('.map'));
    if (!mapFile) {
      return null;
    }
    return path.join(folderPath, mapFile);
  } catch (err) {
    console.error('Failed to read folder:', err);
    return null;
  }
}

/**
 * Uploads JavaScript sourcemaps to Instabug.
 *
 * @param opts Options for the sourcemaps upload process.
 * @returns A promise that resolves to a boolean indicating whether the upload was successful.
 */
export const UploadEasUpdatesSourcemaps = async (
  opts: UploadEasUpdatesSourcemapsOptions,
): Promise<boolean> => {
  const jsFolderPath = path.join(opts.file, '_expo', 'static', 'js');

  const androidFile = getMapFile(path.join(jsFolderPath, 'android'));
  const iosFile = getMapFile(path.join(jsFolderPath, 'ios'));
  if (androidFile && fs.existsSync(androidFile)) {
    await uploadSourcemaps({
      platform: 'android',
      name: opts.name,
      code: opts.code,
      token: opts.token,
      label: opts.androidUpdateId,
      file: androidFile,
      silent: opts.silent,
    });
  }

  if (iosFile && fs.existsSync(iosFile)) {
    await uploadSourcemaps({
      platform: 'ios',
      name: opts.name,
      code: opts.code,
      token: opts.token,
      label: opts.iosUpdateId,
      file: iosFile,
      silent: opts.silent,
    });
  }
  return true;
};
