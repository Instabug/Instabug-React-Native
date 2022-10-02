// Type definitions for instabug-reactnative 8.0
// Project: https://github.com/Instabug/instabug-reactnative#readme
// Definitions by: Aly Ezz <https://github.com/alyezz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export class Trace {
  constructor(id: string, name?: string, attributes?: object);
  /**
   * Add an attribute with key and value to the Trace to be sent.
   * @param {string} key 
   * @param {string} value 
   */
  setAttribute(key: string, value: string): void;
  /**
    * End Execution Trace
    */
  end(): void;
}

interface Report {
  /**
   * Attach debug log to the report to be sent.
   * @param {string} log 
   */
  logDebug(log: string): void;
  /**
   * Attach verbose log to the report to be sent.
   * @param {string} log 
   */
  logVerbose(log: string): void;
  /**
   * Attach warn log to the report to be sent.
   * @param {string} log 
   */
  logWarn(log: string): void;
  /**
   * Attach error log to the report to be sent.
   * @param {string} log 
   */
  logError(log: string): void;
  /**
   * Attach info log to the report to be sent.
   * @param {string} log 
   */
  logInfo(log: string): void;
  /**
   * Append a tag to the report to be sent.
   * @param {string} tag 
   */
  appendTag(tag: string): void;
  /**
   * Append a console log to the report to be sent.
   * @param {string} consoleLog 
   */
  appendConsoleLog(consoleLog: string): void;
  /**
   * Add a user attribute with key and value to the report to be sent.
   * @param {string} key 
   * @param {string} value 
   */
  setUserAttribute(key: string, value: string): void;
  /**
   * Attach a file to the report to be sent.
   * @param {string} url 
   * @param {string} fileName 
   */
  addFileAttachmentWithUrl(url: string, filename: string): void;
  /**
   * Attach a file to the report to be sent.
   * @param {string} data 
   * @param {string} fileName 
   */
  addFileAttachmentWithData(data: string, filename: string): void;
}
