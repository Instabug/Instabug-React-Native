import { Command, Option } from 'commander';
import { uploadSourcemaps, UploadSourcemapsOptions } from '../upload/uploadSourcemaps';

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
