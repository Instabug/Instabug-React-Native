import { Command, Option } from 'commander';
import { initInstabug, InitOptions } from '../init/init';

export const initCommand = new Command();

initCommand
  .name('init')
  .description('Initialize Instabug React Native SDK with basic instrumentation')
  .addOption(
    new Option('-t, --token <value>', 'Your App Token')
      .env('INSTABUG_APP_TOKEN')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      '-e, --entry <path>',
      'Path to your React Native entry file (e.g., index.js)',
    ).default(''),
  )
  .addOption(
    new Option(
      '--invocation-events <list>',
      'Comma-separated InvocationEvent values (none,shake,screenshot,twoFingersSwipe,floatingButton)',
    ),
  )
  .addOption(
    new Option('--debug-logs-level <level>', 'SDK debug logs level').choices([
      'verbose',
      'debug',
      'error',
      'none',
    ]),
  )
  .addOption(
    new Option('--code-push-version <value>', 'CodePush version label to attach to reports'),
  )
  .addOption(
    new Option(
      '--ignore-android-secure-flag',
      'Override Android secure flag (allow screenshots)',
    ).default(false),
  )
  .addOption(
    new Option('--network-interception-mode <mode>', 'Network interception mode').choices([
      'javascript',
      'native',
    ]),
  )
  .addOption(new Option('--npm', 'Use npm as the package manager').conflicts('yarn'))
  .addOption(new Option('--yarn', 'Use yarn as the package manager'))
  .addOption(new Option('--no-pods', 'Skip running pod install in the ios directory'))
  .addOption(
    new Option('--silent', 'Reduce logging and never exit the process on error').default(false),
  )
  .action(function (this: Command) {
    const opts = this.opts<InitOptions>();
    initInstabug(opts);
  })
  .showHelpAfterError();
