import axios from 'axios';
import { Command, Option } from 'commander';
import FormData from 'form-data';
import fs from 'fs';

interface UploadSourcemapsOptions {
  platform: 'android' | 'ios';
  file: string;
  token: string;
  name: string;
  code: string;
  label?: string;
}

export const uploadSourcemapsCommand = new Command();

uploadSourcemapsCommand
  .name('upload-sourcemaps')
  .addOption(
    new Option('-p, --platform <value>', 'Platform')
      .choices(['ios', 'android'])
      .makeOptionMandatory(),
  )
  .addOption(
    new Option('-f, --file <path>', 'The path of the source map file').makeOptionMandatory(),
  )
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
  .addOption(
    new Option('-c, --code <value>', 'The app version code')
      .env('INSTABUG_APP_VERSION_CODE')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option('-l, --label <value>', "The CodePush label if it's a CodePush release").env(
      'INSTABUG_APP_VERSION_LABEL',
    ),
  )
  .action(function (this: Command) {
    const options = this.opts<UploadSourcemapsOptions>();
    uploadSourcemaps(options);
  })
  .showHelpAfterError();

const uploadSourcemaps = async (opts: UploadSourcemapsOptions) => {
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
    const response = await axios.post(
      'https://st001012dream11.instabug.com/api/sdk/v3/symbols_files',
      form,
      {
        headers: form.getHeaders(),
      },
    );

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
