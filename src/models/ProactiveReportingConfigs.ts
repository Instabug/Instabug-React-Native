import { Logger } from '../utils/logger';
import InstabugConstants from '../utils/InstabugConstants';

export interface ProactiveReportingConfigOptions {
  gapBetweenModals: number;
  modalDelayAfterDetection: number;
  enabled: boolean;
}

export function createProactiveReportingConfig(
  {
    gapBetweenModals = 24,
    modalDelayAfterDetection = 20,
    enabled = true,
  }: ProactiveReportingConfigOptions = {
    gapBetweenModals: 24,
    modalDelayAfterDetection: 20,
    enabled: true,
  },
) {
  // Validation and defaults
  if (gapBetweenModals <= 0) {
    Logger.warn(InstabugConstants.GAP_MODEL_ERROR_MESSAGE);
    gapBetweenModals = 24; // Use default value if invalid
  }

  if (modalDelayAfterDetection <= 0) {
    Logger.warn(InstabugConstants.MODAL_DETECTION_ERROR_MESSAGE);
    modalDelayAfterDetection = 20; // Use default value if invalid
  }

  return {
    gapBetweenModals,
    modalDelayAfterDetection,
    enabled,
  };
}
