import type { NativeModule } from '../native';
declare const _default: {
    addListener: (nativeModule: NativeModule, eventName: string, callback: (data: any) => void) => void;
    emit: (eventName: string, ...eventParams: any[]) => void;
    removeAllListeners: () => void;
    getListeners: (eventName: string) => any;
};
export default _default;
