jest.mock('NativeModules', () => {
    return {
        Instabug: {
            setRepliesEnabled: jest.fn(),
            hasChats: jest.fn(cb => cb(true)),
            showReplies: jest.fn(),
            setOnNewReplyReceivedCallback: jest.fn(),
            getUnreadMessagesCount: jest.fn(cb => cb(2)),
            setChatNotificationEnabled: jest.fn(),
            setEnableInAppNotificationSound: jest.fn(),
            addListener: jest.fn()
        },
    };
});