declare module 'promise/setimmediate/rejection-tracking' {
  export interface RejectionTrackingOptions {
    allRejections?: boolean;
    whitelist?: Function[];
    onUnhandled?: (id: number, error: unknown) => void;
    onHandled?: (id: number, error: unknown) => void;
  }

  export function enable(options?: RejectionTrackingOptions): void;
  export function disable(): void;
}
