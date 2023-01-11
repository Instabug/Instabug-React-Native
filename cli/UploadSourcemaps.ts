import axios from 'axios';
import { Command, Option } from 'commander';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

export const uploadSourcemapsCommand: Command = new Command();

uploadSourcemapsCommand
  .name('upload-sourcemaps')
  .addOption(
    new Option('-p, --platform <value>', 'Platform')
      .choices(['ios', 'android'])
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      '-d, --dir <value>',
      'The path of the directory including the source map file',
    ).makeOptionMandatory(),
  )
  .addOption(
    new Option('-t, --token <value>', 'Your App Token')
      .env('INSTABUG_APP_TOKEN')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option('-v, --name <value>', 'The app version name')
      .env('INSTABUG_APP_VERSION_NAME')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option('-c, --code <value>', 'The app version code')
      .env('INSTABUG_APP_VERSION_CODE')
      .makeOptionMandatory(),
  )
  .addOption(new Option('-l, --label <value>', "The CodePush label if it's a CodePush release"))
  .action(function (this: Command) {
    const options = this.opts<UploadSourcemapsOptions>();
    uploadFile(options);
  })
  .showHelpAfterError();

interface UploadSourcemapsOptions {
  platform: 'android' | 'ios';
  dir: string;
  token: string;
  name: string;
  code: string;
  label?: string;
}

const uploadFile = async (options: UploadSourcemapsOptions) => {
  const os = options.platform;
  const dir = options.dir;
  const token = options.token;
  const name = options.name;
  const code = options.code;
  const label = options.label;
  const version = {
    code: code,
    name: name,
    codePush: label,
  };
  const form = new FormData();
  form.append('app_version', JSON.stringify(version));
  form.append(
    'symbols_file',
    fs.readFileSync(path.join(dir, `${os}-sourcemap.json`)),
    `${os}-sourcemap.json`,
  );
  form.append('application_token', token);
  form.append('platform', 'react_native');
  form.append('os', os);
  console.log('Uploading Sourcemap file...');
  try {
    const response = await axios.post('https://api.instabug.com/api/sdk/v3/symbols_files', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log('Success:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data);
    }
  }
};
