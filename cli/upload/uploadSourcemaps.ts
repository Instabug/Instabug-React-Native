import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export interface UploadSourcemapsOptions {
  platform: 'android' | 'ios';
  file: string;
  token: string;
  name: string;
  code: string;
  label?: string;
}

export const uploadSourcemaps = async (opts: UploadSourcemapsOptions) => {
  const fileName = `${opts.platform}-sourcemap.json`;
  const fileBlob = fs.readFileSync(opts.file);

  const version = {
    code: opts.code,
    name: opts.name,
    codepush: opts.label,
  };

  const form = new FormData();
  form.append('app_version', JSON.stringify(version));
  form.append('symbols_file', fileBlob, fileName);
  form.append('application_token', opts.token);
  form.append('platform', 'react_native');
  form.append('os', opts.platform);

  console.log('Uploading Source map file...');

  try {
    const response = await axios.post('https://api.instabug.com/api/sdk/v3/symbols_files', form, {
      headers: form.getHeaders(),
    });

    const appVersion = version.codepush
      ? `${version.name} (${version.code})+codepush:${version.codepush}`
      : `${version.name} (${version.code})`;

    console.log(`Successfully uploaded Source maps for version: ${appVersion}`);
    console.log(response.data);
  } catch (err) {
    console.error(
      'Failed to upload source maps:',
      axios.isAxiosError(err) ? err.response?.data : err,
    );
  }
};
