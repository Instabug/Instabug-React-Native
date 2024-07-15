import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export interface UploadSoFilesOptions {
  arch: 'x86' | 'x86_64' | 'arm64-v8a' | 'armeabi-v7a';
  file: string;
  token: string;
  name: string;
  api_key: string;
}

export const uploadSoFiles = async (opts: UploadSoFilesOptions) => {
  const fileName = opts.file;
  if (fileName == null) {
    console.error('Failed to upload So Files: invalid file path');
    process.exit(1);
  }

  if (fs.existsSync(fileName) === false) {
    console.error('Failed to upload So Files: File not found');
    process.exit(1);
  }
  var fileExt = fileName.split('.').pop();

  if (fileExt !== 'zip') {
    console.error('Failed to upload So Files: You can only upload ZIP files');
    process.exit(1);
  }

  const fileBlob = fs.readFileSync(opts.file);

  const form = new FormData();
  form.append('app_version', opts.name);
  form.append('so_file', fileBlob, fileName);
  form.append('application_token', opts.token);
  form.append('api_key', opts.api_key);
  form.append('arch', opts.arch);

  console.log('Uploading So files...');
  const uploadEndpoint = 'https://api.instabug.com/api/web/public/so_files';
  try {
    await axios.post(uploadEndpoint, form, {
      headers: form.getHeaders(),
    });

    console.log(`Successfully uploaded So Files for version: ${opts.name} with arch ${opts.arch}`);
  } catch (err) {
    console.error('Failed to upload So Files:', axios.isAxiosError(err) ? err.response?.data : err);
    process.exit(1);
  }
};
