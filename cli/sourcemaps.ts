#!/usr/bin/env node
import { Command, Option } from 'commander';
import figlet from 'figlet';
import fs from 'fs';

const program: Command = new Command();

console.log(figlet.textSync('Instabug React Native CLI'));

program
  .name('upload-sourcemaps')
  .usage('[options]')
  .version('1.0.0-beta1')
  .description('A CLI for uploading source maps to Instabug dashboard.')
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
  .showHelpAfterError()
  .parse(process.argv);

interface UploadSourcemapsOptions {
  platform: 'android' | 'ios';
  dir: string;
  token: string;
  name: string;
  code: string;
  label: string;
}

const options = program.opts<UploadSourcemapsOptions>();

const platform = options.platform;
const directory = options.dir;
const token = options.token;
const versionName = options.name;
const versionCode = options.code;
const codePushLabel = options.label;

async function listDirContents(filepath: string) {
  try {
    const files: string[] = await fs.promises.readdir(filepath);
    console.log(files);
  } catch (error) {
    console.error('Error occurred while reading the directory!', error);
  }
}

console.log(options);
console.log(platform);
listDirContents(directory);
console.log(token);
console.log(versionName);
console.log(versionCode);
console.log(codePushLabel);
