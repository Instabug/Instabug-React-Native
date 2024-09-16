import { Command, Option } from 'commander';
import { uploadSoFiles, UploadSoFilesOptions } from '../upload/uploadSoFiles';

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
    uploadSoFiles(options);
  })
  .showHelpAfterError();
