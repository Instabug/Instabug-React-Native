export type W3cExternalTraceAttributes = {
  isW3cHeaderFound: boolean | null;
  partialId: number | null;
  networkStartTimeInSeconds: number | null;
  w3cGeneratedHeader: string | null;
  w3cCaughtHeader: string | null;
};
