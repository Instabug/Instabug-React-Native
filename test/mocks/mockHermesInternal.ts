import type { HermesInternalType } from '../../src/utils/UnhandledRejectionTracking';

export function mockHermesInternal(hermes: HermesInternalType) {
  const original = (global as any).HermesInternal;

  // Using Object.defineProperty to avoid TypeScript errors
  Object.defineProperty(global, 'HermesInternal', { value: hermes, writable: true });

  return {
    mockRestore: () => {
      Object.defineProperty(global, 'HermesInternal', { value: original, writable: true });
    },
  };
}
