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
     */
    crash?: ReproStepsMode;
    /**
     * Repro steps mode for Session Replay.
     *
     * @default ReproStepsMode.enabled
     */
    sessionReplay?: ReproStepsMode;
    /**
     * Repro steps mode for Bug Reporting, Crash Reporting, and Session Replay.
     *
     * When this is set, `bug`, `crash`, and `sessionReplay` will be ignored.
     */
    all?: ReproStepsMode;
}
