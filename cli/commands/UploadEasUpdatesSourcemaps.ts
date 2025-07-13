import { Command, Option } from 'commander';
import { UploadEasUpdatesSourcemaps, UploadEasUpdatesSourcemapsOptions } from '../upload';

export const uploadEasUpdatesSourcemapsCommand = new Command();

uploadEasUpdatesSourcemapsCommand
  .name('upload-eas-updates-sourcemaps')
  .addOption(
    new Option('-f, --file <path>', 'The path of eas update folder')
      .makeOptionMandatory()
      .default('dist'),
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
    new Option('--androidUpdateId <value>', "The CodePush label if it's a CodePush release"),
  )
  .addOption(new Option('--iosUpdateId <value>', "The CodePush label if it's a CodePush release"))
  .action(function (this: Command) {
    const options = this.opts<UploadEasUpdatesSourcemapsOptions>();
    UploadEasUpdatesSourcemaps(options);
  })
  .showHelpAfterError();
