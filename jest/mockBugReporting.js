jest.mock('NativeModules', () => {
    return {
      IBGBugReporting: {
          setEnabled: jest.fn(),
          setInvocationEvents: jest.fn(),
          setOptions: jest.fn(),
          setFloatingButtonEdge: jest.fn(),
          setShakingThresholdForiPhone: jest.fn(),
          setShakingThresholdForiPad: jest.fn(),
          setShakingThresholdForAndroid: jest.fn(),
          setExtendedBugReportMode: jest.fn(),
          setReportTypes: jest.fn(),
          show: jest.fn(),
          setOnInvokeHandler: jest.fn(),
          addListener: jest.fn(),
          setOnSDKDismissedHandler: jest.fn(),
          setAutoScreenRecordingEnabled: jest.fn(),
          setAutoScreenRecordingMaxDuration: jest.fn(),
          setViewHierarchyEnabled: jest.fn(),
          setEnabledAttachmentTypes: jest.fn(),
          setDidSelectPromptOptionHandler: jest.fn(),
          setVideoRecordingFloatingButtonPosition: jest.fn(),
      },
      Instabug: {}
    };
  });