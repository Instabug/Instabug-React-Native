jest.mock('NativeModules', () => {
    return {
        Instabug: {
            setRepliesEnabled: jest.fn(),
            hasChats: (callback) => { callback(true) },
            showReplies: jest.fn(),
            setOnNewReplyReceivedCallback: jest.fn(),
            getUnreadMessagesCount: (callback) => { callback(2) },
            setChatNotificationEnabled: jest.fn(),
            setEnableInAppNotificationSound: jest.fn(),
            addListener: jest.fn()
        },
    };
});