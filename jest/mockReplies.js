jest.mock('NativeModules', () => {
    return {
        Instabug: {
            setRepliesEnabled: jest.fn(),
            hasChats: (callback) => { callback(true) },
            showReplies: jest.fn(),
            setOnNewReplyReceivedCallback: jest.fn(),
            getUnreadMessagesCount: jest.fn(),
            setChatNotificationEnabled: jest.fn(),
            setEnableInAppNotificationSound: jest.fn()
        },
    };
});