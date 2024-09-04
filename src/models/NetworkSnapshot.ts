export default class NetworkSnapshot {
  constructor(
    public tempId: string | undefined,
    public url: string | undefined,
    public id: number | undefined,
    public requestHeaders: Record<string, any> = {},
    public requestBody: string | undefined,
    public responseHeaders: Record<string, any> = {},
    public responseCode: number,
    public responseBody: string | undefined,
  ) {}
}
