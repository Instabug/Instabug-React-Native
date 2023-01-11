"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSourcemapsCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const commander_1 = require("commander");
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.uploadSourcemapsCommand = new commander_1.Command();
exports.uploadSourcemapsCommand
    .name('upload-sourcemaps')
    .addOption(new commander_1.Option('-p, --platform <value>', 'Platform')
    .choices(['ios', 'android'])
    .makeOptionMandatory())
    .addOption(new commander_1.Option('-d, --dir <value>', 'The path of the directory including the source map file').makeOptionMandatory())
    .addOption(new commander_1.Option('-t, --token <value>', 'Your App Token')
    .env('INSTABUG_APP_TOKEN')
    .makeOptionMandatory())
    .addOption(new commander_1.Option('-v, --name <value>', 'The app version name')
    .env('INSTABUG_APP_VERSION_NAME')
    .makeOptionMandatory())
    .addOption(new commander_1.Option('-c, --code <value>', 'The app version code')
    .env('INSTABUG_APP_VERSION_CODE')
    .makeOptionMandatory())
    .addOption(new commander_1.Option('-l, --label <value>', "The CodePush label if it's a CodePush release").env('INSTABUG_APP_VERSION_LABEL'))
    .action(function () {
    const options = this.opts();
    uploadSourcemaps(options);
})
    .showHelpAfterError();
const uploadSourcemaps = async (opts) => {
    const fileName = `${opts.platform}-sourcemap.json`;
    const filePath = path_1.default.join(opts.dir, fileName);
    const fileBlob = fs_1.default.readFileSync(filePath);
    const version = {
        code: opts.code,
        name: opts.name,
        codePush: opts.label,
    };
    const form = new form_data_1.default();
    form.append('app_version', JSON.stringify(version));
    form.append('symbols_file', fileBlob, fileName);
    form.append('application_token', opts.token);
    form.append('platform', 'react_native');
    form.append('os', opts.platform);
    console.log('Uploading Sourcemap file...');
    try {
        const response = await axios_1.default.post('https://api.instabug.com/api/sdk/v3/symbols_files', form, {
            headers: form.getHeaders(),
        });
        console.log(response.data);
        const appVersion = version.codePush
            ? `${version.name} (${version.code})+codepush:${version.codePush}`
            : `${version.name} (${version.code})`;
        console.log(`Successfully uploaded Sourcemaps for version: ${appVersion}`);
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            console.error('Error:', err.response?.data);
        }
        else {
            console.error(err);
        }
    }
};
