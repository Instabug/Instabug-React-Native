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
   * Repro steps mode for Crash Reporting.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   * @deprecated  Please migrate to the new allCrashes flag
   *
   * When this is set, `anr`, `appHangs`,`fatalCrash`,`nonFatalCrash`,`forceRestart`, and `outOfMemory` will be ignored.
   */
  crash?: ReproStepsMode;

  /**
   * Repro steps mode for Session Replay.
   *
   * @default ReproStepsMode.enabled
   */
  sessionReplay?: ReproStepsMode;

  /**
   * Repro steps mode for ANR errors on android.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   */
  anr?: ReproStepsMode;

  /**
   * Repro steps mode for AppHangs report.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   */
  appHangs?: ReproStepsMode;

  /**
   * Repro steps mode for Fatal crashes.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   */
  fatalCrash?: ReproStepsMode;
  /**
   * Repro steps mode for non-fatal crashes.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   */
  nonFatalCrash?: ReproStepsMode;

  /**
   * Repro steps mode for force restart crashes.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   */
  forceRestart?: ReproStepsMode;

  /**
   * Repro steps mode for outOfMemory crashes on ios.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   */
  outOfMemory?: ReproStepsMode;

  /**
   * Repro steps mode for Bug Reporting, Crash Reporting, and Session Replay.
   *
   * When this is set, `bug`, `crash`, `sessionReplay`,  `appHangs`,`fatalCrash`,`nonFatalCrash`,`forceRestart`, and `outOfMemory`  will be ignored.
   */
  all?: ReproStepsMode;
}
