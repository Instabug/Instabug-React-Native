export default class ProactiveReportingConfigs {
  public readonly gapBetweenModals: number; // Time in seconds
  public readonly modalDelayAfterDetection: number; // Time in seconds
  public readonly enabled: boolean;

  // Private constructor to ensure it can only be created through the builder
  private constructor(
    gapBetweenModals: number,
    modalDelayAfterDetection: number,
    enabled: boolean,
  ) {
    this.gapBetweenModals = gapBetweenModals;
    this.modalDelayAfterDetection = modalDelayAfterDetection;
    this.enabled = enabled;
  }

  // Static method to get the builder instance
  static Builder = class {
    public gapBetweenModals: number = 30; // Default: 30 seconds
    public modalDelayAfterDetection: number = 15; // Default: 15 seconds
    public enabled: boolean = true; // Default: enabled

    // Logger method to handle logging
    public logWarning(message: string): void {
      console.warn(`Warning: ${message}`);
    }
    /**
     * controls the time gap between showing 2 proactive reporting dialogs in seconds
     */
    setGapBetweenModals(gap: number): this {
      if (gap <= 0) {
        this.logWarning(
          'gapBetweenModals must be a positive number. Using default value of 30 seconds.',
        );
        return this;
      }
      this.gapBetweenModals = gap;
      return this;
    }

    /**
     * controls the time gap between detecting a frustrating experience
     */
    setModalDelayAfterDetection(delay: number): this {
      if (delay <= 0) {
        this.logWarning(
          'modalDelayAfterDetection must be a positive number. Using default value of 15 seconds.',
        );
        return this;
      }
      this.modalDelayAfterDetection = delay;
      return this;
    }

    /**
     * controls the state of the feature
     */
    isEnabled(enabled: boolean): this {
      this.enabled = enabled;
      return this;
    }

    build(): ProactiveReportingConfigs {
      return new ProactiveReportingConfigs(
        this.gapBetweenModals,
        this.modalDelayAfterDetection,
        this.enabled,
      );
    }
  };
}
