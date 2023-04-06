import { NativeModule } from 'react-native';
declare const _default: {
    addListener: (nativeModule: NativeModule, eventName: string, callback: (data: any) => void) => void;
    emit: (eventName: string, ...eventParams: any[]) => void;
    removeAllListeners: () => void;
    getListeners: (eventName: string) => {
        length: number;
    };
};
export default _default;
