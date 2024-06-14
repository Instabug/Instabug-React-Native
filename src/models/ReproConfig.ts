import type { ReproStepsMode } from '../utils/Enums';

export interface ReproConfig {
  /**
   * Repro steps mode for Bug Reporting.
   *
   * @default ReproStepsMode.enabled
   */
  bug?: ReproStepsMode;

  /**
   * Repro steps mode for Crash Reporting.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   *
   * When this is set, `anr`, `appHangs`,`fatalCrash`,`nonFatalCrash`,`forceRestart`, and `outOfMemory` will be ignored.
   */
  allCrashes?: ReproStepsMode;

  /**
   * Repro steps mode for Session Replay.
   *
   * @default ReproStepsMode.enabled
   */
  sessionReplay?: ReproStepsMode;

  /**
   * Repro steps mode for ANR errors on android.
   *
   * @default ReproStepsMode.enabled
   */
  anr?: ReproStepsMode;

  /**
   * Repro steps mode for AppHangs report.
   *
   * @default ReproStepsMode.enabled
   */
  appHangs?: ReproStepsMode;

  /**
   * Repro steps mode for Fatal crashes.
   *
   * @default ReproStepsMode.enabled
   */
  fatalCrash?: ReproStepsMode;
  /**
   * Repro steps mode for non-fatal crashes.
   *
   * @default ReproStepsMode.enabled
   */
  nonFatalCrash?: ReproStepsMode;

  /**
   * Repro steps mode for force restart crashes.
   *
   * @default ReproStepsMode.enabled
   */
  forceRestart?: ReproStepsMode;

  /**
   * Repro steps mode for outOfMemory crashes on ios.
   *
   * @default ReproStepsMode.enabled
   */
  outOfMemory?: ReproStepsMode;

  /**
   * Repro steps mode for Bug Reporting, Crash Reporting, and Session Replay.
   *
   * When this is set, `bug`, `crash`, `sessionReplay`,  `appHangs`,`fatalCrash`,`nonFatalCrash`,`forceRestart`, and `outOfMemory`  will be ignored.
   */
  all?: ReproStepsMode;
}
