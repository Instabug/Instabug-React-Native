export interface FeatureFlag {
  /**
   * the name of feature flag
   */
  name: string;

  /**
   * The variant of the feature flag.
   * Leave it `undefined` for boolean (kill switch) feature flags.
   */
  variant?: string;
}
