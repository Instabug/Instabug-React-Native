interface LogInfo {
    log: string;
    type: 'verbose' | 'debug' | 'warn' | 'info' | 'error';
}
interface FileAttachmentInfo {
    file: string;
    type: 'url' | 'data';
}
export default class Report {
    tags: string[];
    consoleLogs: string[];
    instabugLogs: LogInfo[];
    userAttributes: Record<string, string>;
    fileAttachments: FileAttachmentInfo[];
    constructor(tags?: string[], consoleLogs?: string[], instabugLogs?: LogInfo[], userAttributes?: Record<string, string>, fileAttachments?: FileAttachmentInfo[]);
    /**
     * Append a tag to the report to be sent.
     * @param tag
     */
    appendTag(tag: string): void;
    /**
     * Append a console log to the report to be sent.
     * @param consoleLog
     */
    appendConsoleLog(consoleLog: string): void;
    /**
     * Add a user attribute with key and value to the report to be sent.
     * @param key
     * @param value
     */
    setUserAttribute(key: string, value: string): void;
    /**
     * Attach debug log to the report to be sent.
     * @param log
     */
    logDebug(log: string): void;
    /**
     * Attach verbose log to the report to be sent.
     * @param log
     */
    logVerbose(log: string): void;
    /**
     * Attach warn log to the report to be sent.
     * @param log
     */
    logWarn(log: string): void;
    /**
     * Attach error log to the report to be sent.
     * @param log
     */
    logError(log: string): void;
    /**
     * Attach info log to the report to be sent.
     * @param log
     */
    logInfo(log: string): void;
    /**
     * Attach a file to the report to be sent.
     * @param url
     * @param fileName
     */
    addFileAttachmentWithUrl(url: string, fileName: string): void;
    /**
     * Attach a file to the report to be sent.
     * @param data
     * @param fileName
     */
    addFileAttachmentWithData(data: string, fileName: string): void;
}
export {};
