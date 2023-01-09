import { Command, Option } from 'commander';
import fs from 'fs';

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
    console.log(options);
    listDirContents(options.dir);
  })
  .showHelpAfterError();

interface UploadSourcemapsOptions {
  platform: 'android' | 'ios';
  dir: string;
  token: string;
  name: string;
  code: string;
  label: string;
}

async function listDirContents(filepath: string) {
  try {
    const files: string[] = await fs.promises.readdir(filepath);
    console.log(files);
  } catch (error) {
    console.error('Error occurred while reading the directory!', error);
  }
}
