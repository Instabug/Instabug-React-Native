import { OverAirUpdateServices } from '../utils/Enums';
export interface OverAirUpdate {
  /**
   * the name of OTA service
   * e.g. `codePush` or `expo`
   */
  service: OverAirUpdateServices;

  /**
   * The version or UUID of the OTA service
   */

  version: string;
}
