import type { ReproStepsMode } from '../utils/Enums';

export interface ReproConfig {
  /**
   * Repro steps mode for bug reporting.
   *
   * @default ReproStepsMode.enabled
   */
  bug?: ReproStepsMode;

  /**
   * Repro steps mode for crash reporting.
   *
   * @default ReproStepsMode.enabledWithNoScreenshots
   */
  crash?: ReproStepsMode;

  /**
   * Repro steps mode for both bug and crash reporting.
   *
   * When this is set, `bug` and `crash` will be ignored.
   */
  all?: ReproStepsMode;
}
