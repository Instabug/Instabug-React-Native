export function mockDevMode(isDev: boolean) {
  const original = __DEV__;

  // Using Object.defineProperty to avoid TypeScript errors
  Object.defineProperty(global, '__DEV__', { value: isDev });

  return {
    mockRestore: () => {
      Object.defineProperty(global, '__DEV__', { value: original });
    },
  };
}
