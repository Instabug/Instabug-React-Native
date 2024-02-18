import axios from 'axios';
import { Command, Option } from 'commander';
import FormData from 'form-data';
import fs from 'fs';

interface UploadSoFilesOptions {
  arch: 'x86' | 'x86_64' | 'arm64-v8a' | 'armeabi-v7a';
  file: string;
  token: string;
  name: string;
  api_key: string;
}
/**
 * This script uploads .so files to the specified endpoint used in NDK crash reporting.
 * Usage: node upload-so-files.js --arch <arch> --file <path> --api_key <key> --token <token> --name <name>
 */

export const UploadSoFilesCommand = new Command();

UploadSoFilesCommand.name('upload-so-files')
  .addOption(
    new Option('-arch, --arch <value>', 'arch')
      .choices(['x86', 'x86_64', 'arm64-v8a', 'armeabi-v7a'])
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      '-f, --file <path>',
      'The path of the symbol files in Zip format',
    ).makeOptionMandatory(),
  )
  .addOption(new Option('--api_key <value>', 'Your App key').makeOptionMandatory())
  .addOption(
    new Option('-t, --token <value>', 'Your App Token')
      .env('INSTABUG_APP_TOKEN')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option('-n, --name <value>', 'The app version name')
      .env('INSTABUG_APP_VERSION_NAME')
      .makeOptionMandatory(),
  )
  .action(function (this: Command) {
    const options = this.opts<UploadSoFilesOptions>();
    UploadSoFiles(options);
  })
  .showHelpAfterError();

const UploadSoFiles = async (opts: UploadSoFilesOptions) => {
  const fileName = opts.file;
  if (fileName == null) {
    console.error('Failed to upload So Files: invalid file path');
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

  try {
    await axios.post('https://api.instabug.com/api/web/public/so_files', form, {
      headers: form.getHeaders(),
    });

    console.log(`Successfully uploaded So Files for version: ${opts.name} with arch ${opts.arch}`);
  } catch (err) {
    console.error('Failed to upload So Files:', axios.isAxiosError(err) ? err.response?.data : err);
    process.exit(1);
  }
};
